var couchbase = require('couchbase');
var sys = require('sys');
var events = require('events');

function Login() {
    if (false === (this instanceof Login)) {
        return new Login();
    }
    
    events.EventEmitter.call(this);
}
sys.inherits(Login, events.EventEmitter);

Login.prototype.motd = function(){
    return "Welcome to my crazy game! Please log in!\n\nName:";
};

Login.prototype.verify_name = function(name){
    var self = this;
    
    var db = new couchbase.Connection({
        host: ['10.4.2.133',
               '10.4.2.126',
               '10.4.2.128'],
        bucket: 'gamesim',
        password: 'password1'
    }, function(err){
        if (err) {
            console.log('DB Connection Error', err);
        } else {
            console.log('DB Connected');
        }
    });
    
    db.view('dev_by_name', 'By_Name').query(function(err, results){
        for (var i = 0; i< results.length; i++){
            var found = false;
            if(results[i].value == name){
                found = true;
            }
        }
        if (found) {
            self.emit('userValid');
        }
        if (!found){
            self.emit('userInvalid');
        }
    });
};

Login.prototype.process = function (name, password){
    return 'processing';
};

exports.Login = Login;