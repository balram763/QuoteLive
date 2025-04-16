const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  }
});
const userSocketMap = {};

const getReceiverId = (userId) => {
    return userSocketMap[userId]
}


io.on("connection", (socket) => {
  console.log("A user is connected", socket.id);
  const userId = socket.handshake.query.userId;

  if (userId) userSocketMap[userId] = socket.id;
  io.emit("getOnlineUser", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("user is disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUser", Object.keys(userSocketMap));
  });
});

module.exports = { io, app, server,getReceiverId };
