/**
 * Created by Олександр on 09.01.2017.
 */
'use strict';
import userTemplate from "../../templates/quiz/userTmpl";
import $ from 'jquery';
import usersData from '../data/users';
import questionData from '../data/questions';
import hashChangeHandler from '../../templates/hashHandler';

let allQuestions = [];
let userData = [];
let previousLocation;

let getAnswerForQuestionById = (quiz) => {
    return quiz.answer;
};

let restartTest = () => {
    authAsUser(userData, allQuestions);
};

let evalResults = (result) => {
    console.log('in evalResults');
    $('#bodyDiv').html(userTemplate.renderResult(result));
    if ($('#tryAgain').length) {
        console.log($('#tryAgain').length);
        $('#tryAgain').click(restartTest);
    }
    window.location.href = "#quizResult.html";
};

let evalTest = (event) => {
    event.preventDefault();
    let numberOfCorrectAnw = 0;

    let numberOfOpts = 0;
    let optsQuestions = [];
    let numberOfMultiple = 0;
    let multipleQuestions = [];
    let numberOfText = 0;
    let textQuestions = [];
    allQuestions.map(item => {
        if (item.type === "opt") {
            ++numberOfOpts;
            optsQuestions.push(item);
        } else if (item.type === "multiple") {
            ++numberOfMultiple;
            multipleQuestions.push(item);
        } else {
            ++numberOfText;
            textQuestions.push(item);
        }
    });

    for (let i = 0; i < optsQuestions.length; i++) {
        let userAnswer = $("input[name='r" + optsQuestions[i].id + "']:checked").val();
        let currentQuestionAnsw = getAnswerForQuestionById(optsQuestions[i]);
        if (userAnswer === currentQuestionAnsw[0]) {
            numberOfCorrectAnw++;
        }
    }

    for (let i = 0; i < multipleQuestions.length; i++) {
        let userAnswer = [];
        $("input[name='check" + multipleQuestions[i].id + "']:checked").each((e, selected) => {
            userAnswer[e] = $(selected).val();
        });
        let currentQuestionAnsw = getAnswerForQuestionById(multipleQuestions[i]);
        var areSame = (userAnswer.length === currentQuestionAnsw.length) && userAnswer.every((element, index) => {
                return element === currentQuestionAnsw[index];
            });
        if (areSame) {
            numberOfCorrectAnw++;
        }
    }

    for (let i = 0; i < textQuestions.length; i++) {
        let userAnswer = $("input[name='text" + textQuestions[i].id + "']").val();
        let currentQuestionAnsw = getAnswerForQuestionById(textQuestions[i]);
        if (userAnswer === currentQuestionAnsw[0]) {
            numberOfCorrectAnw++;
        }
    }
    let result = {
        total: allQuestions.length,
        correctAnsw: numberOfCorrectAnw
    };
    usersData.setUserProperty(usersData.getActiveUser(), "results", {'date':usersData.getActiveUser().lastVisit, 'score': (result.correctAnsw/result.total).toPrecision(2)});
    evalResults(result);
};

function authAsUser(user, data) {
    allQuestions = data;
    userData = user;

    $('#headerDiv').html(userTemplate.userWelcomeInfo(user));

    $('#bodyDiv').html(userTemplate.createTestsList(allQuestions));

    $("#quiz").submit(evalTest);
    previousLocation = window.location.hash;
    window.location.hash = "#quiz";
}

let displayQuiz = ()=>{
    console.log(userData);
    console.log(allQuestions);
    if(userData && allQuestions) {
        authAsUser(userData, allQuestions);
    } else {
        userData = usersData.getUsers();
        allQuestions = questionData.getQuestions();
        authAsUser(userData, allQuestions);
    }
};

window.onhashchange = function () {
    if (window.innerDocClick) {
        window.innerDocClick = false;
    } else {
        hashChangeHandler.handleHashChange(window.location.hash);
    }
};

module.exports = {
    authAsUser: authAsUser,
    displayQuiz,
};