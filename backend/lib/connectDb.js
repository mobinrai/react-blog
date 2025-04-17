import mongoose from "mongoose";

const connectionDb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO)
        console.log("MONGO DB is connected.");
    }catch(err){
        console.log(err);
    }
}

export default connectionDb

