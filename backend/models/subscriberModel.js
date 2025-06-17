import mongoose from "mongoose";

const SubscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    
    subscribedAt: {
        type: Date,
        default: Date.now
    },
    
    isVerified:{
        type:Boolean,
        default:false
    },

    isUnsubscribed:{
        type:Boolean,
        default:false
    }
});

const Subscriber = mongoose.model("Subscriber", SubscriberSchema)

export default Subscriber
