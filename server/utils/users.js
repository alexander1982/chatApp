//var users = [{
//	id: 144444,
//	name: 'Al',
//	room: 'New room'
//}];

//addUser(name, room);
//removeUser(id);
//getUser(id);
//getUserList(room);

//class Person {
//	constructor(name, room) {
//		this.name = name;
//		this.room = room;
//	}
//	getUserDescription() {
//		return `${this.name} is in room ${this.room}`
//	}
//}
//
//var me = new Person('A', '33');
//var description = me.getUserDescription();
//console.log(description);

class Users {
	constructor(){
		this.users = [];
	}
	addUser(id, name, room) {
		var user = {id, name, room};
		this.users.push(user);
		return user;
	}
}

module.exports = {Users};
