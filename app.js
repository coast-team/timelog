var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    port = 8088;
	
	server.listen(port, function() {
		console.log('Time log server started at localhost:', port);
	});

app.use(express.static('static'));

app.get('/', function(req, res) {
 	res.sendFile(__dirname + '/test.html');
});

io.on('connection', function (socket) {
	socket.on('time', function (data) {
	 	socket.emit('time', Date.now());
    });
});
