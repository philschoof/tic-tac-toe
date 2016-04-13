'use strict';

const getFormFields = require('../../../lib/get-form-fields');
const authApi = require('./api');
const authUi = require('./ui');
const resources = require('../resources');
const users = require('../users.js');

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
    console.log(data);
    event.preventDefault();
    if (users.player1.username !== data.credentials.email) {
        authApi.signIn(authUi.signInSuccess, authUi.failure, data);
      }else {
        $('.top-box').css("opacity", '0');
        $('.top-box').text('Already signed in');
        console.log("Sign in failed");
      }
  });

//sign-out
  $('.sign-out').on('click', function (event){
  event.preventDefault();
  authApi.signOut(authUi.signOutSuccess, authUi.failure);
  });

//change-password
  $('#change-password').on('submit', function (event) {
    event.preventDefault();
    let data = getFormFields(this);
    authApi.changePassword(authUi.success, authUi.failure, data);
  });

//new game
  $('#new-game-button').on('click', function (event) {
    event.preventDefault();
    let data = getFormFields(this);
    authApi.newGame(authUi.newGameSuccess, authUi.failure, data, resources.gameID);
  });

//get game
  $('#get-game-button').on('click', function(event) {
    event.preventDefault();
    authApi.getGames(authUi.getGamesSuccess, authUi.failure);
  });

};//close addHandlers


let patchFunk = function() {
  authApi.updateGame(authUi.updateGameSuccess, authUi.failure, resources.gameArray, resources.gameID);
};

module.exports = {
  addHandlers,
  patchFunk
};
