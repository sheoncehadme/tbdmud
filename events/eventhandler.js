//var UserAuth = new require('../include/UserAuth');
var Login = require('./login').Login;
var Errors = require('./errors').Errors;
var GameLoop = require('./gameloop').GameLoop;
var Events = {
    Login: Login,
    Errors: Errors,
    GameLoop: GameLoop
};

exports.Events = Events;