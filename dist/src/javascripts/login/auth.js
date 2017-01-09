/**
 * Created by Олександр on 09.01.2017.
 */
"use strict";

var users = require('../data/users.js');

var auth = {
    validateCredentials: function validateCredentials(event) {
        event.preventDefault(); //prevent page from reloading
        var login = document.getElementById("login").value;
        var pass = document.getElementById("pass").value;

        if (login !== null && login !== undefined && pass !== null && pass !== undefined) {
            var user = validateLogin(login);
            if (user !== null) {
                validatePass(user, pass);
            } else {
                validateFail();
            }
        }
    }
};

function validateLogin(login) {
    var usersList = users.getUsers();
    var user = null;
    for (var i = 0; i < usersList.length; i++) {
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
//# sourceMappingURL=auth.js.map