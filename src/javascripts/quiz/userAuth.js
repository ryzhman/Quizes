/**
 * Created by Олександр on 09.01.2017.
 */
'use strict';
import userTemplate from "../../templates/quiz/userTmpl";
import $ from 'jquery';

let allQuestions = [];
let userData = [];

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
        if (!userAnswer) {
            alert("You have not finished test yet");
        }
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
        console.log(userAnswer);
        if (userAnswer.length === 0) {
            alert("You have not finished test yet");
        }
        let currentQuestionAnsw = getAnswerForQuestionById(multipleQuestions[i]);
        console.log(currentQuestionAnsw);
        var areSame = (userAnswer.length === currentQuestionAnsw.length) && userAnswer.every((element, index) => {
                return element === currentQuestionAnsw[index];
            });
        if (areSame) {
            numberOfCorrectAnw++;
        }
    }

    for (let i = 0; i < textQuestions.length; i++) {
        let userAnswer = $("input[name='text" + textQuestions[i].id + "']").val();
        if (!userAnswer) {
            alert("You have not finished test yet");
        }
        let currentQuestionAnsw = getAnswerForQuestionById(textQuestions[i]);
        if (userAnswer === currentQuestionAnsw[0]) {
            numberOfCorrectAnw++;
        }
    }
    console.log(numberOfCorrectAnw);
    let result = {
        total: allQuestions.length,
        correctAnsw: numberOfCorrectAnw
    };
    evalResults(result);
};

function authAsUser(user, data) {
    allQuestions = data;
    userData = user;

    $('#headerDiv').html(userTemplate.userWelcomeInfo(user));

    $('#bodyDiv').html(userTemplate.createTestsList(allQuestions));

    $("#quiz").submit(evalTest);
    window.location.href = "#quiz.html";
}


module.exports = {
    authAsUser: authAsUser,

};