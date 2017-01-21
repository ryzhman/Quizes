/**
 * Created by Олександр on 09.01.2017.
 */
import $ from "jquery";
import modals from "../modals/adminModals";
import adminTmpl from "../../templates/admin/adminTmpl";
import questData from "../data/questions";
import userData from "../data/users";

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
    questData.removeQuestion(event.toElement.getAttribute('id'));
    refreshBodyDiv();
};

let removeUser = (event) => {
    event.stopPropagation();
    console.log(event);
    userData.removeUser(event.toElement.getAttribute('id'));
    refreshBodyDiv();
};

let addNewUser = (event) => {
    event.preventDefault();
    let newUsr = document.getElementById("name").value;
    let pswd = document.getElementById("pswd1").value;
    let group = $("#groups").val();

    let newUser = {
        "name": newUsr,
        "pass": pswd,
        "group": group,
    };
    newUser["access"] = (group === 'admin' ? 'unlimited' : 'limited');
    userData.addUser(newUser);

    refreshBodyDiv();
    modals.cleanUpFields();
    console.log(window);
    window.open(location, '_self', '');
    window.close();
    return false;
};

let addNewQuiz = (event) => {
    event.preventDefault();
    let text = document.getElementById("question").value;
    let type = $("#types").val();

    let opts = []; //array
    let options = $("input[id^=opt]");
    if (type !== "open") {
        for (let i = 0; i < options.length; i++) {
            opts[i] = $('#' + options[i].id).val();
        }
    }
    let answer = [];
    if (type === "open") {
        answer[0] = $("#open").val(); //array
    } else if (type === 'opt') {
        let checkedRadio = $("input[id^=radio]:checked").val();
        answer[0] = $('#' + checkedRadio).val();
    } else {
        let multipleAnsw = $("input[id^=multipleAns]:checked");
        for (let i = 0; i < multipleAnsw.length; i++) {
            let checkBoxValue = $(multipleAnsw[i]).val();
            answer[i] = $('#' + checkBoxValue).val();
        }
    }
    let newQuiz = {
        "text": text,
        "options": opts,
        "answer": answer,
        "type": questData.getType(type)
    };
    questData.addQuestion(newQuiz);

    refreshBodyDiv();
    modals.cleanUpFields();
    modals.closeModal();
    window.open(location, '_self', '');
    window.close();
};

let refreshBodyDiv = () => {
    let bodyDiv = document.getElementById("bodyDiv");
    let usersList = userData.getUsers();
    let quizesList = questData.getQuestions();

    $(bodyDiv).html(adminTmpl.usersListTmpl(usersList)
        + adminTmpl.createAddUserButton()
        + "\n\n"
        + adminTmpl.quizesListTmpl(quizesList)
        + adminTmpl.createAddQuizButton()
    );

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
    $('#pswd2').mouseleave(checkPasswordMatch);

    window.location.hash = "#adminPage.html";
    window.addEventListener('popstate', function (event) {
        alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
    });
};

function authAsAdmin(user, data) {
    let loginData = {
        name: user.name,
        lastVisit: user.lastVisit
    };

    //populating header div
    let headerDiv = document.getElementById("headerDiv");
    $(headerDiv).html(adminTmpl.adminWelcomeInfo(loginData));

    let htmltoInsert = modals.createNewUserModal() + modals.createNewQuizModal();
    let modalsDiv = $('#modalsDiv')[0];
    $(modalsDiv).html(htmltoInsert);

    //populating body div
    usersList = data[0];
    quizesList = data[1];

    refreshBodyDiv();
}

let checkPasswordMatch = () => {
    let password = $("#pswd1").val();
    let confirmPassword = $("#pswd2").val();

    if (password !== confirmPassword) {
        $("#pswdDoesntMatch").html("Passwords do not match!");
    }
};

// require('hashchange').update(function (hashFragment) {
//     console.log('hash is now ' + hashFragment)
// });

module.exports = {
    authAsAdmin: authAsAdmin,
};