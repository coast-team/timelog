var express = require('express'),
  app = express(),
  server = require('http').Server(app),
  io = require('socket.io')(server),
  mongoose = require('mongoose'),
  port = 8088;

const NAME_DB = process.env.MONGODB_NAME || "eventlogs",
  USERNAME_DB = process.env.MONGODB_USERNAME || "admin",
  PASS_DB = process.env.MONGODB_PWD || "admin",
  HOST_DB = process.env.MONGODB_HOST ||  'localhost',
  PORT_DB = process.env.MONGODB_PORT ||  27017;

var eventSchema = new mongoose.Schema({
  siteID: {
    type: String
  },
  operationID: {
    type: String
  },
  event: {
    type: String,
    enum: ['sent', 'received', 'integrated']
  },
  timestamp: {
    type: Date
  }
});

var eventModel = mongoose.model('events', eventSchema);

// Connection to the mongoDB running instance
mongoose.connect('mongodb://' + HOST_DB + ':' + PORT_DB + '/' + NAME_DB);
// Check if connection succeed
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log('Connection to mongoDB instance succeed!');
});

server.listen(port, function() {
  console.log('Time log server started at localhost:', port);
});

app.use(express.static('static'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/test.html');
});

io.on('connection', function(socket) {
  socket.on('events', function(events) {
    events.forEach(function(jsonEvent) {
      var event = new EventModel(jsonEvent);
      event.save(function(err) {
        if (err) {
          console.log(err);
        }
      });
    });
  });

  socket.on('time', function(data) {
    socket.emit('time', Date.now());
  });
});
