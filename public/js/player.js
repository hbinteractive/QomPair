$(document).ready(function(){
  socket.on('msg', function(data){
    alert(data.msg);
  })
  console.log("Sending notif");
  socket.emit('notif', {msg: "joined the game"});

});
