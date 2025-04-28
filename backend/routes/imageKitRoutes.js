import { Router } from "express";
import { imageKitDeleteImage, imgKitAuth } from "../controllers/imageKitController.js";


const router = Router()

router.get('/auth', imgKitAuth)
router.post('/deleteImage', imageKitDeleteImage)

export default router