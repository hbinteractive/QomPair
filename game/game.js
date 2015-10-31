/*
var games = {
  pin String:{
    host: Socket,
    subjects: [String],
    players: {
      nickname String: Socket
      },
    round: Integer
  }
}
*/

var games = {};

var express = require('Express');

module.exports = function(io, socket){
  //This create a joinable with the settings
  //Gets the nickname as parameter
  //TODO add game specific options
  socket.on('createGame', function(data){
    createGame(data, socket);
  });

  //This will recieve a pin to join and a nickname
  socket.on('joinGame', function(data){
    joinGame(data, socket);
  });
}

function createGame(data, socket){
  //TODO make sure the game doesnt exists
  var genpin = Math.random().toString().substr(2,5);
  //Create a new game
  games[genpin] = {
    host: socket,
    subjects: data.subjects,
    players: {},
    round: null
  };
  //emit the genpin back to the host to join it as a player
  socket.emit('createGame', genpin);
}

function joinGame(data, socket){
  //Check if the game exists
  var game = games[data.pin];
  if (game != null){
    console.log('game exists');
    game.players[data.nickname] = socket;
    console.log(games);
  }
  else {
    sendNotif(socket, "Game bestaat niet");
  }
}

function sendNotif(socket, error){
  socket.emit('notif', {error: error});
}
