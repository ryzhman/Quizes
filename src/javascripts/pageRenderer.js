/**
 * Created by Олександр on 09.01.2017.
 */
import users from './data/users.js';
import quizes from './data/questions.js';
import adminPage from '../templates/admin/admin.html';
import userPage from '../templates/quiz/questions.html';

let main = document.getElementById('page');
let usersList = users.getUsers();
let quizesList = quizes.getQuestions();

let config = {
    admin: {
        template: adminPage,
        data: [usersList, quizesList]
    },
    client: {
        template: userPage,
        data: [quizesList]
    }
};


module.exports = {config, main, usersList, quizesList};



