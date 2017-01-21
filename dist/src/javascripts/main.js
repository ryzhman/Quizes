/**
 * Created by Олександр on 08.01.2017.
 */
"use strict";

var _loginForm = require('./login/loginForm.js');

var _loginForm2 = _interopRequireDefault(_loginForm);

var _dataProvider = require('./data/dataProvider');

var _dataProvider2 = _interopRequireDefault(_dataProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_loginForm2.default.createLoginForm();
_dataProvider2.default.loadAllData();
//# sourceMappingURL=main.js.map