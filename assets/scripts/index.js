'use strict';

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

// use require without a reference to ensure a file is bundled
require('./example');

let users = require('./users');
let resources = require('./resources');
let authEvents = require('./auth/events.js');

$(() => {

  authEvents.addHandlers();

  let currentPlayer = users.player1;
  let turnCount = 0;

  //move function
  $('table').hide();
  if (users.player1.username === ''){
    $('.create-game').hide();
    $('.new-game').hide();
  }
    $('td').show();
    $('.create-game').show();
    $('.new-game').hide();
    $('td').on('click',function(){
      let currentCell = $(this);
      //checks if move is valid
      if (currentCell.hasClass('available')) {
        turnCount ++;
      	currentCell.removeClass('available');
        $(this).text(users.currentPlayer.symbol);
        currentCell.addClass(users.currentPlayer.cssClass);
        //winning conditions testing
        if (turnCount > 4 && users.winner === '') {
          resources.winCheck(resources.winArray);
          if( turnCount === 9 && users.winner === '') {
            $('.top-box').text('Draw!');
            $('.top-box').css('opacity', '1');
          }
        }

        //switches currentPlayer
        if (users.winner === '') {
          $('.top-box').css('opacity', '0');
          $('.top-box').text('');
          if (users.currentPlayer === users.player1){
            users.currentPlayer = users.player2;
            $('.player2-box').css('background', users.player2.background);
            $('.player1-box').css('background', 'none');
          }else {
            users.currentPlayer = users.player1;
            $('.player1-box').css('background', users.player1.background);
            $('.player2-box').css('background', 'none');
          }
        }

        //if move in invalid
      }else {
        $('.top-box').css({ opacity: '1',
                          background: users.currentPlayer.background, });
        $('.top-box').text('Pick again');
      }
    });//close move function

    //New game button
    $('#new-game-button').on('click', function () {
      users.currentPlayer = users.player1;
      users.winner = '';
      $('.player1-box').css("background", "users.player1.background");
      $('.player2-box').css("background", "none");
      //resets board
      for (let i = 0; i < resources.board.length; i++) {
        resources.gameArray[i] = '';
        resources.board[i].addClass('available');
        if(resources.board[i].hasClass(users.player1.cssClass)){
          resources.board[i].removeClass(users.player1.cssClass);
          resources.board[i].text('');
        }else if(resources.board[i].hasClass(users.player2.cssClass)){
          resources.board[i].removeClass(users.player2.cssClass);
          resources.board[i].text('');
      }
      $('.top-box').text('');
      $('.top-box').css('opacity', '0');
      $('.new-game-button').css('background', '');
    }
    });

    //top-button animation
    resources.topButtonAnimation('.login', 'login-clicked', '.login-fields', '.sign-up');
    resources.topButtonAnimation('.sign-up', 'sign-up-clicked', '.sign-up-fields', '.login');
    resources.topButtonAnimation('.change-password', 'sign-up-clicked', '.change-password-fields', '.sign-out');
  // } else {
  //   console.log('not signed in');
  //   $('.top-box').show('slow');
  //   $('.top-box').css('background','green');
  //
  // }

});//close ready
