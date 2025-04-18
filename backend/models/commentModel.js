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
        required:true,
        unique:true
    }
},{timestamps:true});

export default mongoose.model("Comment", commentSchema)