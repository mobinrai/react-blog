import { Webhook } from "svix"
import { createNewUser, deleteUser } from "./userController.js"

export const webhookClerk = async (req, res)=>{
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

    if(!WEBHOOK_SECRET){
        throw new Error("Webhook secret is needed!");
    }

    const payload = req.body;
    const headers = req.headers;

    const wh = new Webhook(WEBHOOK_SECRET);
    let evt;
    try {
        evt = wh.verify(payload, headers);
    } catch (err) {
        return res.status(400).json({
            message:'Webhook verification failed!'
        });
    }
    
    try{
        if(evt.type === "user.created") {
        await createNewUser({clerkUserId:evt.data.id,
            username:evt.data.username,
            email:evt.data.email_addresses[0].email_address,
            img:evt.data.image_url})
        }
        if(evt.type ==='user.deleted'){
            await deleteUser(evt.data.id)
        }
    }catch(err){
        return res.status(400).json('Fail to operate clerk webhook.');
    }
    return res.status(200).json({message:"Webhook received!"})
}