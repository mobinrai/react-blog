import Subscriber from "../models/subscriberModel.js"
import { transporter } from "../utils/MailTrasporter.js"
import jwt from 'jsonwebtoken'

export const handleSubscribe= async(req, res)=>{
    const {email} = req.body
    const isEmailExists = await Subscriber.findOne({email})

    if(isEmailExists){
        return res.status(409).json('Email already subscribed.')
    }
    
    const newSubscriber = new Subscriber({email})
    const saveSubscriber = await newSubscriber.save()

    if(saveSubscriber)
    {
        const token = jwt.sign({email}, process.env.JWT_SECRET_KEY, {expiresIn:'1h'})
        const sendEmail = await transporter.sendMail({
            from:`"MyReact Blog"<mobinraee@gmail.com>`,
            to:email, 
            subject:"Thank you, for subscribing. Please verify your email.",
            html:`<div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
                <h2 style="color: #333;">Welcome to Our Site</h2>
                <p style="font-size: 16px; color: #555;">
                    Thank you for subscribing. Please click the button below to verify your email.
                    Remember this link will expires in one hour.
                </p>
                <a href="http://localhost:5173/verify-email/${token}" style="display: inline-block; padding: 10px 15px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px;">
                    Verify your email
                </a>
            </div>`
        })
        if(sendEmail){
            return res.status(200).json('Email subscribe successfully.Please check your mail.')
        }
    }
    res.status(200).json('Email subscribe successfully.')
}



export const VerifyEmail = async(req,res)=>{
    const {token} = req.body

    if(!token) {
        return res.status(400).json("Token is missing. Please send token.")
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const subscriberUser = await Subscriber.findOne({email: decoded.email})

    if(!subscriberUser) {
        return res.status(404).json("Subscriber user not found.")
    }

    if(subscriberUser.isVerified){
        return res.json("Subscriber email is already verified.")
    }

    subscriberUser.isVerified = true
    await subscriberUser.save()

    res.status(200).json('Subscriber email verified successfully.')
}