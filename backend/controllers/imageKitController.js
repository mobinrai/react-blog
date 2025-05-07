import ImageKit from 'imagekit'
import Post from '../models/postModel.js'

const imagekit = new ImageKit({
    urlEndpoint: process.env.IK_URL_ENDPOINT,
    publicKey: process.env.IK_PUBLIC_KEY,
    privateKey: process.env.IK_PRIVATE_KEY
})

export const imgKitAuth = async (req, res) => {
    var result = imagekit.getAuthenticationParameters()
    res.send(result)
}

export const imageKitDeleteImage = async(req,res)=>{
    const {fileId, postId, isCreatingNew, name}= req.body
    let ids, set = {};

    if(!isCreatingNew && (!Array.isArray(fileId) || !postId || !name)){
        return res.status(400).json('Please send full data, to process further.')
    }

    if(Array.isArray(fileId)){
        ids = fileId.map(item=>item.fileId);
    }
    
    try{
        
        const response = await imagekit.bulkDeleteFiles(ids)
        // console.log(response);      
        if(!isCreatingNew && !Object.keys(response).includes('errors')){
            const post = await Post.findById(postId)
            if(!post){
                return res.status(404).json('Post not found. Please send correct post id.')
            }
            // successfullyDeletedFileIds
            if(name ==='img'){
                const images = post.images.filter(item=> !ids.includes(item.fileId))
                const removedFiles =  req.body.fileId.map(file=> `${process.env.IK_URL_ENDPOINT+file.filePath}`)
                const newfileId = post.fileId.filter(id => !response.successfullyDeletedFileIds.includes(id))
                const newContent = post.content.ops.filter(op=>{
                    return !(op.insert && typeof op.insert ==='object' && removedFiles.includes(op.insert.image))
                });
                set = { images, fileId:newfileId, content: {ops:newContent} }
            }
            if(name ==='mainImg'){
                const newfileId = post.fileId.filter(id => !ids.includes(id))
                const newMainImg = fileId[0]
                set = {mainImg:newMainImg, fileId: newfileId}
            }
            const updatedPost = await Post.findOneAndUpdate({_id:postId}, { $set: set },
                    { new: true })
        }
        res.status(200).json({ success: true, data: [] });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, error: err.message });
    }
}

export function deleteImagesFromImageKit(ids){
    return imagekit.bulkDeleteFiles(ids)
}