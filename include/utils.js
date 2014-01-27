//used to broadcast throughout the clients
var utils = {
    broadcast: function(clients, message, sender) {
        clients.forEach(function(client) {
            // Don't want to send it to sender
            if (client.uuid === sender) return;
            client.write(message);
        });
        // Log it to the server output too
        process.stdout.write(message)
    },
    getSocketById: function(clients, id){
        clients.forEach(function(client) {
            if (client.uuid === id){
                return client;
            } else {
                return false;
            }
        });
    }
};

exports.utils = utils;