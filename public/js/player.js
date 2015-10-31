$(document).ready(function(){

  $('#join').click(function(){
    var pin = $('#pin').val();
    var nickname = $("#nickname").val();

    socket.emit('joingame', {pin: pin, nickname: nickname});
  })

  socket.on('msg', function(data){
    alert(data.msg);
  })

});
