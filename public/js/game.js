//define vars
var nickname;
var host = false;
var pin;
var players;
var timeleft;

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

socket.on('question', function(data){
  timeleft = (10000);
  console.log(timeleft);
  Counter();
});

function Counter(){
  var interval = setInterval(function(){
    console.log(timeleft);
    $('#counter').html(timeleft);
    if (timeleft <= 0){
      showWait();
      clearInterval(interval);
    }
    else{
      timeleft = timeleft - 100;
    }
  }, 100);
}

function showWait(){
  $('#wait').css('display', 'block');
}
function showResult(){

}

//Error handling
socket.on('notif', function(data){
  alert(data.error);
});
