/**
 * Created by Олександр on 09.01.2017.
 */
import $ from "jquery";
import modals from "../modals/adminModals";
import adminTmpl from "../../templates/admin/adminTmpl";
import questData from "../data/questions";

let modalWrapperUser;
let modalWrapperQuiz;
let modalWindowUser;
let modalWindowQuiz;
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

let addNewUser = (event) => {
    event.preventDefault();
    let newUsr = document.getElementById("name").value;
    let pswd = document.getElementById("pswd1").value;
    let group = $("#groups").val();

    // let maxNumber = Math.max.apply(Math, listOfTodos.map(function (o) {
    //     return o.priority;
    // }));
    // if (priority.length == 0) {
    //     priority = ++maxNumber;
    // }
    let newUser = {
        "name": newUsr,
        "pass": pswd,
        "group": group,
    };
    newUser["access"] = (group === 'admin' ? 'unlimited' : 'limited');
    usersList.push(newUser);

    refreshPage();
    modals.cleanUpFields();
    window.open(location, '_self', '');
    window.close();
    return false;
};

let addNewQuiz = (event) => {
    event.preventDefault();
    let text = document.getElementById("question").value;
    let type = $("#types").val();

    let opts = []; //array
    let options = $('input[id^="opt"]');
    if (type !== "open") {
        for (let i = 0; i < options.length; i++) {
            opts[i] = $('#'+options[i].id).val();
        }
    }
    let answer = [];
    if (type !== "multiple") {
        answer[0] = $("#answer").val(); //array
    } else {
        let muiltipleAnsw = $('input[id^="multipleAns"]'); //todo how to represent multiple answers?
        for (let i = 0; i < multipleAnsw.length; i++) {
            answer[i] = muiltipleAnsw[i].val(); //array
        }
    }
    let newQuiz = {
        "text": text,
        "options": opts,
        "answer": answer,
        "type": questData[type]
    };
    console.log(type); //todo fix type issue
    console.log(questData[type]);
    quizesList.push(newQuiz);

    refreshPage();
    modals.cleanUpFields();
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
        + adminTmpl.quizesListTmpl(quizesList) +
        modals.createNewQuizModal() +
        adminTmpl.createAddQuizButton()
    );

    // modalWrapperUser = $('#modalWrapperUser')[0];
    // modalWrapperQuiz = $('#modalWrapperQuiz')[0];
    // modalWindowUser = $('#modalWindowUser')[0];
    // modalWindowQuiz = $('#modalWindowQuiz')[0];

    createRemoveQuizButton();
    createRemoveUserButton();

    modals.addOpenUserEventListener();
    modals.addOpenQuizEventListener();
    modals.addEventListenerOpts();
    modals.addCloseEventListener();
    modals.addKeyAndClickEventListener();

    document.getElementById("add_user").addEventListener("submit", addNewUser, false);
    document.getElementById("add_quiz").addEventListener("submit", addNewQuiz, false);
    document.addEventListener("DOMContentLoaded", modals.modal_init, false);
    $(document).ready(function () {
        $("#pswd1, #pswd2").keyup(checkPasswordMatch);
    });

    window.location.href = "#adminPage.html";
}

let refreshPage = () => {
    let bodyDiv = document.getElementById("bodyDiv");
    $(bodyDiv).html(modals.createNewUserModal() +
        adminTmpl.usersListTmpl(usersList) +
        adminTmpl.createAddUserButton() +
        "\n\n"
        + adminTmpl.quizesListTmpl(quizesList));
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