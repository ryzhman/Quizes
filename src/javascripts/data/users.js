"use strict";
module.exports = {
	getUsers: getUsers
};


function getUsers() {
	return [
		{
			name: "user",
			pass: "user",
			access: "limited",
			lastVisit: new Date().toString(),
			group: 'client'
		},
		{
			name: "admin",
			pass: "admin",
			access: "unlimited",
			lastVisit: new Date().toString(),
			group: 'admin'
		}
	];
}