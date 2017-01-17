/**
 * Created by Олександр on 13.01.2017.
 */
'use strict';
import $ from "jquery";
import html from "html-template-tag";

const createNewUserModal = () => html`
    <div id="modalWrapperUser">
        <div id="modalWindowUser">
            <div id="modalWindowHeader"><a id="modal_close">close <b>X</b></a></div>
            <p>Enter new user details:</p>
            <form id="add_user" action="#">
                <p><label>Name<strong>*</strong><br>
                    <input type="text" autofocus required id="name" minlength="6" value="" placeholder="Enter username here..." class="inputs"></label></p>
                <p><label>Password<strong>*</strong><br>
                    <input id="pswd1" type="password" required placeholder="Enter password here..." minlength="3" height="48" value="" class="inputs"></label></p>
                <p><label>Repeat password<strong>*</strong><br>
                    <input id="pswd2" type="password" required placeholder="Enter password once more..." minlength="3" height="48" value="" class="inputs"></label>
                    <div id="pswdDoesntMatch"></div></p>
                <p><label>Group<br>
                    <select id="groups" form="selectGroup">
                      <option value="admin">Admins</option>
                      <option value="user">Users</option>
                    </select>
                <p><input type="submit" value="Add user"></p>
            </form>
        </div>
    </div>
`;

const createNewQuizModal = () => html`
    <div id="modalWrapperQuiz">
        <div id="modalWindowQuiz">
            <div id="modalWindowHeader"><a id="modal_close">close <b>X</b></a></div>
            <p>Enter new quiz details:</p>
            <form id="add_quiz" action="#">
                <p><label>Question<strong>*</strong><br>
                    <input type="text" autofocus required id="question" minlength="6" value="" placeholder="Enter question text here..." class="inputs"></label></p>
                <p><label>Type<strong>*</strong><br>
                    <select id="types" form="selectType">
                      <option selected disabled>Choose here</option>
                      <option value="opt">Options</option>
                      <option value="open">Open question</option>
                      <option value="multiple">Multiple answers</option>
                    </select>
                </label></p>
                <p id="options">
                </p>
                <p><label>Answer<strong>*</strong></label><br/> <!--//todo checkbox for correct answers-->
                      <input type="text" autofocus required id="answer" value="" placeholder="Enter answer text here..." class="inputs"></label></p>
                </p>
                <p><input type="submit" value="Add quiz"></p>
            </form>
        </div>
    </div>
`;

let addEventListenerOpts = () => {
    $('#types')[0].addEventListener("change", renderOptionsForm, false);
};

let addEventListenersChooseOpt = () => {
    if ($('#numOfOptions')[0]) {
        $('#numOfOptions')[0].addEventListener("change", renderNumOfOptions, false);
    }
    if ($('#numOfOptionsMultiple')[0]) {
        $('#numOfOptionsMultiple')[0].addEventListener("change", renderNumOfOptionsMultiple, false);
    }
};

let renderOptionsForm = () => {
    let selectedOpt = $('#types').val();
    let htmlToInsert;
    if (selectedOpt === "opt") {
        htmlToInsert = () => html`
            <input id="numOfOptions" type="text" required placeholder="Enter number of options here..." minvalue="1" height="48" value="" class="inputs">
        `;
    } else if (selectedOpt === "open") {
        htmlToInsert = () =>
            html`
            <input id="open" type ="text" required placeholder="Enter answer here..." minLength="3" height="48" value="" class="inputs">
        `;
    } else {
        htmlToInsert = () => html`
            <input id="numOfOptionsMultiple" type="text" required placeholder="Enter number of options here..." minvalue="1" height="48" value="" class="inputs">
        `;
    }
    $('#options').html(htmlToInsert());
    addEventListenersChooseOpt();
};

let renderNumOfOptions = () => {
    let numOfOptions = $('#numOfOptions').val();
    $('#options').append('<br><label>Enter options for answers</label>');
    for (let i = 0; i < numOfOptions; i++) {
        $('#options').append('<br><input id="opt' + i + '" required placeholder="Enter option here..." minlength="3" height="48" value="" class="inputs">');
    }
};

let renderNumOfOptionsMultiple = () => {
    let numOfOptions = $('#numOfOptionsMultiple').val();
    $('#options').append('<br><label>Enter options for answers</label>');
    let htmlToInsert = "<br><table>";
    for (let i = 0; i < numOfOptions; i++) {
        htmlToInsert+=('<br>' +
            '<tr><input type="checkbox" value="opt' + i +'" id="multipleAns' + i +'" class="inputs" height="48"></tr><tr><input type="text" id="opt' + i + '" ' +
            'required placeholder="Enter option here..." minlength="3" height="48" value="" class="inputs"></tr>');
    }
    htmlToInsert+='<table>';
    $('#options').append(htmlToInsert);
};

let addOpenUserEventListener = () => {
    $('#modalUser_open')[0].addEventListener("click", openModalUser, false);
};

let addOpenQuizEventListener = () => {
    $('#modalQuiz_open')[0].addEventListener("click", openModalQuiz, false);
};

let addAnswersEventListener = () => {
    $('#answer').focus(populateWithAnswers());
};

let addCloseEventListener = () => {
    $('#modal_close')[0].addEventListener('click', closeModal, false);
};

let addKeyAndClickEventListener = () => {
    if (document.addEventListener) {
        document.addEventListener("click", clickHandler, false);
        document.addEventListener("keydown", keyHandler, false);
    } else {
        document.attachEvent("onclick", clickHandler);
        document.attachEvent("onkeydown", keyHandler);
    }
};

let populateWithAnswers = () => {
    let checkedAnswers = $('input[id^="multipleAns"]:checked');
    let htmlToInsert = '<ul>';
    for(let i=0; i<checkedAnswers.length; i++){
        htmlToInsert += ("<li>" + checkedAnswers[i] + "</li>");
    }
    $("#answer").html(htmlToInsert);
};

let keyHandler = function (event) {
    if (event.keyCode === 27) {
        closeModal(event);
    }
};

let clickHandler = function (e) {
    if (!e.target) e.target = e.srcElement;
    if (e.target.tagName === "DIV") {
        if (e.target.id !== "modalWindowUser" && e.target.id !== "modalWindowQuiz") {
            closeModal(e);
        }
    }
};

let openModalUser = function (e) {
    let modalWrapper = $('#modalWrapperUser')[0];
    let modalWindow = $('#modalWindowUser')[0];

    modalWrapper.className = "overlay";
    let overflow = modalWindow.offsetHeight - document.documentElement.clientHeight;
    if (overflow > 0) {
        modalWindow.style.maxHeight = (parseInt(window.getComputedStyle(modalWindow).height) - overflow) + "px";
    }
    modalWindow.style.marginTop = (-modalWindow.offsetHeight) / 2 + "px";
    modalWindow.style.marginLeft = (-modalWindow.offsetWidth) / 2 + "px";
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
};

let openModalQuiz = function (e) {
    let modalWrapper = $('#modalWrapperQuiz')[0];
    let modalWindow = $('#modalWindowQuiz')[0];

    modalWrapper.className = "overlay";
    let overflow = modalWindow.offsetHeight - document.documentElement.clientHeight;
    if (overflow > 0) {
        modalWindow.style.maxHeight = (parseInt(window.getComputedStyle(modalWindow).height) - overflow) + "px";
    }
    modalWindow.style.marginTop = (-modalWindow.offsetHeight) / 2 + "px";
    modalWindow.style.marginLeft = (-modalWindow.offsetWidth) / 2 + "px";
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
};

let closeModal = function (e) {
    $('#modalWrapperUser')[0].className = "";
    $('#modalWrapperQuiz')[0].className = "";
    $('#options').html('');
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
};

let cleanUpFields = () => {
    $("input").val("");
};

module.exports = {
    createNewUserModal,
    createNewQuizModal,
    addOpenUserEventListener,
    addOpenQuizEventListener,
    addCloseEventListener,
    addKeyAndClickEventListener,
    cleanUpFields,
    addEventListenerOpts,
};