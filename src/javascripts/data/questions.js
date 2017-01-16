/**
 * Created by Олександр on 09.01.2017.
 */
"use strict";

const type = {
    "opt": "opt",
    "open": "open",
    "multiple": "multiple"
};

module.exports = {
    getQuestions: getQuestions,
    type,
};

function getQuestions() {
    return [
        {
            id: 0,
            text: "What city is a capital of Ukraine?",
            options: ["Kyiv", "Brussel", "Tokio", "Lviv"],
            answer: ["Kyiv"],
            type: type['opt']
        },
        {
            id: 1,
            text: "Type basic parent object in JS?",
            options: [],
            answer: ["Object"],
            type: type['open']
        },
        {
            id: 2,
            text: "How to create new String in JS?",
            options: ['\'str\'', '\"str\"', 'new String()', 'String()', 'stringify()'],
            answer: ['\'\'', '\"\"', 'new String()'],
            type: type['multiple']
        }
    ];
}


/*
 module.exports = {
 getUsers: getUsers
 };


 function getUsers() {
 return [*/
