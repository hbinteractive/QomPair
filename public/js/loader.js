$(document).ready(function(){
  //load the main menu when the page is loaded.
  loadMain();
});

var socket = io('http://localhost');

function loadMain(){
  $('#view').load('/view/menu.main.html');
}
function loadJoinHost(){
  $('#view').load('/view/menu.host.html');
}
function loadJoinPlayer(){
  $('#view').load('/view/menu.player.html');
}
