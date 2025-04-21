import Post from '../models/postModel.js'
import User from '../models/userModel.js'
import ImageKit from 'imagekit'

const imagekit = new ImageKit({
    urlEndpoint: process.env.IK_URL_ENDPOINT,
    publicKey: process.env.IK_PUBLIC_KEY,
    privateKey: process.env.IK_PRIVATE_KEY
})

export const getPosts = async (req, res) => {
    const { page = parseInt(req.query.page) || 1, limit = parseInt(req.query.limit)|| 3, ...filters } = req.query;
    const skip = (page-1) * limit
    const posts = await Post.find(filters)
    .populate({ path: 'user', select: '_id username fullName img email' })
    .populate('category', 'name slug')
    .limit(limit)
    .skip(skip)
    const allPost = await Post.countDocuments(filters)
    const hasMore = page * limit < allPost
    res.status(200).json({posts, hasMore})
}

export const getPost = async (req, res) => {

    const post = await Post.aggregate([
        { $match: { slug: req.params.slug } },
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
            totalComments: { $size: '$comments' } 
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
        { $unwind: '$user' }, 
        {
            $lookup: {
              from: 'categories',
              localField: 'category',
              foreignField: '_id',
              as: 'category'
            }
        },
        { $unwind: '$category' }
        
      ])
    res.status(200).json(post)
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

export const editPost = async (req, res) => {
    const post = await Post.findOneAndUpdate()
    res.status(200).json(post)
}

export const deletePost = async (req, res) => {
    const clerkUserId = req.auth.userId
    if (!clerkId) {
        return res.status(401).json('Not Authenticated.')
    }
    const user = await User.findOne({ clerkUserId })
    if (!user) {
        return res.status(400).json('User not found.')
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

export const imgAuth = async (req, res) => {
    var result = imagekit.getAuthenticationParameters()
    res.send(result)
}