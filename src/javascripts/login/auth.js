/**
 * Created by Олександр on 09.01.2017.
 */
"use strict";
let users = require('../data/users.js');

let auth = {
    validateCredentials: function (event) {
        event.preventDefault(); //prevent page from reloading
        let login = document.getElementById("login").value;
        let pass = document.getElementById("pass").value;

        if (login !== null && login !== undefined && pass !== null && pass !== undefined) {
            let user = validateLogin(login);
            if (user !== null) {
                validatePass(user, pass);
            } else {
                validateFail();
            }
        }
    }
};

function validateLogin(login) {
    let usersList = users.getUsers();
    let user = null;
    for (let i = 0; i < usersList.length; i++) {
        if (login === usersList[i].name) {
            user = usersList[i];
            break;
        }
    }
    return user;
}

function validatePass(user, pass) {
    if (pass === user.pass) {
        validateSuccess(user);
    } else {
        validateFail();
    }
}

function validateFail() {
    alert("Problems during logging in. Try again");
    document.getElementById("login").value = "";
    document.getElementById("pass").value = "";
}

function validateSuccess(user) {
    console.log(user);
    /*if(user.group === 'admin'){
     window.location.href="./src/tmpl/admin.html";
     } else if (user.group === 'client') {
     window.location.href="./src/tmpl/userProfile.html";
     }*/
}

module.exports = auth;