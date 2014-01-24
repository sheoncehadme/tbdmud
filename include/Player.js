function Player(s) {
     if (false === (this instanceof Login)) {
        return new Login();
    }
    this.id = '';
    this.socket = s;
    this.playerData = { name: s.name};
}

Player.prototype.getSocket = function(){
    return this.socket;
}

Player.prototype.getId = function(){
    return this.id;
}

Player.prototype.getPlayerData = function(){
    return this.playerData;
}

exports.Player = Player;