var generateMessage = (from, text) => {
	return {
		from,
		text,
		createdAt: new Date().getTime()
	}
};

var generateLocationMessage = (from, latitude, longitude) => {
	return {
		from,
		url: "https://www.google.co.il/maps/place/31°58'15.4\"N+34°48'09.6\"E/@" + latitude + "," + longitude + "z",
		createdAt: new Date().getTime()
	}
};

module.exports = {
	generateMessage,
	generateLocationMessage
};