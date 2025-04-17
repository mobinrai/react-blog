import express from "express"
import User from "../models/userModel.js"
const router = express.Router()

router.get("/", async (req,res)=>{
    const user = await User.find()
    res.status(200).send(user)
})

router.get("/:id", (req,res)=>{
    res.status(200).send("single user id")
})

router.post("/", (req,res)=>{
    res.status(200).send("new user created")
})

router.patch("/:id", (req,res)=>{
    res.status(200).send("update single user")
})

router.delete("/:id", (req,res)=>{
    res.status(200).send("delete single user")
})

export default router