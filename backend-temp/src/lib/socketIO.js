import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

//Used to store online Users
const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  socket.on("connected", () => {
    console.log("User connected:", socket.id);
  });

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
  }
  //used to send events to all the conected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, httpServer };
