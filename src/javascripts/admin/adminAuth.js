/**
 * Created by Олександр on 09.01.2017.
 */
import html from "html-template-tag";
import $ from "jquery";
import modals from "../modals/adminModals";

var usersList;
var quizesList;

//creates a template for admin greeting
const adminWelcomeInfo = loginDt => html`
    <h2>
    Hello ${loginDt.name}! Last time you visited this page was ${loginDt.lastVisit}.
    </h2>
`;

//creates a template of table with all users
const usersListTmpl = uList => html`
        <table>
        <caption>The list of all users</caption>
        <th>Name</th>
        <th>Password</th>
        <th>Access</th>
        <th>Last visit</th>
        <th>Group</th>
        <th>Remove</th>
        ${uList.map(usr => html`
            <tr>
            <td>${usr.name}</td>
            <td>${usr.pass}</td>
            <td>${usr.access}</td>
            <td>${usr.lastVisit}</td>
            <td>${usr.group}</td>
            <td><button class="removeUser" id="${usr.id}">✗</button></td>
            </tr>
        `)}
        </table>
    `;

//creates a template of table with all questions
const quizesListTmpl = qList => html`
        <table>
        <caption>The list of all questions</caption>
        <th>Question text</th>
        <th>Options</th>
        <th>Correct answers</th>
        <th>Type of a question</th>
        <th>Remove</th>
        ${qList.map(quiz => html`
            <tr>
            <td>${quiz.text}</td>
            <td>
                <ul>
                    ${quiz.options.map(option => html`
                    <li> ${option} </li>
                    `)}
                </ul>
            </td>
            <td>
                <ul>
                    ${quiz.answer.map(answr => html`
                    <li>${answr}</li>
                    `)}
                </ul>
            </td>
            <td>${quiz.type}</td>
            <td><button class="removeQuiz" id="${quiz.id}">✗</button></td>
            </tr>
        `)}
        </table>
    `;

var createRemoveQuizButton = () => {
    let buttons = document.getElementsByClassName('removeQuiz');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', removeQuiz);
    }
};

var createRemoveUserButton = () => {
    let buttons = document.getElementsByClassName('removeUser');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', removeUser);
    }
};

//todo refactor for unique remove method
var removeQuiz = (event) => {
    event.stopPropagation();
    delete quizesList[event.toElement.getAttribute('id')];
    refreshPage();
};

var removeUser = (event) => {
    event.stopPropagation();
    delete usersList[event.toElement.getAttribute('id')];
    refreshPage();
};

var addNewUser = ()=>{
    var newUser = document.getElementById("name").value;
    var newTodoDescription = document.getElementById("description").value;
    var priority = document.getElementById("priority").value;

    var maxNumber = Math.max.apply(Math, listOfTodos.map(function (o) {
        return o.priority;
    }));
    if (priority.length == 0) {
        priority = ++maxNumber;
    }
    var newTodo = {
        "title": newTodoTitle,
        "priority": priority,
        "description": newTodoDescription,
        "status": "active"
    };
    var list = getListOfTodos();
    list.push(newTodo);

    show();
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("priority").value = "";
    window.open(location, '_self', '');
    window.close();
    return false;
};

function authAsAdmin(user, data) {
    var loginData = {
        name: user.name,
        lastVisit: user.lastVisit
    };

    //populating header div
    let headerDiv = document.getElementById("headerDiv");
    $(headerDiv).html(adminWelcomeInfo(loginData));

    //populating body div
    usersList = data[0];
    quizesList = data[1];
    let bodyDiv = document.getElementById("bodyDiv");
    $(bodyDiv).html(usersListTmpl(usersList) + "\n\n" + quizesListTmpl(quizesList));

    createRemoveQuizButton();
    createRemoveUserButton();

    document.getElementById("add_task").addEventListener("submit", addNewElement, false);
    document.addEventListener("DOMContentLoaded", modals.modal_init, false);

    window.location.href = "#adminPage.html";
}

let refreshPage = () => {
    let bodyDiv = document.getElementById("bodyDiv");
    console.log(usersList);
    console.log(quizesList);

    $(bodyDiv).html(usersListTmpl(usersList) + "\n\n" + quizesListTmpl(quizesList));
};

module.exports = {
    authAsAdmin: authAsAdmin,
};