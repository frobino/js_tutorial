// Initialize app to be a function handler...
var app = require('express')();
// ...ro be supplied to an HTTP server
var http = require('http').Server(app);

// Here is the function supplied to the server:
app.get('/', function(req, res){
  // serve a html file when the function is executed
  res.sendFile(__dirname + '/index.html');
});

// Make the server start and listen
http.listen(3000, function(){
  console.log('listening on *:3000');
});
