/**
 * Created by Олександр on 19.01.2017.
 */
"use strict";
import html from "html-template-tag";
import userData from '../../javascripts/data/users';

//creates a template for admin greeting
const userWelcomeInfo = loginDt => {
    return html`
    <h2>
    Hello ${loginDt.name}! ${loginDt.lastVisit ? `Last time you visited this page was ${loginDt.lastVisit}` : ``}
    </h2>
`;
};

const createTestsList = (testsList) => {
    return `
    <h2>General knowledge test</h2>
    <form id="quiz" action="#">
    <ul class="options">
        ${testsList.map(quiz => `
           <h4 class="questions">${quiz.text}</h4>
               <p>
                   ${renderOptions(quiz)}
               </p>
              
        `).join("")}
    </ul>
    <p><input id='submitTestResults' type="submit" value="Finish test"></p>
    </form>
`;
};

const renderOptions = (quiz) => {
    if (quiz.type === 'opt') {
        return `
            ${quiz.options.map(option => `
                ${renderOptionForm(quiz, option)}
                `).join("")}
            `;
    } else if (quiz.type === 'multiple') {
        return `
             ${quiz.options.map(option => `
                ${renderMultipleForm(quiz, option)}
                `).join("")}
        `;
    } else {
        return `
            ${renderTextForm(quiz)}
        `;
    }
};

const renderOptionForm = (quiz, option) => {
    return `
                <li class="eachOption">
                <input type="radio" id="radio${quiz.id}" name="r${quiz.id}" value='${option}' height="48">
                <label for="r1"> ${option}</label>
                </li>
        `;
};

const renderMultipleForm = (quiz, option) => {
    return `<li class="eachOption">
                <input type="checkbox" id="checkbox${quiz.id}" name="check${quiz.id}" value='${option}' height="48" >
                <label for="check1">${option}</label>
                </li>
        `;
};

const renderTextForm = (quiz) => {
    return `<li class="eachOption">
        <input class="textOption" type="text" name="text${quiz.id}" id="text${quiz.id}" required placeholder="Enter answer here..." value="" minlength="3" height="48" >
        </li>
    `;
};

const renderResult = (result) => {
    return `
        ${result.correctAnsw/result.total > 0.5 ? `
            <h4>You have passed the test: ${result.correctAnsw} correct of ${result.total} questions. 
            <br>Rate of correct answers is ${(result.correctAnsw/result.total).toPrecision(2)}
            </h4> 
            `: `
            <h4>You have not passed the test: only ${result.correctAnsw} correct of ${result.total} questions.
            <br>Rate of correct answers is ${(result.correctAnsw/result.total).toPrecision(2)}</h4>
            <p>${tryAgainButton()}</p>
        `}
        <p>Your previous score was ${userData.getActiveUser().results[userData.getActiveUser().results.length-1].score} and you 
        took that attempt on ${userData.getActiveUser().results[userData.getActiveUser().results.length-1].date}</p>
    `;
};

const tryAgainButton = () => {
    return `
        <button id='tryAgain'>Try again</button>
    `;
};

module.exports = {
    userWelcomeInfo,
    createTestsList,
    renderResult,
    tryAgainButton
};

