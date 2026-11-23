import { Server} from "socket.io";
import { allowedOrigins } from "../App/app.js";

export const initializeSocket = (httpServer) => {
    const io = new Server(httpServer , {
  cors: {
    origin : allowedOrigins,
    credentials : true
  }  
});

io.on("connection", (socket) => {
  console.log("connected:", socket.id);

  socket.on("join", (userId) => {
    if (typeof userId === "string" && userId.trim()) {
      socket.join(`user:${userId}`);
    }
  });

  socket.on("message" , (msg)=>{
    console.log("Message from client" , msg);
    if (!msg || typeof msg !== "object") return;

    const outgoingMessage = {
      _id: msg._id,
      sender: msg.sender,
      receiver: msg.receiver,
      text: typeof msg.text === "string" ? msg.text : ""
    };

    if (typeof msg.receiver === "string") {
      socket.to(`user:${msg.receiver}`).emit("message", outgoingMessage);
    } else {
      socket.broadcast.emit("message", outgoingMessage);
    }
  })

  socket.on("disconnect", (reason) => {
    console.log("disconnected:", reason);
  });

});

return io
}
