import express from "express"
import { allCategory, createCategory } from "../controllers/categoryController.js"

const router = express.Router()

router.get("/", allCategory)

router.get("/:slug", (req,res)=>{
    res.status(200).send("single category")
})

router.post("/", createCategory)

router.patch("/:id", (req,res)=>{
    res.status(200).send("update single category")
})

router.delete("/:id", (req,res)=>{
    res.status(200).send("delete single category")
})

export default router