import mongoose, { Schema } from "mongoose";

const commentSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    website:{
        type:String
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        default:null
    },
    parentId:{
        type:Schema.Types.ObjectId,
        ref:"Comment",
        default:null
    },
    post:{
        type:Schema.Types.ObjectId,
        ref:"Post",
        required:true
    },
    message:{
        type:String,
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

 const Comment = mongoose.model("Comment", commentSchema)
 
 export default Comment