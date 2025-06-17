import express from 'express'
import { storeMessage } from '../controllers/messageController.js'

const router = express.Router()

router.post('/', storeMessage)

export default router