import MostView from '../models/mostViewModel.js'
import Post from '../models/postModel.js'
import User from '../models/userModel.js'
import {QuillDeltaToHtmlConverter} from 'quill-delta-to-html'
import {Clerk} from '@clerk/clerk-sdk-node'
import { createNewUser } from './userController.js'
import Comment from '../models/commentModel.js'
import { ObjectId } from 'bson'

const clerk = new Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

export const getPosts = async (req, res) => {
    let { page, limit, search, ...filters } = req.query;
    page =  parseInt(page) || 1
    limit = parseInt(limit)|| 4
    
    const skip = (page-1) * limit

    if(filters?.category) filters.category = new ObjectId(filters.category)
    if(filters?.user) filters.user = new ObjectId(filters.user)
    const searchRegex = search ? new RegExp(search, 'i') : null;
    
    let lookUp=[]
    const role = req.auth?.sessionClaims?.metadata?.role;
    if (role !== 'admin') {
        filters.isDeleted = false;
        lookUp = [
            {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user',
                pipeline: [
                {
                    $project: {
                    _id: 1,
                    username: 1,
                    img: 1,
                    fullName: 1,
                    email: 1,
                    },
                },
                ],
            },
            },
            {
            $unwind: {
                path: '$user',
                preserveNullAndEmptyArrays: true,
            },
        }]
    }

    const posts = await Post.aggregate([
        { $match: filters },
        {
            $lookup: {
            from: 'categories',
            localField: 'category',
            foreignField: '_id',
            as: 'category',
            pipeline: [
                { $match: { isDeleted: false } },
                { $project: { name: 1, slug: 1 } },
            ],
            },
        },
        {
            $unwind: {
            path: '$category',
            preserveNullAndEmptyArrays: true,
            },
        },
        ...lookUp,
        ...(searchRegex ? [{
            $match: {
            $or: [
                { tags: { $regex: searchRegex } },
                { desc: { $regex: searchRegex } },
                { content: { $regex: searchRegex } },
                { title: { $regex: searchRegex } },
                { 'category.name': { $regex: searchRegex } },
                { 'user.username': { $regex: searchRegex } },
            ]
            }
        }] : []),
        { $skip: skip },
        { $limit: limit },
    ]);
        
    const allPost = await Post.aggregate([
        {
            $match: filters,
        },
        {
            $lookup: {
            from: 'categories',
            localField: 'category',
            foreignField: '_id',
            as: 'category',
            pipeline: [
                { $match: { isDeleted: false } }
            ]
            }
        },
        {
            $unwind: {
            path: '$category',
            preserveNullAndEmptyArrays: false,
            }
        },
        ...(searchRegex ? [{
            $match: {
            $or: [
                { tags: { $regex: searchRegex } },
                { desc: { $regex: searchRegex } },
                { content: { $regex: searchRegex } },
                { title: { $regex: searchRegex } },
                { 'category.name': { $regex: searchRegex } }
            ]
            }
        }] : []),
        {
            $count: 'total'
        }
    ])
    const hasMore = page * limit < (allPost[0]?.total||0)
    res.status(200).json({result:posts, hasMore})
}

export const getPost = async (req, res) => {

    const post = await Post.aggregate([
        { $match: { ...req.params } },
        {
            $lookup: {
                from: 'comments',
                localField: '_id',
                foreignField: 'post',
                as: 'comments',
                pipeline: [
                { $match: { isDeleted: false } }
            ]
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
                as: 'category',
                pipeline:[{ $match: { isDeleted: false } }]
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
                        }, isDeleted: false 
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
            await mostView.save()
        }
    }
    
    res.status(200).json(post)
}

export const getAllPostByUserId = async(req, res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit)|| 10;
    const skip = (page - 1) * limit;
    const authoredPostIds = await Post.find({ user: req.params.id }).distinct('_id');

    const data = await Comment.find({ post: { $in: authoredPostIds } })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .populate({ path: 'user', select: 'username fullName email' })
    .populate('post', 'title')
    .exec();

    const totalComments = await Comment.countDocuments({ post: { $in: authoredPostIds } });
    const comments = data
    const hasMore = page * limit < totalComments
    res.status(200).json({
        comments,
        totalComments,
        hasMore
    })
}

export const getMostViewPost = async (req,res)=>{
    const limit = parseInt(req.query.limit)|| 5
    const count = parseInt(req.query.count) || 1
    const result = await Post.aggregate([
    {
        $match: { read_count: { $gt: count}, isDeleted:false },
    },
    {
        $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'category',
        pipeline: [
            { $match: { isDeleted: false } },
            { $project: { name: 1, slug: 1 } }
        ]
        }
    },
    {
        $unwind: {
        path: '$category',
        preserveNullAndEmptyArrays: false,
        }
    },{ $sort: {read_count: -1} },
    { $limit: limit }])
    res.status(200).json(result)
}

export const getTagsByName = async (req,res)=>{
    const tag = req.params.name;
    const posts = await Post.find({ tags: tag, isDeleted:false });
    res.status(200).json(posts)
}

export const createPost = async (req, res) => {
    const clerkUserId = req.auth.userId
    const role = req.auth?.sessionClaims?.metadata?.role

    if (!clerkUserId) {
        return res.status(401).json('Not Authenticated.')
    }
    let user = await User.findOne({ clerkUserId })
    if(role && role ==='admin' && !user)
    {
        const data = await clerk.users.getUser(clerkUserId)

        if(data && Object.keys(data).length >0)
        {
            const newUserDetails = await createNewUser({
                clerkUserId:data.id,
                username:data.username,
                email:data.emailAddresses[0].emailAddress,
                img:data.image_url
            })
            user = newUserDetails
        }
    }
    else if (!user) {
        return res.status(404).json('User not found.')
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
    const role = req.auth.sessionClaims?.metadata?.role
    const clerkUserId = req.auth.userId
    let post = {}
    if(role !='admin' && clerkUserId){
        const user = await User.findOne({clerkUserId})
        post = await Post.findOne({user:user._id, _id:req.params.id})
        if(!post){
            return res.status(401).json('You are not Authorized to edit other author\'s post.')
        }
    }else{
        post = await Post.findOne({_id:req.params.id})
    }
    res.status(200).json(post)
}

export const getAllTags = async(req, res) => {
    let limit = {}
    const tags = await Post.aggregate([
    {
        $match: { isDeleted:false },
    },
    { $unwind: "$tags" },
    { $group: { _id: "$tags" } },
    { $project: { _id: 0, tag: "$_id" } },
    { $limit: 10 },
    { $sort: {createdAt: -1}},
    ]);

    const result = tags.map(ele=>ele.tag)
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
    const role = req.auth.sessionClaims?.metadata?.role
    if (!clerkUserId) {
        return res.status(401).json('Not Authenticated.')
    }
    const user = await User.findOne({ clerkUserId })
    if (!user) {
        return res.status(404).json('User not found.')
    }
    
    if(role !=='admin'){
        const post = await Post.findOne({
            _id: req.params.id,
            user: user._id
        })
        if(!post){
            return res.status(403).json('You are not authorized to delete others post.')
        }        
    }

    await Post.findOneAndUpdate({_id: req.params.id}, {isDeleted:true})

    res.status(200).json('Post has been deleted successfully.')
}