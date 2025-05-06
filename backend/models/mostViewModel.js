 import mongoose, { Schema } from "mongoose";
 
    const mostViewSchema = new mongoose.Schema({
        ip:{
            type:String
        },
        postId:{
            type:String
        },
        viewedAt: {
            type: Date,
            default: Date.now,
            expires: 360 // 24 hours in seconds
        }
    });
 
 const MostView = mongoose.model("MostView", mostViewSchema)
 
 export default MostView