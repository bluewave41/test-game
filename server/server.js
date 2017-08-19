var Validator = require('./Validator');
var Database = require('./Database');

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Game = require('./Game');

var db = new Database('localhost', 'root', 'testGame');
var games = [];

http.listen(3000, function(){
	console.log('listening on *:3000');
});

io.on('connection', function(socket) {
    console.log('connected');
    io.sockets.emit('updateGames', games);
	socket.on('motherboard', function(id) { //C# motherboard ID received
        console.log(id);
        var token = new Validator(id).validate();
        db.query("INSERT INTO token(id) VALUES('"+token+"')");
		socket.emit('unique', token);
    });
    socket.on('createGame', function(player) {
        games.push(new Game(player));
        io.sockets.emit('updateGames', games);
    })
    socket.on('data', function(data) {
        eval(data);
    })
}); 