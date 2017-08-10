/*Socket*/
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var crypto = require('crypto');
var mysql = require('mysql');

var db;
connectDatabase();

var banned = [];

io.on('connection', function(socket) {
    console.log('connected');
	socket.on('motherboard', function(id) { //C# motherboard ID received
		console.log(id);
		if(banned.indexOf(id) != -1) {
			socket.emit('unique', 'You are banned.');
			return
		}
		var token = crypto.randomBytes(10).toString('hex'); //generate random 20 character string
		db.query("INSERT INTO token(id) VALUES('"+token+"')").on('result', function(data) {})
        .on('end', function() {
            console.log('end');
        })
		socket.emit('unique', token);
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
/*Socket*/

/*Connects to our database*/
function connectDatabase() {
    console.log('Connecting to database...');
    db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'testgame'
    })
    db.connect(function(err) {
        if(err)
             console.log(err);
        else
            console.log('Connected.');
    })
}