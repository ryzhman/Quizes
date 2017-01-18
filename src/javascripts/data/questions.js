/**
 * Created by Олександр on 09.01.2017.
 */
"use strict";

let storage = localStorage;
const types = {
    "opt": "opt",
    "open": "open",
    "multiple": "multiple"
};

let getType = (type) => {
    return types[type];
};

let setQuestions = (array) => {
    storage.setItem('questionList', array);
};

function getQuestions() {
    return storage.getItem('questionList');
};

let addQuestion = (question) => {
    let list = getQuestions();
    list.push(question);
};

let initData = () =>{
    let questionsArray = [
        {
            id: 0,
            text: "What city is a capital of Ukraine?",
            options: ["Kyiv", "Brussel", "Tokio", "Lviv"],
            answer: ["Kyiv"],
            type: types['opt']
        },
        {
            id: 1,
            text: "Type basic parent object in JS?",
            options: [],
            answer: ["Object"],
            type: types['open']
        },
        {
            id: 2,
            text: "How to create new String in JS?",
            options: ['\'str\'', '\"str\"', 'new String()', 'String()', 'stringify()'],
            answer: ['\'\'', '\"\"', 'new String()'],
            type: types['multiple']
        }
    ];
    setQuestions(questionsArray);
};

module.exports = {
    getType,
    getQuestions,
    initData,
    addQuestion,
}
