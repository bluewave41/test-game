class Game {
    constructor(host) {
        console.log('Creating game');
        this.host = host;
        this.players = [];
        this.addPlayer(host);
    }
    addPlayer(player) {
        this.players.push(player);
    }
    numPlayers() {
        return this.players.length;
    }
}

module.exports = Game;