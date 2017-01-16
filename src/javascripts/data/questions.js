/**
 * Created by Олександр on 09.01.2017.
 */
"use strict";

const types = {
    "opt": "opt",
    "open": "open",
    "multiple": "multiple"
};

function getType(type){
    return types[type];
}

module.exports = {
    getQuestions,
    getType,
};

function getQuestions() {
    return [
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
}

