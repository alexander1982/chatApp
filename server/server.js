const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const app = new express();
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

console.log('Loging ' + publicPath);

app.listen(port, () => {
	console.log(`App is running on port ${port}`);
});