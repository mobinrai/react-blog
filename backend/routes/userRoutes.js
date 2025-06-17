import express from "express"
import { getAllPostByUserId } from "../controllers/postController.js"
import { editNewUser, getAllUserOrSingle, getUserId } from "../controllers/userController.js"

const router = express.Router()

router.get("/", getAllUserOrSingle)

router.get("/:id", getUserId)

router.get("/getPost/:id", getAllPostByUserId)

router.post("/", (req,res)=>{
    res.status(200).send("new user created")
})


router.patch("/:id", editNewUser)

router.delete("/:id", (req,res)=>{
    res.status(200).send("delete single user")
})

export default router