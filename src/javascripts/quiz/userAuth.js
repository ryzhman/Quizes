/**
 * Created by Олександр on 09.01.2017.
 */
'use strict';
import userTemplate from "../../templates/quiz/userTmpl";
import $ from 'jquery';

function authAsUser(user, data) {
    let headerDiv = document.getElementById("headerDiv");
    $(headerDiv).html(userTemplate.userWelcomeInfo(user));

    let bodyDiv = document.getElementById("bodyDiv");
    $(bodyDiv).html(userTemplate.createTestsList(data[0]));


    window.location.href = "#quiz.html";
}

module.exports = {
    authAsUser: authAsUser,

};