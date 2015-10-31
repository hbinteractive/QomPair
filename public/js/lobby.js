$(document).ready(function () {
  viewAddPlayer();
  $('#pin').html(pin);

  if (host){
    $('#hostmenu').css('display', 'block');
  }
});

function viewAddPlayer(name){
  $('#players').html("");
  players.forEach(function(name){
    $('#players').ready().append("<li>"+ name + "</li>");
  });
}
