import express from "express"
import { allCommentsByParams, createComment } from "../controllers/commentsController.js"

const router = express.Router()

router.get("/", allCommentsByParams)

router.get("/:id", (req,res)=>{
    res.status(200).send("single comment id")
})

router.post("/", createComment)

router.patch("/:id", (req,res)=>{
    res.status(200).send("update single comment")
})

router.delete("/:id", (req,res)=>{
    res.status(200).send("delete single comment")
})

export default router