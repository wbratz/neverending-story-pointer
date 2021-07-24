const express = require('express');
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io")

const io = new Server(server,  {
    cors: {
        origin: "http://localhost:3000"
    }
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

io.on("connection", (socket) => {
    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
        users.push({
            userID: id,
            username: socket.userName,
            storypoints: 0
        });
    }
    
    socket.broadcast.emit("user connected", {
        userID: socket.id,
        username: socket.userName,
        storypoints: 0
    });

    socket.emit("users", users);

    console.log(socket.userName+" connected");

    socket.on('disconnect', () => {
        console.log(socket.userName+" disconnected")

        socket.broadcast.emit("user disconnected", {
            userID: socket.id,
            username: socket.userName,
        })

    });

    socket.on("submit points", (user) => {
        socket.broadcast.emit("submit points", user)
    })

    socket.on("user added", (msg) => {
        io.emit("user added", msg);
    })
});

io.use((socket, next) => {
    
    const username = socket.handshake.auth.userName;
   
    if(!username) {
        return next(new Error("invalid username"));
    }

    socket.userName = username;
    next();
})

server.listen(3001, () => {
    console.log("listening on *:3001")
})