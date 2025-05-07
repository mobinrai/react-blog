import MostView from '../models/mostViewModel.js';
import Post from '../models/postModel.js'
import User from '../models/userModel.js'
import { deleteImagesFromImageKit } from './imageKitController.js'
import {QuillDeltaToHtmlConverter} from 'quill-delta-to-html'

export const getPosts = async (req, res) => {
    const { page = parseInt(req.query.page) || 1, limit = parseInt(req.query.limit)|| 3, ...filters } = req.query;
    const skip = (page-1) * limit
    const posts = await Post.find(filters)
    .populate({ path: 'user', select: '_id username img fullName email' })
    .populate('category', 'name slug')
    .limit(limit)
    .skip(skip)

    const allPost = await Post.countDocuments(filters)
    const hasMore = page * limit < allPost
    res.status(200).json({posts, hasMore})
}

export const getPost = async (req, res) => {

    const post = await Post.aggregate([
        { $match: { ...req.params } },
        {
            $lookup: {
                from: 'comments',
                localField: '_id',
                foreignField: 'post',
                as: 'comments'
            }
        },
        {
            $addFields: {
                totalComments: { $size: { $ifNull: ['$comments', []] } } 
            }
        },
        {
            $project: {
                comments: 0
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user'
            }
        },
        { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } }, 
        {
            $lookup: {
                from: 'categories',
                localField: 'category',
                foreignField: '_id',
                as: 'category'
            }
        },
        { $unwind: { path: '$category', preserveNullAndEmptyArrays: true } },
        {
            $lookup: {
                from: 'posts',
                let: { currentTags: { $ifNull: ['$tags', []] }, currentId: '$_id' },
                pipeline: [
                    {
                        $match: {
                        $expr: {
                            $and: [
                            { $ne: ['$_id', '$$currentId'] },
                            { $gt: [{ $size: { $setIntersection: [{ $ifNull: ['$tags', []] }, '$$currentTags'] } }, 0] }
                            ]
                        }
                        }
                    },
                    { $limit: 4 },
                    {
                            $project: {
                                title: 1,
                                tags: 1,
                                img:1,
                                desc:1,
                                slug:1,
                                createdAt:1,
                                _id:0
                            }
                    }
                ],
                as: 'relatedPosts'
            }
        }
    ])
    if(post && post.length>0){
        const ipAddress = req.socket.remoteAddress;
        const postId = post[0]._id
        const alreadyViewed = await MostView.findOne({ip: ipAddress, postId})
        const converter = new QuillDeltaToHtmlConverter(post[0].content.ops, {inlineStyles:true})
        const htmlString = converter.convert()
        post[0].content = htmlString
        if(!alreadyViewed){
            await Post.findByIdAndUpdate(postId, { $inc: { read_count: 1 } }, { new: true });
            const mostView = new MostView({ ip: ipAddress, postId })
            const data = await mostView.save()
        }
    }
    
    res.status(200).json(post)
}

export const getAllPostByUserId = async(req, res)=>{
    const result = await User.aggregate([
        { $match:  { clerkUserId: req.params.userId }},
        {
            $lookup: {
                from: 'posts',
                localField: '_id',
                foreignField: 'user',
                as: 'posts',
            },
        },
        {
            $project: {
                _id:1,
                name: 1,
                posts: {
                    $map: {
                        input: '$posts',
                        as: 'post',
                        in: {
                        _id: '$$post._id',
                        title: '$$post.title',
                        desc: '$$post.desc',
                        slug:'$$post.slug',
                        createdAt:'$$post.createdAt',
                        updatedAt:'$$post.updatedAt',
                        },
                    },
                },
              },
        }
    ]);
    // let allPost = []
    // if(result){
    //     const mapResult = result[0].posts.map(post=>{
    //         return {
    //                 _id:post._id,
    //                 title:post.title,
    //                 desc:post.desc
    //         }
    //     })
    //     allPost = [{
    //         _id:result[0]._id,
    //         posts:mapResult
    //     }]
    // }
    res.status(200).json(result)
}

export const getMostViewPost = async (req,res)=>{
    const limit = parseInt(req.query.limit)|| 5
    const count = parseInt(req.query.count) || 1
    const result = await Post.find({ read_count: { $gt: count} }).limit(limit).sort({createdAt: -1})
    res.status(200).json(result)
}

export const getTagsByName = async (req,res)=>{
    const tag = req.params.name;
    const posts = await Post.find({ tags: tag });
    res.status(200).json(posts)
}

export const createPost = async (req, res) => {
    const clerkUserId = req.auth.userId
    if (!clerkUserId) {
        return res.status(401).json('Not Authenticated.')
    }

    const user = await User.findOne({ clerkUserId })
        if (!user) {
            return res.status(400).json('User not found.')
        }
    let cleanSlug = req.body.title.replace(/[?=\/'*()&^%$#@!:]/g, '')
    let slug = cleanSlug.replace(/ /g, '-').toLowerCase()
    let slugExist = await Post.findOne({ slug })
    let counter = 2
    while (slugExist) {
        slug = `${slug}-${counter}`
        slugExist = await Post.findOne({ slug })
        counter++
    }
    const newPost = new Post({ user: user._id, slug, ...req.body })
    const post = await newPost.save()
    res.status(200).json(post)
}

export const getPostById = async (req, res) => {
    const post = await Post.findOne({_id:req.params.id})
    res.status(200).json(post)
}

export const getAllTags = async(req, res) => {
    const result = await Post.distinct('tags')
    
    res.status(200).json(result)
}

export const editPost = async (req, res) => {
    let set={}

    if(req.body.title){
        let cleanSlug = req.body.title.replace(/[?=\/'*()&^%$#@!:]/g, '')
        let slug = cleanSlug.replace(/ /g, '-').toLowerCase()
        let slugExist = await Post.findOne({ slug })
        
        let counter = 2
        while (slugExist) {
            slug = `${slug}-${counter}`
            slugExist = await Post.findOne({ slug })
            counter++
        }
        set = {slug, ...req.body}
    }
    else{
        set={...req.body}
    }
    const post = await Post.findOneAndUpdate(
        { _id: req.params.id },
        { $set:  set},
        {
            new: true,
            runValidators: true,
        })
    res.status(200).json(post)
}

export const deletePost = async (req, res) => {
    const clerkUserId = req.auth.userId
    if (!clerkUserId) {
        return res.status(401).json('Not Authenticated.')
    }
    const user = await User.findOne({ clerkUserId })
    if (!user) {
        return res.status(404).json('User not found.')
    }
    const post = await Post.findOne({
        _id: req.params.id,
        user: user._id
    })
    if(post && Object.keys(post).length>0 && post.fileId.length>0){
        const response = await deleteImagesFromImageKit(post.fileId)
        if(Object.keys(response).includes('errors')){
            return res.status(500).json('Could not delete post')
        }
    }
    const deletePost = await Post.findByIdAndDelete({
        _id: req.params.id,
        user: user._id
    })

    if (!deletePost) {
        return res.status(403).json('You are only allowed to deleted your post.')
    }

  res.status(200).json('Post has been deleted successfully.')
}