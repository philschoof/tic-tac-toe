'use strict';

let users = require('./users');

let gameID;
//board array

// ordered board
// let board = [$('#top-center'), $('#top-left'), $('#top-right'),
//               $('#center-center'), $('#center-left'), $('#center-right'),
//             $('#bottom-center'), $('#bottom-left'), $('#bottom-right')];

let board = [  $('#top-left'),$('#top-center'),$('#top-right'),
               $('#center-left'), $('#center-center'), $('#center-right'),
             $('#bottom-left'), $('#bottom-center'), $('#bottom-right')];

let gameArray = ['','','','','','','','',''];

// let patchArray = [];

let gameArrayMaker = function (board, gameArray) {
  for (let i = 0; i < board.length; i++) {
    if(board[i].text() !== 'undefined') {
      gameArray[i] = board[i].text();
    }
  }

};

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
      if(winArray[i].every(hasUserClass)) {
        users.winner = users.currentPlayer.username;
        $('.top-box').text(users.winner + " Wins!");
        $('.top-box').css({
          'opacity': '1',
        'background': users.currentPlayer.background});
        break;
    }
  }
};


const topButtonSlide = function (button, clicked, fields) {
    $(fields).slideUp('fast');
    $(button).removeClass(clicked);
};

const topButtonAnimation = function(button, clicked, fields, otherButton) {
  $(button).on('click', function() {
    $(this).addClass(clicked);
    $(this).css('height', '106%');
    $(fields).slideDown('fast', function() {
      $('.content-container').on('click', function() {
        $(fields).slideUp('fast');
        $(button).css('height', '100%');
        $(button).removeClass(clicked);
      });
      $(otherButton).on('click', function() {
        $(fields).slideUp('fast');
        $(button).css('height', '100%');
        $(button).removeClass(clicked);
      });
      $(fields).on('submit', function() {
        topButtonSlide(button, clicked, fields);
      });
    });
  });
};



module.exports = {
  board,
  winArray,
  hasUserClass,
  winCheck,
  topButtonAnimation,
  topButtonSlide,
  gameArray,
  gameArrayMaker,
  gameID
};
