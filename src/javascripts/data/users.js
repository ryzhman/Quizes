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

let setLastLogin = user => {
    let userToChange = $.grep(getUsers(), item => {
        return item.id === user.id;
    });
    userToChange[0].lastVisit = new Date().toString();
    let listWithoutUserToChange = $.grep(getUsers(), item => {
        return item.id !== userToChange[0].id;
    });
    listWithoutUserToChange.push(userToChange[0]);
    console.log(listWithoutUserToChange);
    setUsers(listWithoutUserToChange);
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
    setInited();
};

let isInited = () => {
  return localStorage.getItem('isUsersDBInited');
};

let setInited = () => {
    localStorage.setItem('isUsersDBInited', true);
};

module.exports = {
    getUsers,
    addUser,
    setUsers,
    initData,
    removeUser,
    setLastLogin,
    isInited,
};