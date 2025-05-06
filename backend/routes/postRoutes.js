import express from "express"
import { createPost,
    deletePost, 
    editPost, 
    getAllPostByUserId, 
    getAllTags, 
    getMostViewPost, 
    getPost, 
    getPostById, 
    getPosts, 
    getTagsByName } from "../controllers/postController.js"

const router = express.Router()

router.get("/", getPosts)

router.get("/:slug", getPost)

router.get("/most/view", getMostViewPost)

router.get("/id/:id", getPostById)

router.get("/tags/all", getAllTags)

router.get("/tags/:name", getTagsByName)

router.get("/user/:userId", getAllPostByUserId)

router.post("/", createPost)

router.patch("/:id", editPost)

router.delete("/:id", deletePost)



export default router