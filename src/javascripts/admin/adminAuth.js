/**
 * Created by Олександр on 09.01.2017.
 */
import $ from "jquery";
import modals from "../modals/adminModals";
import adminTmpl from "../../templates/admin/adminTmpl";

let modalWrapper;
let modalWindow;
let usersList;
let quizesList;

let createRemoveQuizButton = () => {
    let buttons = document.getElementsByClassName('removeQuiz');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', removeQuiz);
    }
};

let createRemoveUserButton = () => {
    let buttons = document.getElementsByClassName('removeUser');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', removeUser);
    }
};

//todo refactor for unique remove method
let removeQuiz = (event) => {
    event.stopPropagation();
    delete quizesList[event.toElement.getAttribute('id')];
    refreshPage();
};

let removeUser = (event) => {
    event.stopPropagation();
    delete usersList[event.toElement.getAttribute('id')];
    refreshPage();
};

let addNewUser = () => {
    let newUsr = document.getElementById("name").value;
    let pswd = document.getElementById("pswd1").value;
    let group = document.getElementById("groups").value;

    // let maxNumber = Math.max.apply(Math, listOfTodos.map(function (o) {
    //     return o.priority;
    // }));
    // if (priority.length == 0) {
    //     priority = ++maxNumber;
    // }
    let newUser = {
        "name": newUsr,
        "priority": pswd,
        "description": group,
        "access": group === 'admin' ? 'unlimited' : 'limited'
    };
    usersList.push(newUser);

    refreshPage();

    document.getElementById("name").value = "";
    document.getElementById("pswd1").value = "";
    document.getElementById("pswd2").value = "";
    document.getElementById("groups").value = "";
    window.open(location, '_self', '');
    window.close();
    return false;
};

function authAsAdmin(user, data) {
    let loginData = {
        name: user.name,
        lastVisit: user.lastVisit
    };

    //populating header div
    let headerDiv = document.getElementById("headerDiv");
    $(headerDiv).html(adminTmpl.adminWelcomeInfo(loginData));

    //populating body div
    usersList = data[0];
    quizesList = data[1];
    let bodyDiv = document.getElementById("bodyDiv");
    $(bodyDiv).html(modals.createNewUserModal() +
        adminTmpl.usersListTmpl(usersList) +
        adminTmpl.createAddUserButton() +
        "\n\n"
        + adminTmpl.quizesListTmpl(quizesList));

    modalWrapper = $('#modal_wrapper')[0];
    modalWindow = $('#modal_window')[0];

    createRemoveQuizButton();
    createRemoveUserButton();

    modals.addOpenEventListener();
    modals.addCloseEventListener();
    modals.addKeyAndClickEventListener();

    // document.getElementById("add_user").addEventListener("submit", addNewUser, false);
    document.addEventListener("DOMContentLoaded", modals.modal_init, false);
    $(document).ready(function () {
        $("#pswd1, #pswd2").keyup(checkPasswordMatch);
    });

    window.location.href = "#adminPage.html";
}

let refreshPage = () => {
    let bodyDiv = document.getElementById("bodyDiv");
    $(bodyDiv).html(usersListTmpl(usersList) + "\n\n" + quizesListTmpl(quizesList));
};


let checkPasswordMatch = () => {
    let password = $("#pswd1").val();
    let confirmPassword = $("#pswd2").val();

    if (password !== confirmPassword) {
        $("#pswdDoesntMatch").html("Passwords do not match!");
    }
};

module.exports = {
    authAsAdmin: authAsAdmin,
};