'use strict';

const getFormFields = require('../../../lib/get-form-fields');

const authApi = require('./api');
const authUi = require('./ui');

const addHandlers = () => {
//sign-up
  $('#sign-up').on('submit', function (event) {
    let data = getFormFields(this);
    event.preventDefault();
    authApi.signUp(authUi.signUpSuccess, authUi.failure, data);
  });

//login
  $('#login').on('submit', function (event){
    let data = getFormFields(this);
    event.preventDefault();
    authApi.signIn(authUi.signInSuccess, authUi.failure, data);
  });

//sign-out
  $('.sign-out').on('click', function (event){
  console.log('click');
  event.preventDefault();
  authApi.signOut(authUi.signOutSuccess, authUi.failure);
  });


//change-password
  $('.change-password').on('click', function (event) {
    console.log('change-password');
    event.preventDefault();
  });

  $('#create-game').on('submit', function (event) {
    event.preventDefault();
    let data = getFormFields(this);
    authApi.newGame(authUi.success, authUi.failure, data);
  });

  // //new-game
  //   $(() => {
  //     authApi.newGame(authUi.newGameSuccess, authUi.failure);
  //   });

  $('');

//board-update
  $('td').on('click', function(event, gameArray, id){
    event.preventDefault();
    authApi.boardUpdate(authUi.boardUpdateSuccess, authUi.failure, gameArray, id);
  });



};//close addHandlers

module.exports = {
  addHandlers,
};
