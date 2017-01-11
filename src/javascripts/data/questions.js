/**
 * Created by Олександр on 09.01.2017.
 */
"use strict";
module.exports = {
    getQuestions: getQuestions
};

const type = ["OA", "OQ", "MA"];

function getQuestions() {
    return [
        {
            text: "What city is a capital of Ukraine?",
            options: ["Kyiv", "Brussel", "Tokio", "Lviv"],
            answer: ["Kyiv"],
            type: type[0]
        },
        {
            text: "Type basic parent object in JS?",
            options: [],
            answer: ["Object"],
            type: type[1]
        },
        {
            text: "How to create new String in JS?",
            options: ['\'str\'', '\"str\"', 'new String()', 'String()', 'stringify()'],
            answer: ['\'\'', '\"\"', 'new String()'],
            type: type[2]
        }
    ];
}




/*
module.exports = {
    getUsers: getUsers
};


function getUsers() {
    return [*/
