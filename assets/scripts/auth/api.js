'use strict';

const app = require('../app-data');

const signUp = (success, failure, data) => {
  $.ajax({
    method: "POST",
    url: app.api + '/sign-up',
    data,
  })
  .done(success)
  .fail(failure);
};

const signIn = (success, failure, data) => {
  $.ajax({
    method: 'POST',
    url: app.api + '/sign-in',
    data,
  })
  .done(success)
  .fail(failure);
};

const signOut = (success, failure) => {
  $.ajax({
    method: "DELETE",
    url: app.api + '/sign-out/' + app.user1.id,
    headers: {
      Authorization: 'Token token=' + app.user1.token
    },
  }).done(success)
  .fail(failure);

$.ajax({
    method: "DELETE",
    url: app.api + '/sign-out/' + app.user2.id,
    headers: {
      Authorization: 'Token token=' + app.user2.token
    },
  }).done(success)
  .fail(failure);
  };

const updateBoard = (success, failure, data, id) => {
  $.ajax({
    method: "PATCH",
    url: app.api + id,
    processData: false,
    data
  }).done(success)
  .fail(failure);
};

const newGame = (success, failure, data) => {
  console.log(app);
  $.ajax({
    method: "POST",
    url: app.api + '/games',
    data,
    headers: {
      Authorization: "Token token=" + app.user1.token
    }
  })
  .done(success)
  .fail(failure);
  console.log("ran through");
};




module.exports = {
  signUp,
  signIn,
  signOut,
  updateBoard,
  newGame
};
