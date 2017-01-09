/**
 * Created by Олександр on 09.01.2017.
 */
"use strict";

import auth from "./auth";

function initForm() {
    let parent = document.getElementById("bodyDiv");
    let loginForm = document.createElement('form');
    loginForm.setAttribute('class', 'login');
    let array = new Array(parent, loginForm);
    return array;
}

function createHeader(parentAndLogin) {
    let title = document.createElement('h2');
    title.innerText = "Enter your credentials here";
    parentAndLogin[0].appendChild(title);
}

function loginForm(parentAndLogin) {
    let title = document.createElement('h4');
    title.innerText = "Username:";

    let input = document.createElement('input');
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
    let title = document.createElement('h4');
    title.innerText = "Password:";

    let input = document.createElement('input');
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
    let button = document.createElement('input');
    button.setAttribute('class', 'submitBut');
    button.setAttribute('type', 'submit');
    button.setAttribute('value', 'Submit');
    button.addEventListener('click', auth.validateCredentials);

    parentAndLogin[1].appendChild(document.createElement('br'));
    parentAndLogin[1].appendChild(button);
    parentAndLogin[0].appendChild(parentAndLogin[1]);
}

function createForm() {
    let parentAndLoginForm = initForm();
    if (parentAndLoginForm.length !== 0) {
        createHeader(parentAndLoginForm);
        loginForm(parentAndLoginForm);
        passForm(parentAndLoginForm);
        createSubmitButton(parentAndLoginForm);
    }
};

module.exports = {
    createLoginForm: createForm,
};
