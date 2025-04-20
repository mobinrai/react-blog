import Comment from '../models/commentModel.js'
import User from '../models/userModel.js'
import { ObjectId } from 'bson'

export const allCommentsByParams = async (req, res) => {
  const category = await Comment.find(req.query || {})
  res.status(200).json(category)
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
                        cond: { $eq: ['$$u._id', '$userId'] }
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
                                    cond: { $eq: ['$$u._id', '$$reply.userId'] }
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
        },
        {
            $project: {
                _users: 0
            }
        }
    ])
    let threadTree = []
    if (result.length > 0) {
        const flat = result.flatMap(top => [top, ...top.allReplies])

        const buildTree = (comments, parentId = null) => {
            return comments
            .filter(c => String(c.parentId) === String(parentId))
            .map(c => ({
                _id: c._id,
                message: c.message,
                fullName: c.fullName,
                post: c.post,
                userId: c.userId,
                parentId: c.parentId,
                createdAt: c.createdAt,
                updatedAt: c.updatedAt,
                user: c.userId ? c.user : null,
                children: buildTree(comments, c._id)
            }))
        }

      threadTree = buildTree(flat)
    }
        res.status(200).json(threadTree)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const createComment = async (req, res) => {
  const clerkUserId = req.auth.userId
  console.log(clerkUserId)
  let userId = null
  if (clerkUserId) {
    const user = await User.findOne({ clerkUserId })
    if (!user) {
      return res.status(400).json('User not found.')
    }
    userId = user._id
  }

  const newComment = new Comment({ userId, ...req.body })
  console.log(newComment)
  const comment = await newComment.save()
  res.status(200).json(comment)
}
