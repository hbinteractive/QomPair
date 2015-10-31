$(document).ready(function(){
  //load the main menu when the page is loaded.
  loadGame();
});

var socket = io('http://192.168.178.11');

//View handlers
function loadMain(){
  $('#view').load('/view/menu.main.html');
}
function loadJoinHost(){
  $('#view').load('/view/menu.host.html');
}
function loadJoinPlayer(){
  $('#view').load('/view/menu.player.html');
}
function loadLobby(){
  $('#view').load('/view/menu.lobby.html')
}
function loadGame(){
  $('#view').load('/view/game.html');
}
