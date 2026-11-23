import express from "express"
import router from "../Routes/routes.js"
import cors from "cors"

const app = express()

app.use(express.json())

app.use(cors({
  origin: "chatroom-jasbir657.vercel.app",
  credentials: true
}));
app.use("/api" , router)

export default app