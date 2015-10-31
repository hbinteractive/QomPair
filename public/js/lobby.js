$(document).ready(function () {
  viewAddPlayer();
  $('#pin').html(pin);

  if (host){
    $('#hostmenu').css('display', 'block');
  }

  $('#start').click(function(){
    startGame(pin);
  });
});

function viewAddPlayer(name){
  $('#players').html("");
  players.forEach(function(name){
    $('#players').ready().append("<li>"+ name + "</li>");
  });
}
