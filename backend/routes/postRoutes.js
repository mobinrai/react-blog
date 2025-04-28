import express from "express"
import { createPost, deletePost, editPost, getAllPostByUserId, getPost, getPosts } from "../controllers/postController.js"

const router = express.Router()

router.get("/", getPosts)

router.get("/:slug", getPost)

router.get("/user/:userId", getAllPostByUserId)

router.post("/", createPost)

router.patch("/:id", editPost)

router.delete("/:id", deletePost)



export default router