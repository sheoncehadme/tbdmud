#!/usr/bin/env node
var net = require('net');
var UserAuth = require('./include/UserAuth').UserAuth;
var eventhandler = require('./events/eventhandler').Events;
var utils = require('./include/utils').utils;

// Keep track of the chat clients
var clients = [];

// Start a TCP Server
net.createServer(function(socket) {
    // Send a nice welcome message and announce
    socket.write(UserAuth.motd());
    socket.state = 'login';

    // Handle incoming messages from clients.
    socket.on('data', function(data) {
        var input = data.toString('utf-8').trim();
        //verify players connection state
        switch (socket.state) {
            case 'login':
                var name = input;
                socket.name = name;
                
                UserAuth.verify_name(clients, name, socket);                
                break;
            case 'isnewplayer':
                if(input == 'Y' || input == 'y'){
                    socket.write('We are currently not accepting new players.\n');
                    socket.end();
                } else if (input == 'N' || input == 'n') {
                    socket.write(UserAuth.motd());
                    socket.player_state = 'login';
                } else {
                    socket.write('Please choose Y or N.\n');
                }
                break;
            case 'playing':
                utils.broadcast(clients, socket.name+': '+input+"\n", socket);
                break;
            default:
                socket.write('BADBADBAD stuff happening\n');
                break;
        }
    });
    
    //bind all events
    for (var events in eventhandler){
        for (var event in eventhandler[events]){
            socket.on(event, eventhandler[events][event]);
        }
    }

    //Remove the client from the list when it leaves
    socket.on('end', function() {
        clients.splice(clients.indexOf(socket), 1);
        //broadcast(socket.name + " left the chat.\n");
    });

}).listen(5000);

// Put a friendly message on the terminal of the server.
console.log("Game server running at port 5000\n");