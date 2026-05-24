import { Server,Socket } from "socket.io";
import { produceMessage } from "./helper.js";

interface CustomSocket extends Socket {
  room?:string
}
export function setupSocket(io:Server) {
  io.use((socket:CustomSocket,next)=>{
    const room = socket.handshake.auth.room || socket.handshake.headers.room
    if(!room){
      return next(new Error("Invalid Room"))
    }
    socket.room = room;
    next();
  })
  io.on("connection",(socket:CustomSocket)=> {
    // * Join the room
    socket.join(socket.room);

    socket.on("message",async (data)=>{
      console.log("Server side message",data);
      // emit- for all client
      // socket.emit("message",data);
      // will broadcast to everyone except me means in client side I won't be able to see
      // socket.broadcast.emit("message",data)
      // await prisma.chats.create({
      //   data:data
      // })
      try {
        await produceMessage(process.env.KAFKA_TOPIC, data);
      } catch (err) {
        console.error("Failed to publish chat message to Kafka:", err);
      }

      socket.to(socket.room).emit("message",data)
    })
    socket.on("disconnect",()=>{
      console.log("A user disconned",socket.id)
    })
  })
}
