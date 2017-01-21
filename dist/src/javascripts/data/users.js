"use strict";

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setUsers = function setUsers(list) {
    var parsedList = JSON.stringify(list);
    localStorage.setItem('userList', parsedList);
};

function getUsers() {
    var users = localStorage.getItem('userList');
    return JSON.parse(users);
}

var getMaxId = function getMaxId(list) {
    var result = list.map(function (a) {
        return a.id;
    });
    return Math.max.apply(null, result);
};

var addUser = function addUser(user) {
    var users = getUsers();
    var maxId = getMaxId(users);
    user.id = ++maxId;
    users.push(user);
    setUsers(users);
};

var removeUser = function removeUser(userId) {
    var users = getUsers();
    var listWithoutUser = _jquery2.default.grep(users, function (e) {
        return e.id !== parseInt(userId);
    });
    console.log(listWithoutUser);
    if (listWithoutUser.length === users.length - 1) {
        setUsers(listWithoutUser);
        return 1;
    } else {
        return 0;
    }
};

var initData = function initData() {
    var usersList = [{
        "id": 0,
        "name": "user",
        "pass": "user",
        "access": "limited",
        "lastVisit": "",
        "group": 'client'
    }, {
        "id": 1,
        "name": "admin",
        "pass": "admin",
        "access": "unlimited",
        "lastVisit": "",
        "group": 'admin'
    }];
    setUsers(usersList);
};

module.exports = {
    getUsers: getUsers,
    addUser: addUser,
    setUsers: setUsers,
    initData: initData,
    removeUser: removeUser
};
//# sourceMappingURL=users.js.map