import ImageKit from 'imagekit'

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
    const {fileId}= req.body
    try{
        const response = await imagekit.deleteFile(fileId)
        res.status(200).json({ success: true, data: response });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }

}