/**
 * Created by Олександр on 13.01.2017.
 */
'use strict';
import $ from "jquery";
import html from "html-template-tag";

const createNewUserModal = () => html`
    <div id="modal_wrapper">
        <div id="modal_window">
            <div id="modalWindowHeader"><a id="modal_close">close <b>X</b></a></div>
            <p>Enter new user details:</p>
            <form id="add_user" action="#">
                <p><label>Name<strong>*</strong><br>
                    <input type="text" autofocus required id="name" minlength="6" value="" placeholder="Enter username here..." class="inputs"></label></p>
                <p><label>Password<strong>*</strong><br>
                    <input id="pswd1" type="password" placeholder="Enter password here..." minlength="10" height="48" id="description" value="" class="inputs"></label></p>
                <p><label>Repeat password<strong>*</strong><br>
                    <input id="pswd2" type="password" placeholder="Enter password once more..." minlength="10" height="48" id="description" value="" class="inputs"></label>
                    <div id="pswdDoesntMatch"></div></p>
                <p><label>Group<br>
                    <select name="groups" form="selectGroup">
                      <option value="admin">Admins</option>
                      <option value="user">Users</option>
                    </select>
                <p><input type="submit" value="Add user"></p>
            </form>
        </div>
    </div>
`;

let addOpenEventListener = () => {
    $('#modal_open')[0].addEventListener("click", openModal, false);
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

let keyHandler = function (event) {
    if (event.keyCode == 27) {
        closeModal(event);
    }
};

let clickHandler = function (e) {
    if (!e.target) e.target = e.srcElement;
    if (e.target.tagName == "DIV") {
        if (e.target.id != "modal_window") {
            closeModal(e);
        }
    }
};

let openModal = function (e) {
    let modalWrapper = $('#modal_wrapper')[0];
    let modalWindow = $('#modal_window')[0];

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
    $('#modal_wrapper')[0].className = "";
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
};

module.exports = {
    createNewUserModal,
    addOpenEventListener,
    addCloseEventListener,
    addKeyAndClickEventListener,
};