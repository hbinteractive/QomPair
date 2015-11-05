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

  socket.on('startGame', function(data){
    startGame(data, socket);
    setTimeout(function(){
      question(data, socket);
    }, 3000);
  });

  socket.on('result', function(data){
    emitToPlayers(data.pin, 'result');

    setTimeout(function(){
      question(data, socket);
    }, 3000);
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

//This function will add a player to
function joinGame(data, socket){
  //Check if the game exists
  var game = games[data.pin];
  if (game != null){
    //Add the player to the game array with the nickname as key
    //And the socket as value
    game.players[data.nickname] = socket;
    socket.emit('joinGame', {pin: data.pin});
    updateLobby(data.pin);
  }
  else {
    sendNotif(socket, "Game bestaat niet");
  }
}

//TODO docs
function startGame(data, socket){
  //TODO check if socket is the host or if the game is already running
  var pin = data.pin;
  games[pin].round = 0;

  emitToPlayers(data.pin, 'startGame');
}

function question(data, socket){
  var timestamp = Date.now();

  var question = {
    question: "Welke is het snelste?",
    a: ["Audi r8", "image1.png"],
    b: ["Porsche GT", "image2.png"],
    answer: "a"
  };

  emitToPlayers(data.pin, 'question', question);
}

//TODO docs
function emitToPlayers(pin, method, data){
  var game = games[pin];
  if (game != null){
    var players = game.players;
    var nicknames = Object.keys(players);
    for (var i = 0; i < nicknames.length; i++){
      var socket = players[nicknames[i]];
      socket.emit(method, data);
    }
  }
  else {
    console.log("could not emit game doesnt exists");
    return false;
  }
}

//This function will send a array with al the players
//to all the connected players
function updateLobby(pin){
  var game = games[pin];
  var players = game.players;
  var nicknames = Object.keys(players);

  for(var i = 0 ; i < nicknames.length; i++){
    var socket = players[nicknames[i]];
    socket.emit('updateLobby', {nicknames: nicknames});
  }
}

function sendNotif(socket, error){
  socket.emit('notif', {error: error});
}
