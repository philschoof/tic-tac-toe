'use strict';

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

// use require without a reference to ensure a file is bundled
require('./example');
let users = require('./users');
let resources = require('./resources');

$(() => {
  let turnCount = 0;
  $('td').on('click',function(){
  	let currentCell = $(this);
    console.log(currentCell.attr('id'));
    if(currentCell.hasClass('available')){
      turnCount ++;
      console.log(turnCount);
      currentCell.addClass(users.currentPlayer.cssClass);
      console.log(users.currentPlayer.cssClass);
    	currentCell.removeClass('available');
      $(this).text(users.currentPlayer.symbol);
      if(turnCount > 4 && users.winner === ''){
        resources.winCheck(resources.winArray);
        if(turnCount === 9 && users.winner === ''){
          $('.top-box').text("Draw!");
          $('.top-box').css('opacity', '1');
        }
      }

      if(users.winner === ''){
        $('.top-box').css('opacity', '0');
        $('.top-box').text('');
        if(users.currentPlayer === users.player1){
          users.currentPlayer = users.player2;
          $('.player2-box').css("background", "orange");
          $('.player1-box').css("background", "none");
        }else{
          users.currentPlayer = users.player1;
          $('.player1-box').css("background", "green");
          $('.player2-box').css("background", "none");
        }
      }
      if(turnCount === 8){

      }
    }else{
      $('.top-box').css({'opacity': '1',
                        'background': users.currentPlayer.background});
      $('.top-box').text("Pick again");

    }
  });//cell placement





});//close ready
