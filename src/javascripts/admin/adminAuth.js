/**
 * Created by Олександр on 09.01.2017.
 */
import html from "html-template-tag";
import $ from "jquery";

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
        ${uList.map(usr => html`
            <tr>
            <td>${usr.name}</td>
            <td>${usr.pass}</td>
            <td>${usr.access}</td>
            <td>${usr.lastVisit}</td>
            <td>${usr.group}</td>
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
            </tr>
        `)}
        </table>
    `;

function authAsAdmin(user, data) {
    var loginData = {
        name: user.name,
        lastVisit: user.lastVisit
    };

    //populating header div
    let headerDiv = document.getElementById("headerDiv");
    $(headerDiv).html(adminWelcomeInfo(loginData));

    //populating body div
    let usersList = data[0];
    let quizesList = data[1];
    let bodyDiv = document.getElementById("bodyDiv");
    $(bodyDiv).html(usersListTmpl(usersList) + "\n\n" + quizesListTmpl(quizesList));

    window.location.href = "#adminPage.html";
}

module.exports = {
    authAsAdmin: authAsAdmin,
};