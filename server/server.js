const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = new express();
var server = http.createServer(app);
var io = socketIO(server);

const generateMessage = require('./utils/message.js').generateMessage;
const generateLocationMessage = require('./utils/message.js').generateLocationMessage;

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user connected');

	socket.emit('newMessage', generateMessage('Admin', 'Hello new user and welcome to our cool chat'));
	
	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined say hello'));
	
	socket.on('createMessage', (message, callback) => {
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback();
	});
	
	socket.on('createLocationMessage', (coords) => {
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
	});
	
	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});

server.listen(port, () => {
	console.log(`App is running on port ${port}`);
});