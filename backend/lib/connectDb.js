import mongoose from "mongoose";

const connectionDb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO)
        console.log("MONGO DB is connected.")
    }catch(err){
        console.log('MongoDb connection error:', err.message)
        process.exit(1)
    }

    // mongoose.connection.on('error', (e)=>{
    //     console.log(e.message);
    // })

    // mongoose.connection.on('disconnected', function(){
    //     console.log("Mongoose is not connected");
    // })
}

export default connectionDb

