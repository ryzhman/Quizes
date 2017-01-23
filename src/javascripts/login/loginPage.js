/**
 * Created by Олександр on 23.01.2017.
 */
'use strict';
import buildLoginForm from './loginForm.js';
import dataProvider from '../data/dataProvider';

let initLoginPage = () => {
    buildLoginForm.createLoginForm();
    dataProvider.loadAllData();
    window.location.hash = '#main.html';
};

module.exports = {
    initLoginPage,
};