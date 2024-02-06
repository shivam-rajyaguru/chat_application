const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const { Socket } = require('socket.io');

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname , './public');
app.use(express.static(static_path));

const server = http.createServer(app)

app.get('/',(req,res)=>{
   res.sendFile(__dirname + '/index.html')
})


server.listen((port) ,()=>{
    console.log(`Listening on port number : ${port}`);
})

//socket

const io = require('socket.io')(server)
io.on('connection' , (Socket) => {
    console.log("connected..");
    Socket.on("message",(msg)=>{
        Socket.broadcast.emit("message",msg);
    })
})

