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
    user.results = [];
    users.push(user);
    setUsers(users);
};

let removeUser = (userId) => {
    let users = getUsers();
    let listWithoutUser = $.grep(users, (e) => {
        return e.id !== parseInt(userId);
    });
    if (listWithoutUser.length === (users.length - 1)) {
        setUsers(listWithoutUser);
        return 1;
    } else {
        return 0;
    }
};

let setUserProperty = (user, propertyName, value) => {
    console.log('in set property');
    console.log(user);
    let userToChange = $.grep(getUsers(), item => {
        return item.id === user.id;
    });
    console.log(userToChange[0]);
    if (userToChange[0].hasOwnProperty(propertyName)) {
        if (propertyName !== 'results') {
            console.log(userToChange[0][propertyName]);
            userToChange[0][propertyName] = new Date().toString();
        } else {
            console.log(userToChange[0][propertyName]);
            userToChange[0][propertyName].push(value);
        }
        let listWithoutUserToChange = $.grep(getUsers(), item => {
            return item.id !== userToChange[0].id;
        });
        listWithoutUserToChange.push(userToChange[0]);
        setUsers(listWithoutUserToChange);
    }
};

let setActiveUser = (user) => {
    localStorage.setItem("activeUser", JSON.stringify(user));
};

let getActiveUser = () => {
    return JSON.parse(localStorage.getItem("activeUser"));
};

let disableActiveUser = () => {
    localStorage.removeItem("activeUser");
};

let initData = () => {
    let usersList = [{
        "id": 0,
        "name": "user",
        "pass": "user",
        "access": "limited",
        "lastVisit": "",
        "group": 'client',
        "results": [],
    }, {
        "id": 1,
        "name": "admin",
        "pass": "admin",
        "access": "unlimited",
        "lastVisit": "",
        "group": 'admin',
        "results": [],
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
    setUserProperty,
    isInited,
    setActiveUser,
    getActiveUser,
    disableActiveUser,
};