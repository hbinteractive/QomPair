$(document).ready(function(){
  socket.emit('creategame');

  socket.on('pin', function(data){
    $('#pin').html(data.pin);
  });

  socket.on('playerjoin', function(data){
      console.log(data.player);
      $("#playerlist").append("<li data-id='"+data.player +"'>" + data.nickname +"</li>");
  });

  $('#start').click(function(){


  });;
});
