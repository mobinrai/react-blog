import express from "express"
import { webhookClerk } from "../controllers/webhookClerk.js"
import bodyParser from "body-parser"

const router = express.Router()

router.post('/clerk', bodyParser.raw({type:'application/json'}), webhookClerk)

export default router;