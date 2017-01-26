/**
 * Created by Олександр on 09.01.2017.
 */
import users from './data/users.js';
import quizes from './data/questions.js';

let main = document.getElementById('page');
let usersList = users.getUsers();
let quizesList = quizes.getQuestions();

let getDataForGroup = (group) => {
    return config[group];
};

let config = {
    admin: {
        data: [usersList, quizesList]
    },
    client: {
        data: quizesList
    }
};

module.exports = {
    main,
    usersList,
    quizesList,
    getDataForGroup
};



