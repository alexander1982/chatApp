
var socket = io();
socket.on('connect', function() {
	console.log('Connected to server');
});

socket.on('disconnect', function() {
	console.log('Disconnected from server');
});

socket.on('newMessage', (message) => {
	console.log('Got new message', message);
	var li = $('<li></li>');
	li.text(`${message.from} - ${message.createdAt} =>  ${message.text}`);
	
	$('#messages').append(li);
});

socket.on('newLocationMessage', function(message)  {
	var li = $('<li></li>');
	var a = $('<a target="_blank">My current location</a>');
	
	li.text(`${message.from} - ${message.createdAt} =>  `);
	a.attr('href', message.url);
	li.append(a);
	$('#messages').append(li);
});

$('#message-form').on('submit', function(e) {
	e.preventDefault();
	socket.emit('createMessage', {
		from: 'User',
		text: $('[name=message]').val()
	}, function() {
		$('[name=message]').val(' ');
	});
});

var locationButton = $('#send-location');
locationButton.on('click', function(e) {
	e.preventDefault();
	if(!navigator.geolocation){
		return alert('Geolocation not supported by your browser');
	}
	
	locationButton.attr('disabled','disabled').text('Sending Location...');
	
	navigator.geolocation.getCurrentPosition(function(position) {
		locationButton.removeAttr('disabled').text('Send Location');
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
		
		console.log(position);
	}, function() {
		locationButton.removeAttr('disabled').text('Send Location');
		alert('Unable to fetch the location');
	})
});
