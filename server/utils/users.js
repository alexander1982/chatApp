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
	removeUser(id) {
		var user = this.getUser(id);
		
		if(user){
			this.users = this.users.filter((user) => user.id !== id);
		}
		
		return user;
	}
	getUser(id) {
		return this.users.filter(user => user.id === id)[0]
	}
	getUsersList(room){
		var users = this.users.filter(user => user.room === room);
		
		var namesArray = users.map(user => user.name);
		return namesArray;
	}
}

module.exports = {Users};
