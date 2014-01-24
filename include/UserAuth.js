var couchbase = require('couchbase');
var sys = require('sys');

var UserAuth = {
    motd: function(){
        return "Welcome to my crazy game! Please log in!\n\nName:";
    },

    verify_name: function(clients, name, socket){
        var db = new couchbase.Connection({
            host: ['127.0.0.1'],
            bucket: 'tbdmud',
            password: 'password1'
        }, function(err){
            if (err) {
                console.log('DB Connection Error', err);
            } else {
                console.log('DB Connected');
            }
        });
        
        db.view('dev_players', 'By_Name').query(function(err, results){
            for (var i = 0; i< results.length; i++){
                var found = false;
                if(results[i].value == name){
                    found = true;
                }
            }
            if (found) {
                socket.emit('userValid', {clients: clients, socket: socket});
            }
            if (!found){
                socket.emit('userInvalid', socket);
            }
        });
    },

    process: function (name, password){
        return 'processing';
    }
};

exports.UserAuth = UserAuth;