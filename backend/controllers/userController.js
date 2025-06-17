import User from "../models/userModel.js"

export const getAllUserOrSingle = async (req,res)=>{
    let filters ={}
    let user;
    if(Object.keys(req.params).length>0){
        filters = req.params        
    }
    if(Object.keys(req.query).length>0){
        filters =req.query
    }
    if(Object.keys(filters).length>0){
        user = await User.findOne(filters)
    }else{
        user= await User.find(filters)
    }
    if(!user){
        res.status(404).send("User not found.")
    }
    res.status(200).send(user)
}

export const createNewUser = async(data)=>{
    const newUser = new User(data)
    return await newUser.save()
}

export const editNewUser = async(req,res)=>{
    const editUser = await User.updateOne({_id:req.params.id}, {...req.body}, {new:true})
    if(!editUser){
        return res.status(400).send('Could not update user.')
    }
    res.status(200).send('Added user description successfully.')
}

export const getUserId =  async(req,res)=>{
    const clerkUserId = req.params.id
    const user = await User.findOne({clerkUserId}).select("_id")
    res.status(200).send(user)
}

export const deleteUser = (id)=>{
    return User.findOneAndDelete({clerkUserId:id})
}