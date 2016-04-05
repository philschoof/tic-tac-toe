'use strict';

const app = require('../app-data.js');

const signUpSuccess = (data) => {
  app.user = data.user;
  //$('#change-password').show();
  console.log(data);
};

const failure = () => {
  console.log("fail");
};


module.exports = {
  signUpSuccess,
  failure
};
