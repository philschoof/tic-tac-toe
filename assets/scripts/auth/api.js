'use strict';

const app = require('../app-data');
const users =require('../users');
const resources = require('../resources');

const signUp = (success, failure, data) => {
  $.ajax({
    method: "POST",
    url: app.api + 'sign-up',
    data,
  })
  .done(success)
  .fail(failure);
};

const signIn = (success, failure, data) => {
  $.ajax({
    method: 'POST',
    url: app.api + 'sign-in',
    data,
  })
  .done(success)
  .fail(failure);
};

const signOut = (success, failure) => {
  $.ajax({
    method: "DELETE",
    url: app.api + 'sign-out/' + app.user1.id,
    headers: {
      Authorization: 'Token token=' + app.user1.token
    },
  }).done(success)
  .fail(failure);

$.ajax({
    method: "DELETE",
    url: app.api + 'sign-out/' + app.user2.id,
    headers: {
      Authorization: 'Token token=' + app.user2.token
    },
  }).done(success)
  .fail(failure);
  };


const changePassword = (success, failure, data) => {
  $.ajax({
    method: "PATCH",
    url: app.api + 'change-password/' + users.currentPlayer.id,
    data,
    headers: {
      Authorization: "Token token=" + users.currentPlayer.authToken
    },
  }).done(success)
  .fail(failure);
};


const newGame = (success, failure, data) => {
  $.ajax({
    method: "POST",
    url: app.api + 'games',
    data,
    headers: {
      Authorization: "Token token=" + users.currentPlayer.authToken
    }
  })
  .done(success)
  .fail(failure);
};

const updateGame = (success, failure) => {
 $.ajax({
   method: 'PATCH',
   url: app.api + 'games/' + resources.gameID,
   data: {
  "game": {
    "cell": {
      "index": resources.sendIndex,
      "value": resources.sendValue
    },
  }
},
   headers:{
     Authorization: "Token token=" + users.player1.authToken,
   }
 }).done(success)
 .fail(failure);
};


const getGames = (success, failure) => {
  $.ajax({
    method: "GET",
    url: app.api + "games/" + (resources.gameID - 1),
    headers: {
      Authorization: "Token token=" + users.player1.authToken,
    },
  }).done(success)
  .fail(failure);
};



module.exports = {
  signUp,
  signIn,
  signOut,
  newGame,
  changePassword,
  getGames,
  updateGame
};
