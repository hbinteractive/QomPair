//define vars
var giventime = 5;

var nickname;
var host = false;
var pin;
var players;
var time_s;
var time_ms;
var question;
var rightanswer;
var chosenanswer;
var interval;

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

socket.on('answer', function(){
  submittedanswers++;
  if (players.length == submittedanswers && host){
    socket.emit('result', {pin:pin});
  }
});

socket.on('result', function(data){
  clearInterval(interval);
  setTimeout(function(){
    showResult();
  }, 3000)
});

socket.on('question', function(data){
  //Set the titles
  setQuestion(data.question, data.a, data.b);
  console.log(data.answer);
  resetVars();
  hideAll();

  rightanswer = data.answer;
  time_s = giventime;
  time_ms = 9;
  Counter();
});

function Counter(){
  interval = setInterval(function(){
    $('#time_s').html(time_s);
    $('#time_ms').html(time_ms);
    if (time_s <= 0 && time_ms <=0){
      showWait();
      showResult()
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

function setQuestion(question, a , b){
  $('#question').html(question);
  $('#optiona_name').html(a[0]);
  $('#optionb_name').html(b[0]);

  //TODO images
}

function showWait(){
  $('.fullscreen').css('display', 'block');
  $('#result').css('display', 'none');
  $('#load').css('display', 'block');
}
function showResult(){
  $('#load').css('display', 'none');
  $('#result').css('display', 'block');
  if (chosenanswer === rightanswer){
    alert('antwoord is goed');
  }
  else {
    alert('try again fucktard');
  }
}
function hideAll(){
  $('.fullscreen').css('display', 'none');
  $('#load').css('display', 'none');
  $('#result').css('display', 'none');
}

$(document).on('click', '.answer', function(e){
  showWait();
  socket.emit('result', {pin: pin});
  chosenanswer = $(this).attr('data-option');
});

function resetVars(){
  time_s = null;
  time_ms = null;
}


//Error handling
socket.on('notif', function(data){
  alert(data.error);
});
