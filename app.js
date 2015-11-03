var express = require('express');
var fs = require('fs');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', function(socket){
    require('./game/game.js')(io, socket);
});

//Make the static files available
app.use('/js', express.static('./public/js'));
app.use('/style', express.static('./public/style'));
app.use('/view', express.static('./public/view'));


//Send the index.html when we receive a request on the root.
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

server.listen(80);
console.log("started server at port 80");
