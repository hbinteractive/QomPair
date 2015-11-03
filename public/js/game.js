//define vars
var nickname;
var host = false;
var pin;
var players;
var time_s;
var time_ms;

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
  time_s = 9;
  time_ms = 9;
  Counter();
});

function Counter(){
  var interval = setInterval(function(){
    $('#time_s').html(time_s);
    $('#time_ms').html(time_ms);
    if (time_s <= 0){
      showWait();
      clearInterval(interval);
    }
    else{
      if (time_ms == 0){
        time_ms = 9;
        time_s--;
      }
      else {
        time_ms--;
      }
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
