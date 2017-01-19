/**
 * Created by Олександр on 08.01.2017.
 */
"use strict";
import buildLoginForm from './login/loginForm.js';
import dataProvider from './data/dataProvider';

buildLoginForm.createLoginForm();
dataProvider.loadAllData();
