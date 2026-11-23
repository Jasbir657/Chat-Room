import express from "express"
import router from "../Routes/routes.js"
import cors from "cors"

const app = express()

app.use(express.json())

export const allowedOrigins = [
    "http://localhost:5173",
    "https://chatroom-jasbir657.vercel.app",
    "https://chatroom-kituozymr-jasbir657.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use("/api" , router)

export default app