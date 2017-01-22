'use strict';
import users from '../data/users.js';
import adminRole from '../admin/adminAuth';
import userRole from '../quiz/userAuth';
import renderer from '../pageRenderer';
import userData from '../data/users';

var auth = {
    validateCredentials: function (event) {
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
    if (user.group === 'admin') {
        var dataForAdmin = renderer.getDataForGroup(user.group);
        userData.setLastLogin(user);
        adminRole.authAsAdmin(user, dataForAdmin.data);
    } else if (user.group === 'client') {
        var dataForUser = renderer.getDataForGroup(user.group);
        userData.setLastLogin(user);
        userRole.authAsUser(user, dataForUser.data);
    }
}


module.exports = auth;