import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkUserId:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        default:''
    },
    img:{
        type:String
    },
    savedPost:{
        type:[String],
        default:[]
    }
},{timestamps:true});

const User = mongoose.model("User", userSchema)

export default User;