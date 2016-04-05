'use strict';

const app = require('../app-data.js');

const signUpSuccess = (data) => {
  app.user = data.user;
  //$('#change-password').show();
  console.log(data);
};

const signInSuccess = (data) => {
  app.user = data.user;
  console.log("Signed in" + app.user);
  $('.change-password').show();
  $('.log-out').show();
};

const failure = () => {
  console.log("fail");
};


module.exports = {
  signUpSuccess,
  signInSuccess,
  failure
};
