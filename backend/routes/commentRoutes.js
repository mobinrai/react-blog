import express from "express"
import { allCommentsByParams, createComment, getAllChildComments, getAllCommentsByPostUserId, deleteComment,editComment } from "../controllers/commentsController.js"

const router = express.Router()

router.get("/", allCommentsByParams)

router.get("/getAllComments", getAllCommentsByPostUserId)

router.get("/withChildren", getAllChildComments)

router.post("/", createComment)

router.patch("/:id/delete", deleteComment)

router.patch("/:id/edit", editComment)

router.delete("/:id", (req,res) => {

    res.status(200).send("delete single comment")
})

export default router