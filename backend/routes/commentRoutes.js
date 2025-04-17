import express from "express"

const router = express.Router()

router.get("/anotherTest", (req,res)=>{
    res.status(200).send("it works with another text")
})

router.get("/:id", (req,res)=>{
    res.status(200).send("single comment id")
})

router.post("/", (req,res)=>{
    res.status(200).send("new comment created")
})

router.patch("/:id", (req,res)=>{
    res.status(200).send("update single comment")
})

router.delete("/:id", (req,res)=>{
    res.status(200).send("delete single comment")
})

export default router