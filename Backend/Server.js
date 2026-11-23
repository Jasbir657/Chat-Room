import app from "./Src/App/app.js"
import connectDB from "./Src/Config/db.js";
import { createServer } from "node:http";
import { initializeSocket } from "./Src/Sockets/Socket.Server.js";

await connectDB()

const httpServer = createServer(app);
initializeSocket(httpServer)

httpServer.listen(3000, ()=>{
    console.log("Server is Running on port 3000");
})
