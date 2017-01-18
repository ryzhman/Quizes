"use strict";

let storage = localStorage;

let getUsers = () => {
    return storage.getItem('userList');
};

let setUsers = (list) => {
    storage.setItem('userList', list);
};

let addUser = (user) => {
    let users = getUsers();
    users.push(user);
};

let initData = () => {
    let usersList = [{
        id: 0,
        name: "user",
        pass: "user",
        access: "limited",
        lastVisit: new Date().toString(),
        group: 'client'
    },
        {
            id: 1,
            name: "admin",
            pass: "admin",
            access: "unlimited",
            lastVisit: new Date().toString(),
            group: 'admin'
        }];
    setUsers(usersList);
};

module.exports = {
    getUsers,
    addUser,
    setUsers,
    initData,
};