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
    let ids;
    console.log(fileId);
    console.log(!isCreatingNew);
    if(!isCreatingNew && (!Array.isArray(fileId) || !postId || !name)){
        return res.status(400).json('Please send full data, to process further.')
    }
    if(Array.isArray(fileId)){
        ids = fileId.map(item=>item.fileId);
    }
    
    try{
        const response = await imagekit.bulkDeleteFiles(ids)
        console.log(isCreatingNew);
        if(!isCreatingNew && !Object.keys(response).includes('errors')){
            const post = await Post.findById(postId)
            if(!post){
                return res.status(404).json('Post not found. Please send correct post id.')
            }
            if(name ==='img'){
                const images = post.images.filter(item=> !ids.includes(item.fileId))
                const fileId = post.fileId.filter(id => !ids.includes(id))
                const updatedPost = await Post.findOneAndUpdate({_id:postId}, { $set: { images, fileId } },
                    { new: true })
                console.log(updatedPost);
            }
        }
        res.status(200).json({ success: true, data: [] });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, error: err.message });
    }

}

export async function deleteImagesFromImageKit(ids){
    return await imagekit.bulkDeleteFiles(ids)
}