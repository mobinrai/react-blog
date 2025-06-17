import Message from "../models/messageModel.js"

export const storeMessage = async(req,res)=>{
    console.log(req.body);
    const newMessage = new Message({...req.body})
    const message = newMessage.save()
    if(!message){
        res.status(500).json("Couldn't send your message.")
    }
    res.status(200).json('Thank you for your message.')
}