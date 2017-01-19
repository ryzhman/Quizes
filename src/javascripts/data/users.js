"use strict";
import $ from 'jquery';

let setUsers = (list) => {
    let parsedList = JSON.stringify(list);
    localStorage.setItem('userList', parsedList);
};

function getUsers() {
    let users = localStorage.getItem('userList');
    return JSON.parse(users);
}

let getMaxId = (list) => {
    let result = list.map((a) => {
        return a.id;
    });
    return Math.max.apply(null, result);
};

let addUser = (user) => {
    let users = getUsers();
    let maxId = getMaxId(users);
    user.id = ++maxId;
    users.push(user);
    setUsers(users);
};

let removeUser = (userId) => {
    let users = getUsers();
    let listWithoutUser = $.grep(users, (e) => {
        return e.id !== parseInt(userId);
    });
    console.log(listWithoutUser);
    if (listWithoutUser.length === (users.length-1)) {
        setUsers(listWithoutUser);
        return 1;
    } else {
        return 0;
    }
};

let initData = () => {
    let usersList = [{
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
    }
    ];
    setUsers(usersList);
};

module.exports = {
    getUsers,
    addUser,
    setUsers,
    initData,
    removeUser,
};