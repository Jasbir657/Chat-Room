import express from "express"
import router from "../Routes/routes.js"
import cors from "cors"

const app = express()

app.use(express.json())

export const allowedOrigins = [

"chatroom-jasbir657.vercel.app",
"chatroom-git-main-jasbir657.vercel.app",
"chatroom-kmigfdjrs-jasbir657.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use("/api" , router)

export default app