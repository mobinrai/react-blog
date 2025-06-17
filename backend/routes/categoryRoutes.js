import express from "express"
import { allCategory, 
    createCategory,
    deleteCagetory,
    restoreCagetory,
    getCategory,
    editCategory 
} from "../controllers/categoryController.js"
import {checkIsAdmin, checkIsValidId} from '../middleware/myCustomMiddleware.js'

const router = express.Router()

router.get("/", allCategory)

router.get("/:slug", getCategory)

router.post("/", createCategory)

router.patch("/:id/delete", checkIsAdmin, checkIsValidId, deleteCagetory)

router.patch("/:id/restore", checkIsAdmin, checkIsValidId, restoreCagetory)

router.patch("/:id/edit", checkIsAdmin, editCategory)

router.patch("/:id", (req,res)=>{
    res.status(200).send("update single category")
})


export default router