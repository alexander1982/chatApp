const moment = require('moment');

var generateMessage = (from, text) => {
	return {
		from,
		text,
		createdAt: moment(new Date().getTime()).format('D/M/YYYY _ hh:mm a ')
	}
};

var generateLocationMessage = (from, latitude, longitude) => {
	return {
		from,
		url: "https://www.google.co.il/maps/place/31°58'15.4\"N+34°48'09.6\"E/@" + latitude + "," + longitude + "z",
		createdAt: moment(new Date().getTime()).format('D/M/YYYY _ hh:mm a ')
	}
};

module.exports = {
	generateMessage,
	generateLocationMessage
};