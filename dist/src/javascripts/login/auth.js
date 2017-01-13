'use strict';

var _users = require('../data/users.js');

var _users2 = _interopRequireDefault(_users);

var _adminAuth = require('../admin/adminAuth');

var _adminAuth2 = _interopRequireDefault(_adminAuth);

var _userAuth = require('../quiz/userAuth');

var _userAuth2 = _interopRequireDefault(_userAuth);

var _pageRenderer = require('../pageRenderer');

var _pageRenderer2 = _interopRequireDefault(_pageRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    var usersList = _users2.default.getUsers();
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
        var dataForAdmin = _pageRenderer2.default.config[user.group].data;
        _adminAuth2.default.authAsAdmin(user, dataForAdmin);
    } else if (user.group === 'client') {
        var dataForUser = _pageRenderer2.default.config[user.group].data;
        _userAuth2.default.authAsUser(user, dataForUser);
    }
}

module.exports = auth;
//# sourceMappingURL=auth.js.map