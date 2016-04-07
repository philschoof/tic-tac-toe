'use strict';

const app = require('../app-data.js');
const users = require('../users.js');
const resources = require('../resources.js');

const signUpSuccess = (data) => {
  app.user = data.user;
  //$('#change-password').show();
  console.log(data);
};

const signInSuccess = (data) => {
  // app.user = data.user;
  // console.log("Signed in " + app.user.email);
  $('table').show('slow');
  $('.change-password').show();
  $('.sign-out').show();
  if (users.player1.username === '') {
    app.user1 = data.user;
    $('.player1-user-name').text(users.player1.username = app.user1.email);
    users.player1.id = data.user.id;
    users.player1.authToken = data.user.token;
    users.player1.games++;
  } else {
    app.user2 = data.user;
    $('.player2-user-name').text(users.player2.username = app.user2.email);
    users.player2.id = data.user.id;
    users.player2.authToken = data.user.token;
    users.player1.games++;
    $('.sign-up').hide('slow');
    $('.login').hide('slow');
  }
};

const signOutSuccess = () => {
  console.log('signed-out');
    users.player1.username = '';
    app.user1 = null;
    $('.player1-user-name').text('');
    users.player2.username = '';
    app.user2 = null;
    $('.player2-user-name').text('');
};


const newGameSuccess = (data) => {
  //users.gameId = data.game.id;
  // let gameId = users.gameId;
  // console.log(data.game);
  // console.log(gameId);
  // return gameId;
  resources.gameID = data.game.id;
  console.log(resources.gameID);
};

const boardUpdateSuccess = (gameArray) => {
  console.log(newGameSuccess.gameId);
  console.log(gameArray);
  console.log('board updated');
};


const getGamesSuccess = (gameList) => {
  console.log(gameList);
};

const failure = () => {
  console.log("fail");
};


module.exports = {
  signUpSuccess,
  signInSuccess,
  signOutSuccess,
  boardUpdateSuccess,
  newGameSuccess,
  getGamesSuccess,
  failure
};
