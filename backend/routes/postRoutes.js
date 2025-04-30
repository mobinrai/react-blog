import express from "express"
import { createPost, deletePost, editPost, getAllPostByUserId, getPost, getPostById, getPosts } from "../controllers/postController.js"

const router = express.Router()

router.get("/", getPosts)

router.get("/:slug", getPost)

router.get("/id/:id", getPostById)

router.get("/user/:userId", getAllPostByUserId)

router.post("/", createPost)

router.patch("/:id", editPost)

router.delete("/:id", deletePost)



export default router