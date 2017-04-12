const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = new express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user connected');

	socket.emit('newMessage', {
		from: 'Admin',
		text: 'Hello new user and welcome to our cool chat',
		createdAt: new Date()
	});
	
	socket.broadcast.emit('newMessage',{
		from: 'Admin',
		text: 'New user joined say hello',
		createdAt: new Date()
	});
	
	socket.on('createMessage', (message) => {
		io.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date()
		});
		
		//socket.broadcast.emit('newMessage',{
		//		from: message.from,
		//		text: message.text,
		//		createdAt: new Date()
		//	});
	});
	
	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});

server.listen(port, () => {
	console.log(`App is running on port ${port}`);
});