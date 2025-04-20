import express from  'express';
import userRouter from './routes/userRoutes.js';
import commentRouter from './routes/commentRoutes.js';
import categoryRouter from './routes/categoryRoutes.js';
import postRouter from './routes/postRoutes.js';
import connectionDb from './lib/connectDb.js';
import webhookClerkRouter from './routes/webhookClerkRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import cors from 'cors'

const app = express();

app.use(cors(process.env.CLIENT_URL))
app.use(clerkMiddleware());

app.use("/webhooks", webhookClerkRouter);

app.use(express.json());

// allow cross-origin requests
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
      "Origin, X-Requested-With, Content-Type, Accept");
    next()
});

app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/comments", commentRouter);
app.use("/posts", postRouter);

app.use((error, req, res, next)=>{
    res.status(error.status || 500)
    res.json({
        message:error.message,
        stack:error.stack
    })
    next()
})

app.listen(process.env.PORT, ()=>{
    connectionDb()
    console.log('Server is runing in port 3000');
})