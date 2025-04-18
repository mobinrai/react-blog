import Comment from "../models/commentModel.js"

export const allCommentsByParams = async(req, res)=>{
    const category = await Comment.find(req.query||{})
    res.status(200).json(category)
}


export const createComment = async(req,res)=>{
    const newComment = new Comment({...req.body})
    const comment = await newComment.save()
    res.status(200).json(comment)
}