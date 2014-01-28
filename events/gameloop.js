var GameLoop = {
// Handle incoming messages from clients.
    data: function(data, socket) {
        var input = data.toString('utf-8').trim();
        console.log(socket.uuid);
        //verify players connection state
        switch (socket.player_state) {
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
    },
    //Remove the client from the list when it leaves
    end: function() {
        clients.splice(clients.indexOf(socket), 1);
        //broadcast(socket.name + " left the chat.\n");
    }
};

exports.GameLoop = GameLoop;