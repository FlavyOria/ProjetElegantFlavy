const express = require('express');

const app = express();

const http = require('http');

const server = http.createServer(app);

const { Server } = require("socket.io");

const io = new Server(server, {

  cors: {

    origin: "*",

    methods: ["GET", "POST"]

  }

});

 

app.get('/', (req, res) => {

  res.sendFile(__dirname + '/index.html');

});

app.use('/', express.static(__dirname + '/'));

 

io.on('connection', (socket) => {

    console.log('Un user est connecte');

 

    socket.on('message', (msg)=>{

        io.emit('message', msg);

    });

 

    socket.on('chat message', (msg) => {

        io.emit('chat message', msg);

    });

 

    socket.on('disconnect', () => {

        console.log('User est deconecte');

    });

});

 

server.listen(3000, () => {

  console.log('Utilise la porte:3000');

});