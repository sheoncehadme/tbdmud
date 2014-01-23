var net = require('net');
var login = require('./include/login.js');
var player = require('./include/player_object.js').player;
var UserAuth = new login.Login();

// Keep track of the chat clients
var clients = [];

// Start a TCP Server
net.createServer(function(socket) {

    // Send a nice welcome message and announce
    socket.write(UserAuth.motd());
    socket.player_state = 'login';
    // Put this new client in the list
    clients.push(socket);
    
    //used to broadcast throughout the clients
    //broadcast(socket.name + " joined the chat\n", socket);
    //function broadcast(message, sender) {
    //    clients.forEach(function(client) {
    //        // Don't want to send it to sender
    //        if (client === sender) return;
    //        client.write(message);
    //    });
    //    // Log it to the server output too
    //    process.stdout.write(message)
    //}

    // Handle incoming messages from clients.
    socket.on('data', function(data) {
        var input = data.toString('utf-8').trim();
        console.log(input);
        //verify players connection state
        switch (socket.player_state) {
            case 'login':
                var name = input;
                socket.name = name;
                UserAuth.verify_name(name);                
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
                socket.write(data);
                break;
            default:
                socket.write('BADBADBAD stuff happening\n');
                break;
        }
    });
    
    UserAuth.on('userValid', function(){
        socket.player_id = player.uuid;
        socket.player_state = 'playing';
        // Put this new client in the list
        clients.push(socket);
    });
    UserAuth.on('userInvalid', function(){
        socket.write('Player not found, would you like to create a new one? (Y/N)\n');
        socket.player_state = 'isnewplayer';
    });

    //Remove the client from the list when it leaves
    socket.on('end', function() {
        clients.splice(clients.indexOf(socket), 1);
        //broadcast(socket.name + " left the chat.\n");
    });

}).listen(5000);

// Put a friendly message on the terminal of the server.
console.log("Chat server running at port 5000\n");