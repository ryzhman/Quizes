/**
 * Created by Олександр on 19.01.2017.
 */
"use strict";
import html from "html-template-tag";

//creates a template for admin greeting
const userWelcomeInfo = loginDt => {
    return html`
    <h2>
    Hello ${loginDt.name}! Last time you visited this page was ${loginDt.lastVisit}.
    </h2>
`;
};

const createTestsList = (testsList) => {
    return `
    <h2>General knowledge test</h2>
    ${testsList.map(quiz => `
       <h4 class="questions">${quiz.text}</h4>
       <form id="quiz" action="#">
           <p>
               ${renderOptions(quiz)}
           </p>
           <p><input type="submit" value="Finish test"></p>
       </form>
    `).join("")}
`;
};

const renderOptions = (quiz) => {
    if(quiz.type === 'opt'){
        return `
            ${quiz.options.map(option => `
                <ul class="options">
                ${renderOptionForm(quiz, option)}
                </ul>
                `).join("")}
            `;
    } else if (quiz.type === 'multiple') {
        return `
             ${quiz.options.map(option => `
                <ul class="options">
                ${renderMultipleForm(quiz, option)}
                </ul>
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
                <input type="radio" id="radio + ${quiz.id} + " name="r + ${quiz.id}" value="opt' + ${quiz.id} + '" height="48">
                <label for="r1"> ${option}</label>
                </li>
        `;
};

const renderMultipleForm = (quiz, option) => {
    return `<li class="eachOption">
                <input type="checkbox" id="checkbox + ${quiz.id} + " name="check + ${quiz.id}" value="opt' + ${quiz.id} + '" height="48" >
                <label for="check1">${option}</label>
                </li>
        `;
};

const renderTextForm = (quiz) => {
    return `<li class="eachOption">
        <input class="textOption" type="text" name="text + ${quiz.id} + " id="text' + ${quiz.id} + '" required placeholder="Enter answer here..." value="" minlength="3" height="48" >
        </li>
    `;
};
/*
 const createQuizBlock = (quiz) => {
 return html`
 `;
 };
 // createQuizBlock(quiz)}


 const createOptionsBlock = (type, options) => {
 let htmlToInsert = "<ul>";
 if (type === "opt") {
 htmlToInsert += html`${options.map(option => html`
 <li>
 <input type="radio" id="radio' + i + '" name="r1" value="opt' + i + '" minlength="3" height="48" class="inputs">
 <label>${option}</label>
 </li>
 `)
 };
 `;
 } else if (type === 'multiple') {
 htmlToInsert += html`${options.map(option => html`
 <li>
 <input type="checkbox" id="checkbox' + i + '" name="r1" value="opt' + i + '" minlength="3" height="48" class="inputs">
 <label>${option}</label>
 </li>
 `)
 };
 `;
 } else {
 htmlToInsert += html`
 <li>
 <input type="text" id="text' + i + '" required placeholder="Enter answer here..." value="opt' + i + '" minlength="3" height="48" class="inputs">
 </li>
 `;
 }
 htmlToInsert += '</ul>';
 console.log(htmlToInsert);
 return htmlToInsert;
 };*/

module.exports = {
    userWelcomeInfo,
    createTestsList
};

