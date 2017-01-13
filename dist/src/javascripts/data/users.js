"use strict";

module.exports = {
	getUsers: getUsers
};

function getUsers() {
	return [{
		id: 0,
		name: "user",
		pass: "user",
		access: "limited",
		lastVisit: new Date().toString(),
		group: 'client'
	}, {
		id: 1,
		name: "admin",
		pass: "admin",
		access: "unlimited",
		lastVisit: new Date().toString(),
		group: 'admin'
	}];
}
//# sourceMappingURL=users.js.map