import Comment from '../models/commentModel.js'
import Post from '../models/postModel.js';
import User from '../models/userModel.js'
import { ObjectId } from 'bson'

export const allCommentsByParams = async (req, res) => {
    const { page = parseInt(req.query.page) || 1, limit = parseInt(req.query.limit)|| 10, ...filters } = req.query;
    const skip = (page-1) * limit
    const comments = await Comment.find(filters)
    .populate('post')
    .limit(limit)
    .skip(skip)
    const allComments = await Comment.countDocuments(filters)
    const hasMore = page * limit < allComments
    
    res.status(200).json({result:comments, hasMore})
}

export const getAllChildComments = async (req, res) => {
    const postId = req.query.postId

    if (!postId) {
        throw new Error('Post id required.')
    }
    try {
        const result = await Comment.aggregate([
            {
                $match: {
                    post: new ObjectId(postId),
                    parentId: null
                }
            },
            {
                $graphLookup: {
                    from: 'comments',
                    startWith: '$_id',
                    connectFromField: '_id',
                    connectToField: 'parentId',
                    as: 'allReplies',
                    depthField: 'level'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    pipeline: [],
                    as: '_users'
                }
            },
            {
                $addFields: {
                    user: {
                        $arrayElemAt: [
                        {
                            $filter: {
                            input: '$_users',
                            as: 'u',
                            cond: { $eq: ['$$u._id', '$user'] }
                            }
                        },
                        0
                        ]
                    }
                }
            },
            {
                $addFields: {
                    allReplies: {
                        $map: {
                        input: '$allReplies',
                        as: 'reply',
                        in: {
                            $mergeObjects: [
                            '$$reply',
                            {
                                user: {
                                $arrayElemAt: [
                                    {
                                    $filter: {
                                        input: '$_users',
                                        as: 'u',
                                        cond: { $eq: ['$$u._id', '$$reply.user'] }
                                    }
                                    },
                                    0
                                ]
                                }
                            }
                            ]
                        }
                        }
                    }
                }
            }           
        ])
        let threadTree = []
        if (result.length > 0) {
            const flat = result.flatMap(top => [top, ...top.allReplies])

            const buildTree = (comments, parentId = null) => {
                return comments
                .filter(c => String(c.parentId) === String(parentId))
                .map(c => {
                    return {
                        _id: c._id,
                        message: c.message,
                        fullName: c.fullName,
                        post: c.post,
                        parentId: c.parentId,
                        createdAt: c.createdAt,
                        updatedAt: c.updatedAt,
                        user: c.user ? c.user : null,
                        isDeleted:c.isDeleted,
                        children: buildTree(comments, c._id)
                    }
                })
            }

            threadTree = buildTree(flat)
        }
        res.status(200).json(threadTree)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getAllCommentsByPostUserId = async(req, res)=>{
    const role = req.auth?.sessionClaims?.metadata?.role
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit)|| 10;
    const skip = (page - 1) * limit;
    let filter={}

    if(role !=='admin'){
        const authoredPostIds = await Post.find(filter).distinct('_id');
        if(req.query.user) {
            filter.user=req.query.user
        }
        filter.post= { $in: authoredPostIds }
        filter.isDeleted= false
    }
    const data = await Comment.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .populate({ path: 'user', select: 'username fullName' })
    .populate('post', 'title')
    .exec();

    const totalComments = await Comment.countDocuments(filter);
    const hasMore = page * limit < totalComments
    res.status(200).json({
        result:data,
        totalComments,
        hasMore
    })
} 

export const createComment = async (req, res) => {
    const clerkUserId = req.auth.userId
    let user = null
    if (clerkUserId) {
        const data = await User.findOne({ clerkUserId })
        if (!data) {
        return res.status(400).json('User not found.')
        }
        user = data._id
    }

    const newComment = new Comment({ user, ...req.body })
    const comment = await newComment.save()
    res.status(200).json(comment)
}

export const deleteComment= async(req,res)=>{
    const _id = req.params.id
    const clerkUserId = req.auth.userId
    const userId = await User.findOne({clerkUserId}).select('_id')
    // , {isDeleted:true}
    const result = await Comment.findOneAndUpdate({_id}, {isDeleted:true})
    
    if(!result){
        return res.status(400).json('Could not delete comment.')
    }
    
    res.status(200).send("Comment delete successfully.")
}

export const editComment= async(req,res)=>{
    const _id = req.params.id
    const clerkUserId = req.auth.userId
    const role = req.auth?.sessionClaims?.metadata?.role

    const userId = await User.findOne({clerkUserId}).select('_id')
    if(role !=='admin' && !userId){
        return res.status(401).send("You are not allowed to update this comment.")
    }
    // , {isDeleted:true}
    const result = await Comment.findOneAndUpdate({_id}, {message:req.body.message})
    
    if(!result){
        return res.status(400).json('Could not update comment.')
    }
    
    res.status(200).send("Comment edited successfully.")
}