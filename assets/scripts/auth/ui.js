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
    $('.top-box').css('opacity', '0');
    $('.top-box').text('');
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
    users.player1.username = '';
    app.user1 = null;
    $('.player1-user-name').text('');
    if (users.player2.username !== ''){
      users.player2.username = '';
      app.user2 = null;
    $('.player2-user-name').text('');
  }
};


const newGameSuccess = (data) => {
  resources.gameID = data.game.id;
  resources.gameObject = data.game;
};

const updateGameSuccess = (data) => {

};


const getGamesSuccess = (data) => {
  resources.prevGameArray = data.game.cells;
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
