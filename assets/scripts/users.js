'use strict';

let winner = '';

let player1 = {
	username: '', //ajax return
  symbol: 'X',
  cssClass: 'player1',
  background:'#00a896',
	authToken: ''
};

let player2 = {
  username: '', //ajax return
  symbol: 'O',
  cssClass:'player2',
  background: '#7b435b',
	authToken: ''
};

//sets player info in the view
$('.player1-user-name').text(player1.username);
  $('.player1-symbol').text(player1.symbol);

  $('.player2-user-name').text(player2.username);
  $('.player2-symbol').text(player2.symbol);

  let currentPlayer = player1;

module.exports ={
  winner,
  player1,
  player2,
  currentPlayer
};
