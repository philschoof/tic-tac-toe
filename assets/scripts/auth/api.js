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


module.exports = {
  signUp,
};
