import express from "express"
import { createPost, deletePost, editPost, getPost, getPostByUserId, getPosts, imgAuth } from "../controllers/postController.js"

const router = express.Router()

router.get('/imagekit/auth', imgAuth)

router.get("/", getPosts)

router.get("/:slug", getPost)

router.get("/user/:userId", getPostByUserId)

router.post("/", createPost)

router.patch("/:id", editPost)

router.delete("/:id", deletePost)



export default router