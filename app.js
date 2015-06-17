/*
 * Module dependencies.
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//handle requests
app.get('/', function(req,res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	io.emit('connect');
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});
	socket.on('disconnect', function(){
		io.emit('disconnect');
	});
});

http.listen(3000, function(){
	console.log('Express server listening on port 3000');
});