//var UserAuth = new require('../include/UserAuth');
var Login = require('./login').Login;
var Errors = require('./errors').Errors;

var Events = {
    Login: Login,
    Errors: Errors
};

exports.Events = Events;