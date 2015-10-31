/*
var clients = [socket.id : {
  socket: String,
  game: String,
  host: true
}]

var games = [ pin : {
  host: String,
  players: [id: String, nickname: String],
  round: Int
}]

*/

var clients = {};
var games = {};

var express = require('Express');

module.exports = function(io, socket){
  //We always store the client.
  client.create(socket);

  socket.on('disconnect', function(){
    client.delete(socket, io);
  });

  //When a somebody wants to host we create a game and emit the pin back.
  socket.on('creategame', function(){
    var pin = game.create(socket);
    socket.emit('pin', {pin: pin});
  });

  socket.on('joingame', function(data){
    client.joingame(socket, data);
  })

  //output server data
  socket.on('printgamedata', function(){
    connected();
  })
}

var client = {
  create: function (socket){
    clients[socket.id] = {socket: socket};
  },
  delete: function(socket , io) {
  //@todo check if client is in an game.
    if (clients[socket.id].game){
      game.leave(socket, io);
    }
    delete clients[socket.id];
  },
  joingame: function(socket, data) {
    // Check if the game exist.
    if (games[data.pin]){
      //Add the joining player to the players of the game
      //also have his nickname
      games[data.pin].players.push([socket.id, data.nickname]);
      //Add the game to the client.
      clients[socket.id].game = data.pin;
      //Add player to connected player list on the host
      clients[games[data.pin].host]
        .socket.emit('playerjoin', {id: socket.id, nickname: data.nickname});
    }
    else {
      console.log("bestaat niet");
    }
  }
}

var game = {
  create: function(socket){
    // generate a random 5 digit code
    var pin = Math.random().toString().substr(2,5);
    // Check if the game already exists
    while (games[pin] != null){
      pin = Math.random().toString().substr(2,5);
    }
    //Create the game and assign the host and a empty array for the players
    games[pin] = {host: socket.id, players: [], round: null};
    //Assign the game to the client. and make him host
    clients[socket.id].game = pin;
    clients[socket.id].host = true;

    return pin;
  },
  leave: function(socket, io){
    //Check if the client is hosting
    if (clients[socket.id].host){
      var players = games[clients[socket.id].game].players;
      console.log("Host left " + players);
      for (var i = 0; i < players.length; i++){

      }
    }
    else {
      console.log("somebody leaved the game");
    }
  },
  start: function(socket, io){
    //check if client is host
    if (client[socket.id].host){
      //make the game a var
      var game = games[clients[socket.id].game];
      //TODO Load question from php backend
      var questions = {question: "Which one is faster",
                        a: "Car1",
                        b: "Car2",
                        answer: "a"}



    }
  }
}

//This function will emit to all the sockets in the array
function emitToAll(method, array, data = null){
  for(var i = 0;i < array.length; i++){
    clients[array[$i]].socket.emit(method, data);
  }
}

// Send a notification to a socket.
function sendNotif(socket, msg){
  socket.emit('notif', {msg: msg});
}

// delete
function connected(){
  var clientskeys = Object.keys(clients);
  console.log("---------New Data----------")
  for (var i = 0; i < clientskeys.length; i++){
    console.log("client id: " + clientskeys[i] );
    console.log("Game " + clients[clientskeys[i]].game);
    console.log("Hosting " + clients[clientskeys[i]].host);
  }
  console.log("Active games", games);
}
