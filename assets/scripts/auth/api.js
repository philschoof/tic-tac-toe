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


module.exports = {
  signUp,
  signIn,
  signOut
};
