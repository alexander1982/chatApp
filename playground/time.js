const  moment = require('moment');

//var date = new Date();
//console.log(date.getMonth());

//var date = moment();
//date.add(1, 'year').subtract(9, 'months');
//console.log(date.format(), ' ', date.format('YYYY'), ' ', date.format('MMM'), ' ', date.format('Do'), ' ', date.format('dddd'));
//console.log('--------------------------------------------');
//console.log(date.format('hh:mm a'));

var someTimestamp = moment().valueOf();
console.log(someTimestamp);

var CreatedAt = 1234;
var date = moment(CreatedAt);
console.log(date.format('hh:mm a'));