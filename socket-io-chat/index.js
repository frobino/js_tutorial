// Initialize app to be a function handler...
var app = require('express')();
// ...to be supplied to an HTTP server
var http = require('http').Server(app);
// create socket.io server, mounting "on top of" the HTTP server
var io = require('socket.io')(http);

// here is the function supplied to the HTTP server:
app.get('/', function(req, res){
  // serve a html file when the function is executed
  res.sendFile(__dirname + '/index.html');
});

// listen on connection/disconnection on a socket and log it
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

// make the HTTP server start and listen
http.listen(3000, function(){
  console.log('listening on *:3000');
});
