/**
 * Created by Олександр on 14.01.2017.
 */
"use strict";
import html from "html-template-tag";

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

const createAddUserButton = () => html`
    <p>
    <button id="modalUser_open">Add user</button>
    </p>
`;

const createAddQuizButton = () => html`
    <p>
    <button id="modalQuiz_open">Add quiz</button>
    </p>
`;

module.exports = {
    usersListTmpl,
    createAddUserButton,
    createAddQuizButton,
    quizesListTmpl,
    adminWelcomeInfo
};
