'use strict';

const getFormFields = require('../../../lib/get-form-fields');

const authApi = require('./api');
const authUi = require('./ui');

const addHandlers = () => {
  $('#sign-up').on('submit', function (event) {
    let data = getFormFields(this);
    event.preventDefault();
    authApi.signUp(authUi.signUpSuccess, authUi.failure, data);
  });

  $('#login').on('submit', function (event){
    let data = getFormFields(this);
    event.preventDefault();
    authApi.signIn(authUi.signInSuccess, authUi.failure, data);
  });

  $('.sign-out').on('click', function (event){
  console.log('click');
  event.preventDefault();
  authApi.signOut(authUi.signOutSuccess, authUi.failure);
  });


};

module.exports = {
  addHandlers,
};
