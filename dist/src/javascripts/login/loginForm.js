/**
 * Created by Олександр on 09.01.2017.
 */
"use strict";

var _auth = require("./auth");

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initForm() {
    var parent = document.getElementById("bodyDiv");
    var loginForm = document.createElement('form');
    loginForm.setAttribute('class', 'login');
    var array = new Array(parent, loginForm);
    return array;
}

function createHeader(parentAndLogin) {
    var title = document.createElement('h2');
    title.innerText = "Enter your credentials here";
    parentAndLogin[0].appendChild(title);
}

function loginForm(parentAndLogin) {
    var title = document.createElement('h4');
    title.innerText = "Username:";

    var input = document.createElement('input');
    input.setAttribute('id', 'login');
    input.setAttribute('class', 'input');
    input.setAttribute('type', 'text');
    input.required = true;
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('placeholder', 'Enter login here...');

    parentAndLogin[1].appendChild(title);
    parentAndLogin[1].appendChild(input);
}

function passForm(parentAndLogin) {
    var title = document.createElement('h4');
    title.innerText = "Password:";

    var input = document.createElement('input');
    input.setAttribute('id', 'pass');
    input.setAttribute('class', 'input');
    input.setAttribute('type', 'password');
    input.required = true;
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('placeholder', 'Enter password here...');

    parentAndLogin[1].appendChild(title);
    parentAndLogin[1].appendChild(input);
}

function createSubmitButton(parentAndLogin) {
    var button = document.createElement('input');
    button.setAttribute('class', 'submitBut');
    button.setAttribute('type', 'submit');
    button.setAttribute('value', 'Submit');
    button.addEventListener('click', _auth2.default.validateCredentials);

    parentAndLogin[1].appendChild(document.createElement('br'));
    parentAndLogin[1].appendChild(button);
    parentAndLogin[0].appendChild(parentAndLogin[1]);
}

function createForm() {
    var parentAndLoginForm = initForm();
    if (parentAndLoginForm.length !== 0) {
        createHeader(parentAndLoginForm);
        loginForm(parentAndLoginForm);
        passForm(parentAndLoginForm);
        createSubmitButton(parentAndLoginForm);
    }
}

module.exports = {
    createLoginForm: createForm
};
//# sourceMappingURL=loginForm.js.map