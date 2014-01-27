var utils = require('../include/utils').utils;
var Player = require('../include/Player');
var uuid = require('node-uuid');

var Login = {
    userValid: function(socket, clients){
        //c.player_id = player.uuid;
        socket.player_state = 'playing';
        //obj.socket.uuid = uuid.v4();
        utils.broadcast(clients, socket.player_name + " joined the chat\n", socket.uuid);
        // Put this new client in the list
        //var newPlayer = new Player(obj.socket)
        clients.push(socket);
    },
    userInvalid: function(c){
        c.write('Player not found, would you like to create a new one? (Y/N)\n');
        c.player_state = 'isnewplayer';
    }
}

exports.Login = Login;