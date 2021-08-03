const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.userName,
      storypoints: socket.storypoints,
    });
  }

  socket.broadcast.emit("user connected", {
    userID: socket.id,
    username: socket.userName,
    storypoints: socket.storypoints,
  });

  socket.emit("users", users);

  console.log(socket.userName + " connected");

  socket.on("disconnect", () => {
    console.log(socket.userName + " disconnected");

    socket.broadcast.emit("user disconnected", {
      userID: socket.id,
      username: socket.userName,
    });
  });

  socket.on("submit points", (user) => {
    console.log(users);

    let idx = users.findIndex((x) => x.userID === user.userID);
    console.log(idx);

    users[idx].storypoints = user.storypoints;

    socket.broadcast.emit("submit points", user);

    console.log(user);

    console.log(users);
  });

  socket.on("user added", (msg) => {
    io.emit("user added", msg);
  });
});

io.use((socket, next) => {
  const username = socket.handshake.auth.userName;
  const storypoints = socket.handshake.auth.storypoints;

  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.storypoints = storypoints;
  socket.userName = username;
  next();
});

server.listen(3001, () => {
  console.log("listening on *:3001");
});
