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

  $('.change-password').on('click', function (event) {
    console.log('change-password');
    event.preventDefault();
  });

  $('td').on('click', function(event){
    event.preventDefault();
    authApi.boardUpdate(authUi.boardUpdateSuccess, authUi.failure);
  });

};//close addHandlers

module.exports = {
  addHandlers,
};
