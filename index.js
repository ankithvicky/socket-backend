var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const PORT_NUMBER = 4000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

// Sockets
io.on('connection', (socket) => {
    io.emit('connected');
    socket.on('disconnect', () => {
        io.emit('disconnected');
    })
    socket.on('message', (data) => {
        io.emit('message_push', data);
    });
});

http.listen(PORT_NUMBER, (err) => {
    if (err)
        console.log(err);
    console.log(`Listening on the port ${PORT_NUMBER}`)
})