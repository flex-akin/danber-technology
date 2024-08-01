import express, { Request, Response, NextFunction, Application } from 'express'
import { Server } from "http"
import { config } from "dotenv"
import createHttpError from "http-errors";
import { errorResponse, notFound } from './middleware/errorHandler'
import { MessageInterface } from './interface/messageInterface'
import bodyParser from "body-parser"
import cors from "cors"
import mongoose from 'mongoose';
import UsersRouter from "./users/user.route"
import AuthRouter from "./auth/auth.route"
import TaskRouter from "./task/task.route"

const app: Application = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
config()

app.post('/health-status', async (req: Request, res: Response<MessageInterface>, next: NextFunction) => {
    res.status(200),
        res.send({
            message: "🚀 Server is up and running",
            status: true
        })
})

// ROUTES REGISTRATION
app.use("/api/v1/users", UsersRouter)
app.use("/api/v1/auth", AuthRouter)
app.use("/api/v1/task", TaskRouter )

app.use(notFound)
app.use(errorResponse)
const PORT: number = Number(process.env.PORT)
mongoose.Promise = Promise 
mongoose.connect(process.env.DB_URI as unknown as string);
mongoose.connection.on("connected", () => {
    console.log("Successfully connected to MongoDB");
  });
mongoose.connection.on("error", (error: Error) => console.log(error))

const server: Server = app.listen(PORT, () => console.log("🚀 app is running"))
