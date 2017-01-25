/**
 * Created by Олександр on 09.01.2017.
 */
"use strict";
import $ from "jquery";

const types = {
    "opt": "opt",
    "open": "open",
    "multiple": "multiple"
};

let getType = (type) => {
    return types[type];
};

let setQuestions = (array) => {
    let parsedList = JSON.stringify(array);
    localStorage.setItem('questionList', parsedList);
};

function getQuestions() {
    let questions = localStorage.getItem('questionList');
    return JSON.parse(questions);
}

let getMaxId = (list) => {
    let result = list.map((a) => {
        return a.id;
    });
    return Math.max.apply(null, result);
};

let removeQuestion = (quizId) => {
    let questions = getQuestions();
    let finalQuest = $.grep(questions, (e) => {
        return e.id !== parseInt(quizId);
    });
    if(finalQuest.length === (questions.length-1)){
        setQuestions(finalQuest);
        return 1;
    } else {
        return 0;
    }
};

let addQuestion = (question) => {
    let list = getQuestions();
    let maxId = getMaxId(list);
    question.id = ++maxId;
    list.push(question);
    setQuestions(list);
};

let initData = () => {
    let questionsArray = [
        {
            "id": 0,
            "text": "What city is a capital of Ukraine?",
            "options": ["Kyiv", "Brussel", "Tokio", "Lviv"],
            "answer": ["Kyiv"],
            "type": types.opt
        },
        {
            "id": 1,
            "text": "Type basic parent object in JS?",
            "options": [],
            "answer": ["Object"],
            "type": types.open
        },
        {
            "id": 2,
            "text": "How to create new String in JS?",
            "options": ["'str'", "new String(string)", 'String("str")', 'stringify("str")'],
            "answer": ["'str'", 'new String(string)'],
            "type": types.multiple
        }
    ];
    setQuestions(questionsArray);
    setInited();
};

let isInited = () => {
    return localStorage.getItem('isQuizesDBInited');
};

let setInited = () => {
    localStorage.setItem('isQuizesDBInited', true);
};

module.exports = {
    getType,
    getQuestions,
    initData,
    addQuestion,
    removeQuestion,
    isInited
};
