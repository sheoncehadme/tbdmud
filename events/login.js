var utils = require('../include/utils').utils;
var Player = require('../include/Player');

var Login = {
    //UserAuth.once('userValid', function(c){
    userValid: function(obj){
        //c.player_id = player.uuid;
        obj.socket.state = 'playing';
        utils.broadcast(obj.clients, obj.socket.name + " joined the chat\n", obj.socket);
        // Put this new client in the list
        var newPlayer = new Player(obj.socket)
        obj.clients.push(newPlayer);
    },
    //UserAuth.once('userInvalid', function(c){
    userInvalid: function(c){
        c.write('Player not found, would you like to create a new one? (Y/N)\n');
        c.player_state = 'isnewplayer';
    }
}

exports.Login = Login;