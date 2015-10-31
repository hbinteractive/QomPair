//define vars
var nickname;

function createGame(){
  nickname = $('#nickname').val();
  var subjects = "Cars";
  socket.emit('createGame', {subjects: subjects});
}
  socket.on('createGame', function(pin){
    joinGame(pin, nickname);
  });

function joinGame(pin, nickname){
  console.log('joining game...');
  socket.emit('joinGame', {pin: pin, nickname: nickname});
}
  socket.on('joinGame', function(){

  });

//Error handling
socket.on('notif', function(data){
  alert(data.error);
});
