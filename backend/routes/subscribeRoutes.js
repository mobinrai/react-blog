import express from 'express'
import { handleSubscribe, VerifyEmail } from '../controllers/subscribeController.js'

const router = express.Router()

router.post('/', handleSubscribe)

router.post('/verify-email', VerifyEmail)

export default router