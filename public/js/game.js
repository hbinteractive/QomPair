//define vars
var nickname;
var host = false;
var pin;
var players;

function createGame(){
  nickname = $('#nickname').val();
  var subjects = "Cars";
  socket.emit('createGame', {subjects: subjects});
}
socket.on('createGame', function(pin){
  //show host options
  host = true;
  joinGame(pin, nickname);
});

function joinGame(pin, nickname){
  console.log('joining game...');
  socket.emit('joinGame', {pin: pin, nickname: nickname});
}
socket.on('joinGame', function(data){
  //Set the global pin of the game
  pin = data.pin;
  loadLobby();
});

socket.on('updateLobby', function(data){
    players = data.nicknames;
    try{
    viewAddPlayer();
    }
    catch(e){
    }
});

function startGame(pin){
  console.log("startingGame");
  socket.emit('startGame', {pin: pin});
}
socket.on('startGame', function(data){
  loadGame();
});







//Error handling
socket.on('notif', function(data){
  alert(data.error);
});
