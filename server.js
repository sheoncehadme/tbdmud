#!/usr/bin/env node
/**
 * Load up the npm requires
 */
var net = require('net');

/**
 * Load up our custom classes
 */
var UserAuth = require('./include/UserAuth').UserAuth;
var eventhandler = require('./events/eventhandler').Events;
var utils = require('./include/utils').utils;

// Keep track of the clients
var clients = [];

// Start a TCP Server
var server = net.createServer(function(socket) {
    // Send a nice welcome message and announce
    socket.write(UserAuth.motd());
    socket.player_state = 'login';
    
    //bind all events
    for (var events in eventhandler){
        for (var event in eventhandler[events]){
            socket.on(event, eventhandler[events][event]);
        }
    }

});

/**
 * Bind the server to a port
 */
server.listen(5000);

// Put a friendly message on the terminal of the server.
console.log("Game server running at port 5000\n");