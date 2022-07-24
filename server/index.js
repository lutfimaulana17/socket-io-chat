const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = requre('socket.io');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST']
    }
})

io.on("connection", (socket) => {
    console.log(socket.id)

    socket.on("disconect", () => {
        console.log('User Disconected', socket.id)
    })
})

server.listen(3001, () => {
    console.log('SERVER RUNNING')
})