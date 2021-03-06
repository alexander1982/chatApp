
var socket = io();

function scrollToBottom() {
	//Selectors
	var messages = $('#messages');
	var newMessage = messages.children('li:last-child');
	//Heighgts
	var clientHeight = messages.prop('clientHeight');
	var scrollHeight = messages.prop('scrollHeight');
	var scrollTop = messages.prop('scrollTop');
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();
	
	if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
		messages.scrollTop(scrollHeight);
	}
}

socket.on('connect', function() {
	var params = $.deparam(window.location.search);
	
	socket.emit('join', params, function(err) {
		if(err) {
			alert(err);
			window.location.href = '/';
		} else {
			console.log('No errorstring ');
		}
	});
});

socket.on('disconnect', function() {
	console.log('Disconnected from server');
});

socket.on('updateUsersList', function(users) {
	var ol = $('<ol></ol>');
	
	users.forEach(function(user) {
		ol.append($('<li></li>').text(user));
	});

	console.log(users);
	//console.log($('#main-header').text('Hi'));
	//$('#main-header').text(user.room);
});

socket.on('newMessage', function(message) {
	var template = $('#message-template').html();
	var html = Mustache.render(template, {
																					from: message.from,
																					date: message.createdAt,	
																					text: message.text
																				});
	$('#messages').append(html);
	scrollToBottom();
});

socket.on('newLocationMessage', function(message) {
	var template = $('#location-message-template').html();
	var html = Mustache.render(template, {
																					from: message.from,
																					date: message.createdAt,
																					url: message.url
																				});

	$('#messages').append(html);
	scrollToBottom();
});

$('#message-form').on('submit', function(e) {
	e.preventDefault();
	socket.emit('createMessage', {
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
