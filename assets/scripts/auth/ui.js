'use strict';

const app = require('../app-data.js');
const users = require('../users.js');

const signUpSuccess = (data) => {
  app.user = data.user;
  //$('#change-password').show();
  console.log(data);
};

const signInSuccess = (data) => {
  app.user = data.user;
  console.log("Signed in " + app.user.email);
  $('.change-password').show();
  $('.log-out').show();
  if (users.player1.username === '') {
    $('.player1-user-name').text(users.player1.username = app.user.email);
  } else {
    $('.player2-user-name').text(users.player2.username = app.user.email);
    $('.sign-up').hide('slow');
    $('.login').hide('slow');
  }
};

const signOutSuccess = () => {
  app.user = null;
  console.log(app);
};

const failure = () => {
  console.log("fail");
};


module.exports = {
  signUpSuccess,
  signInSuccess,
  signOutSuccess,
  failure
};
