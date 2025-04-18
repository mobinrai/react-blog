import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    img:{
        type:String
    },
    title:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String
    },
    content:{
        type:String,
        required:true
    },
    isFeatured:{
        type:Boolean,
        default:false
    },
    visited:{
        type:Number,
        default:0
    }
},{timestamps:true});

const Post = mongoose.model("Post", postSchema)

export default Post