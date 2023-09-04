const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIo = require("socket.io");


const app = express();
const port = process.env.PORT || 5000; 

const users = [{}];

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, it's working");
});

const server = http.createServer(app);

const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("New Connection");

  socket.on('Joined',({user}) => {
    users[socket.id]=user;
    console.log(`${user} has Joined`);
    socket.broadcast.emit('userJioned',{user:"Admin",message:`${users [socket.id]} has Joined`})
    socket.emit('welcome',{user:"Admin",message:`Welcome to the chat,${users [socket.id]} `})
  });

  socket.on('message', ({message,id}) => {
    io.emit('sendMessage',{user:users[id],message,id})
  })

    socket.on('disconnect', () =>{
      socket.broadcast.emit('leave',{user:"Admin",message:`${users [socket.id]}  has Remove`})
      console.log(`user left`);
    })
});

server.listen(port, () => {
  console.log(`server is working on http://localhost:${port} `);
});
