'use strict';

let users = require('./users');

//board array
let board = [$('#top-center'), $('#top-left'), $('#top-right'),
              $('#center-center'), $('#center-left'), $('#center-right'),
            $('#bottom-center'), $('#bottom-left'), $('#bottom-right')];

//Win outcomes
let topRowWin = [$('#top-center'), $('#top-left'), $('#top-right')];
let centerRowWin = [$('#center-center'), $('#center-left'), $('#center-right')];
let bottomRowWin = [$('#bottom-center'), $('#bottom-left'), $('#bottom-right')];
let leftColWin = [$('#bottom-left'), $('#center-left'), $('#top-left')];
let centerColWin = [$('#bottom-center'), $('#center-center'), $('#top-center')];
let rightColWin = [$('#bottom-right'), $('#center-right'), $('#top-right')];
let topLeftDiagonalWin = [$('#bottom-right'), $('#center-center'), $('#top-left')];
let topRightDiagonalWin = [$('#bottom-left'), $('#center-center'), $('#top-right')];

// array of win outcomes
let winArray = [
  topRowWin,
  centerRowWin,
  bottomRowWin,
  leftColWin,
  centerColWin,
  rightColWin,
 topLeftDiagonalWin,
 topRightDiagonalWin
];

let hasUserClass = function(element){
  return element.hasClass(users.currentPlayer.cssClass);
};

let winCheck = function(winArray){
    for (let i = 0; i < winArray.length; i++) {
      if(winArray[i].every(hasUserClass)){
        console.log("Win");
        users.winner = users.currentPlayer.username;
        $('.top-box').text(users.winner + " Wins!");
        $('.top-box').css({
          'opacity': '1',
        'background': users.currentPlayer.background});
        break;
    }
  }
};

const topButtonAnimation = function(button, clicked, fields) {
  $(button).on('click', function() {
    $(this).addClass(clicked);
    $(this).css('height', '106%');
    $(fields).slideDown('fast', function() {
      $('.content-container').on('click', function() {
        $(fields).slideUp('fast');
        $(button).css('height', '100%');
        $(button).removeClass(clicked);
      });
    });
  });
};



module.exports = {
  board,
  winArray,
  hasUserClass,
  winCheck,
  topButtonAnimation
};
