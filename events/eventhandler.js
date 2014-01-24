//var UserAuth = new require('../include/UserAuth');
var Login = require('./login').Login;

var Events = {
    Login: Login
};

exports.Events = Events;