/**
 * Created by Олександр on 23.01.2017.
 */
'use strict';
import login from "../javascripts/login/loginPage";
import userAuth from '../javascripts/quiz/userAuth';
import adminAuth from '../javascripts/admin/adminAuth';
import userData from '../javascripts/data/users';

let handleHashChange = (hash, usersList, quizesList, loginData) => {
    console.log('in hashchange');
    if (hash === '#main.html') {
        console.log(login);
        login.initLoginPage();
    } else if (hash === '#quiz.html') {
        console.log(userAuth);
        userAuth.displayQuiz();
    } else if (hash === '#adminPage.html') {
        let data = [usersList, quizesList];
        console.log(adminAuth);
        adminAuth.authAsAdmin(userData.getActiveUser(), data);
    }
};

module.exports = {handleHashChange};