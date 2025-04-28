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
    mainImg:{
        type:Object
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
    },
    fileId:{
        type:Array,
        default:[]
    },
    images:{
        type:Array,
        default:[]
    },
    videos:{
        type:Array,
        default:[]
    },
    tags:{
        type:Array,
        default:[]
    }
},{timestamps:true});

const Post = mongoose.model("Post", postSchema)

export default Post