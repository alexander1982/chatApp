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
const isRealString = require('./utils/validators/validation.js').isRealString;
var Users = require('./utils/users.js').Users;
const users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user connected');
	
	socket.on('join', (params, callback) => {
		if(!isRealString(params.name) || !isRealString(params.room)){
			return callback('Add name and room name');	
		}

		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);
		
		io.to(params.room).emit('updateUsersList', users.getUsersList(params.room));
		socket.emit('newMessage', generateMessage('Admin', `Hello ${params.name}, welcome to the ${params.room} chat`));
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined the chat`));
		callback();
	});
	
	socket.on('createMessage', (message, callback) => {
		//console.log('createMessage',message);
		var user = users.getUser(socket.id);
		
		if(user && isRealString(message.text)){
			io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
		}
		
		callback();
	});
	
	socket.on('createLocationMessage', (coords) => {
		var user = users.getUser(socket.id);
		
		if(user){
			io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
		}
	});
	
	socket.on('disconnect', () => {
		var user = users.removeUser(socket.id);
		
		if(user){
			io.to(user.room).emit('updateUsersList', users.getUsersList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('admin',`${user.name} left`));
		}
		console.log('User disconnected');
	});
	
	socket.on('updateUsersList', (users) => {
		console.log('Updated Users list', users);
	})
});

server.listen(port, () => {
	console.log(`App is running on port ${port}`);
});