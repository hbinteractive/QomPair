$(document).ready(function(){
  $('#join').click(function(){
    var nickname = $('#nickname').val();
    var pin = $('#pin').val();

    joinGame(pin, nickname);
  });
});
