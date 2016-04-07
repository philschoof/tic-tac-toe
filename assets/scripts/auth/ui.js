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
  $('.change-password').show();
  $('.sign-out').show();
  if (users.player1.username === '') {
    app.user1 = data.user;
    $('.player1-user-name').text(users.player1.username = app.user1.email);
    users.player1.id = data.user.id;
    users.player1.authToken = data.user.token;
  } else {
    app.user2 = data.user;
    $('.player2-user-name').text(users.player2.username = app.user2.email);
    users.player2.id = data.user.id;
    users.player2.authToken = data.user.token;
    $('#new-game-button').removeClass('bottom-buttons-hidden');
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
  resources.gameID = data.game.id;
  resources.gameObject = data.game;
  console.log(resources.gameID);
  console.log(resources.gameObject.cells);
};

const updateGameSuccess = (data) => {
  console.log(data);
  console.log('Patched');

};


const getGamesSuccess = (data) => {
  console.log(data.game.cells);
  resources.prevGameArray = data.game.cells;
  console.log(resources.prevGameArray);
  $('.top-box').css('opacity', '1');
  $('.top-box').text((resources.prevGameFunk(resources.prevGameArray)));
};

const failure = (error) => {
  console.log("fail");
  console.log(error);
};


module.exports = {
  signUpSuccess,
  signInSuccess,
  signOutSuccess,
  newGameSuccess,
  getGamesSuccess,
  updateGameSuccess,
  failure
};
