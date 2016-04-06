'use strict';

const app = require('../app-data.js');
const users = require('../users.js');

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
    users.player1.authToken = data.user.token;
  } else {
    app.user2 = data.user;
    $('.player2-user-name').text(users.player2.username = app.user2.email);
    users.player1.authToken = data.user.token;
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

const boardUpdateSuccess = () => {
  console.log('board updated');
};

// const newGame = () => {
//   let gameId = games.id;
// };

const failure = () => {
  console.log("fail");
};


module.exports = {
  signUpSuccess,
  signInSuccess,
  signOutSuccess,
  boardUpdateSuccess,
  // newGame,
  // gameId,
  failure
};
