webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// user require with a reference to bundle the file and use it in this file
	// var example = require('./example');

	// load manifests
	// scripts

	__webpack_require__(1);

	// styles
	__webpack_require__(11);

	// attach jQuery globally
	__webpack_require__(15);
	__webpack_require__(16);

	// attach getFormFields globally

	__webpack_require__(17);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	// user require with a reference to bundle the file and use it in this file
	// var example = require('./example');

	// use require without a reference to ensure a file is bundled

	__webpack_require__(3);

	var users = __webpack_require__(4);
	var resources = __webpack_require__(5);
	var authEvents = __webpack_require__(6);

	$(function () {

	  authEvents.addHandlers();

	  var turnCount = 0;

	  //move function
	  $('table').hide();
	  if (users.player1.username === '') {
	    $('.create-game').hide();
	    $('.new-game').hide();
	  }
	  $('td').show();
	  $('.create-game').show();
	  $('.new-game').hide();
	  $('td').on('click', function () {
	    var currentCell = $(this);
	    //checks if move is valid
	    if (currentCell.hasClass('available')) {
	      turnCount++;
	      currentCell.removeClass('available');
	      $(this).text(users.currentPlayer.symbol);
	      currentCell.addClass(users.currentPlayer.cssClass);
	      resources.gameArrayMaker(resources.board, resources.gameArray);
	      resources.sendIndex = currentCell.attr('data-index');
	      resources.sendValue = currentCell.text();
	      authEvents.patchFunk();
	      //winning conditions testing
	      if (turnCount > 4 && users.winner === '') {
	        resources.winCheck(resources.winArray);
	        if (turnCount === 9 && users.winner === '') {
	          $('.top-box').text('Draw!');
	          $('.top-box').css('opacity', '1');
	        }
	      }
	      //switches currentPlayer
	      if (users.winner === '') {
	        $('.top-box').css('opacity', '0');
	        $('.top-box').text('');
	        if (users.currentPlayer === users.player1) {
	          users.currentPlayer = users.player2;
	          $('.player2-box').css('background', users.player2.background);
	          $('.player1-box').css('background', 'none');
	        } else {
	          users.currentPlayer = users.player1;
	          $('.player1-box').css('background', users.player1.background);
	          $('.player2-box').css('background', 'none');
	        }
	      }

	      //if move in invalid
	    } else {
	        $('.top-box').css({ opacity: '1',
	          background: users.currentPlayer.background });
	        $('.top-box').text('Pick again');
	      }
	  }); //close move function

	  //New game button
	  $('#new-game-button').on('click', function () {
	    $('table').show('slow');
	    $('.top-box').css('opacity', '0');
	    users.currentPlayer = users.player1;
	    $('.player1-box').css('background', users.player1.background);
	    if (users.winner !== '') {
	      $('#get-game-button').removeClass('bottom-buttons-hidden');
	    }
	    users.winner = '';
	    $('.player1-box').css("background", "users.player1.background");
	    $('.player2-box').css("background", "none");
	    //resets board
	    for (var i = 0; i < resources.board.length; i++) {
	      resources.gameArray[i] = '';
	      resources.board[i].addClass('available');
	      if (resources.board[i].hasClass(users.player1.cssClass)) {
	        resources.board[i].removeClass(users.player1.cssClass);
	        resources.board[i].text('');
	      } else if (resources.board[i].hasClass(users.player2.cssClass)) {
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
	  $('.sign-out').on('click', function () {
	    $(this).hide();
	    $('.change-password').hide();
	    $('.login').show();
	    $('.sign-up').show();
	  });
	}); //close ready
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var winner = '';

	var gameId = '';

	var player1 = {
	  username: '', //ajax return
	  symbol: 'X',
	  cssClass: 'player1',
	  background: '#00a896',
	  authToken: '',
	  id: ''
	};

	var player2 = {
	  username: '', //ajax return
	  symbol: 'O',
	  cssClass: 'player2',
	  background: '#7b435b',
	  authToken: '',
	  id: ''
	};

	//sets player info in the view
	$('.player1-user-name').text(player1.username);
	$('.player1-symbol').text(player1.symbol);

	$('.player2-user-name').text(player2.username);
	$('.player2-symbol').text(player2.symbol);

	var currentPlayer = player1;

	module.exports = {
	  winner: winner,
	  player1: player1,
	  player2: player2,
	  currentPlayer: currentPlayer,
	  gameId: gameId
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var users = __webpack_require__(4);

	var gameID = void 0; //set by new game api function

	//board array
	// ordered board
	// let board = [$('#top-center'), $('#top-left'), $('#top-right'),
	//               $('#center-center'), $('#center-left'), $('#center-right'),
	//             $('#bottom-center'), $('#bottom-left'), $('#bottom-right')];

	var board = [$('#top-left'), $('#top-center'), $('#top-right'), $('#center-left'), $('#center-center'), $('#center-right'), $('#bottom-left'), $('#bottom-center'), $('#bottom-right')];

	var gameArray = ['', '', '', '', '', '', '', '', ''];
	var sendIndex = 0;
	var sendValue = '';

	var gameArrayMaker = function gameArrayMaker(board, gameArray) {
	  for (var i = 0; i < board.length; i++) {
	    if (board[i].text() !== 'undefined') {
	      gameArray[i] = board[i].text();
	    }
	  }
	};

	//previous game winner
	var prevGameArray = void 0;
	var prevGameWinner = void 0;
	var prevGameFunk = function prevGameFunk(prevGameArray) {
	  var x = 0;
	  var o = 0;
	  for (var i = 0; i < prevGameArray.length; i++) {
	    if (prevGameArray[i] === "X") {
	      x++;
	    } else if (prevGameArray[i] === "O") {
	      o++;
	    }
	  }
	  if (x > o) {
	    prevGameWinner = 'X\'s won';
	  } else {
	    prevGameWinner = 'O\'s won';
	  }
	  return prevGameWinner;
	};

	//Win outcomes
	var topRowWin = [$('#top-center'), $('#top-left'), $('#top-right')];
	var centerRowWin = [$('#center-center'), $('#center-left'), $('#center-right')];
	var bottomRowWin = [$('#bottom-center'), $('#bottom-left'), $('#bottom-right')];
	var leftColWin = [$('#bottom-left'), $('#center-left'), $('#top-left')];
	var centerColWin = [$('#bottom-center'), $('#center-center'), $('#top-center')];
	var rightColWin = [$('#bottom-right'), $('#center-right'), $('#top-right')];
	var topLeftDiagonalWin = [$('#bottom-right'), $('#center-center'), $('#top-left')];
	var topRightDiagonalWin = [$('#bottom-left'), $('#center-center'), $('#top-right')];

	// array of win outcomes
	var winArray = [topRowWin, centerRowWin, bottomRowWin, leftColWin, centerColWin, rightColWin, topLeftDiagonalWin, topRightDiagonalWin];

	var hasUserClass = function hasUserClass(element) {
	  return element.hasClass(users.currentPlayer.cssClass);
	};

	var winCheck = function winCheck(winArray) {
	  for (var i = 0; i < winArray.length; i++) {
	    if (winArray[i].every(hasUserClass)) {
	      users.winner = users.currentPlayer.username;
	      $('.top-box').text(users.winner + " Wins!");
	      $('.top-box').css({
	        'opacity': '1',
	        'background': users.currentPlayer.background });
	      break;
	    }
	  }
	};

	var topButtonSlide = function topButtonSlide(button, clicked, fields) {
	  $(fields).slideUp('fast');
	  $(button).removeClass(clicked);
	};

	var topButtonAnimation = function topButtonAnimation(button, clicked, fields, otherButton) {
	  $(button).on('click', function () {
	    $(this).addClass(clicked);
	    $(this).css('height', '106%');
	    $(fields).slideDown('fast', function () {
	      $('.content-container').on('click', function () {
	        $(fields).slideUp('fast');
	        $(button).css('height', '100%');
	        $(button).removeClass(clicked);
	      });
	      $(otherButton).on('click', function () {
	        $(fields).slideUp('fast');
	        $(button).css('height', '100%');
	        $(button).removeClass(clicked);
	      });
	      $(fields).on('submit', function () {
	        topButtonSlide(button, clicked, fields);
	      });
	    });
	  });
	};

	module.exports = {
	  board: board,
	  winArray: winArray,
	  hasUserClass: hasUserClass,
	  winCheck: winCheck,
	  topButtonAnimation: topButtonAnimation,
	  topButtonSlide: topButtonSlide,
	  gameArray: gameArray,
	  gameArrayMaker: gameArrayMaker,
	  gameID: gameID,
	  sendIndex: sendIndex,
	  sendValue: sendValue,
	  prevGameArray: prevGameArray,
	  prevGameFunk: prevGameFunk,
	  prevGameWinner: prevGameWinner
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var getFormFields = __webpack_require__(7);

	var authApi = __webpack_require__(8);
	var authUi = __webpack_require__(10);
	var resources = __webpack_require__(5);

	var addHandlers = function addHandlers() {
	  //sign-up
	  $('#sign-up').on('submit', function (event) {
	    var data = getFormFields(this);
	    event.preventDefault();
	    authApi.signUp(authUi.signUpSuccess, authUi.failure, data);
	  });

	  //login
	  $('#login').on('submit', function (event) {
	    var data = getFormFields(this);
	    event.preventDefault();
	    authApi.signIn(authUi.signInSuccess, authUi.failure, data);
	  });

	  //sign-out
	  $('.sign-out').on('click', function (event) {
	    event.preventDefault();
	    authApi.signOut(authUi.signOutSuccess, authUi.failure);
	  });

	  //change-password
	  $('#change-password').on('click', function (event) {
	    event.preventDefault();
	    var data = getFormFields(this);
	    authApi.changePassword(authUi.success, authUi.failure, data);
	  });

	  //new game
	  $('#new-game-button').on('click', function (event) {
	    event.preventDefault();
	    var data = getFormFields(this);
	    authApi.newGame(authUi.newGameSuccess, authUi.failure, data, resources.gameID);
	  });

	  //get game
	  $('#get-game-button').on('click', function (event) {
	    event.preventDefault();
	    authApi.getGames(authUi.getGamesSuccess, authUi.failure);
	  });
	}; //close addHandlers

	var patchFunk = function patchFunk() {
	  authApi.updateGame(authUi.updateGameSuccess, authUi.failure, resources.gameArray, resources.gameID);
	};

	module.exports = {
	  addHandlers: addHandlers,
	  patchFunk: patchFunk
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	var addFormField = function addFormField(target, names, value) {
	  var name = names.shift();
	  var next = names[0];
	  if (next === '') {
	    // name is an array
	    target[name] = target[name] || [];
	    target[name].push(value);
	  } else if (next) {
	    // name is a parent key
	    target[name] = target[name] || {};
	    addFormField(target[name], names, value);
	  } else {
	    // name is the key for value
	    target[name] = value;
	  }

	  return target;
	};

	var getFormFields = function getFormFields(form) {
	  var target = {};

	  var elements = form.elements || [];
	  for (var i = 0; i < elements.length; i++) {
	    var e = elements[i];
	    if (!e.hasAttribute('name')) {
	      continue;
	    }

	    var type = 'TEXT';
	    switch (e.nodeName.toUpperCase()) {
	      case 'SELECT':
	        type = e.hasAttribute('multiple') ? 'MULTIPLE' : type;
	        break;
	      case 'INPUT':
	        type = e.getAttribute('type').toUpperCase();
	        break;
	    }

	    var names = e.getAttribute('name').split('[').map(function (k) {
	      return k.replace(/]$/, '');
	    });

	    if (type === 'MULTIPLE') {
	      for (var _i = 0; _i < e.length; _i++) {
	        if (e[_i].selected) {
	          addFormField(target, names.slice(), e[_i].value);
	        }
	      }
	    } else if (type !== 'RADIO' && type !== 'CHECKBOX' || e.checked) {
	      addFormField(target, names, e.value);
	    }
	  }

	  return target;
	};

	module.exports = getFormFields;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var app = __webpack_require__(9);
	var users = __webpack_require__(4);
	var resources = __webpack_require__(5);

	var signUp = function signUp(success, failure, data) {
	  $.ajax({
	    method: "POST",
	    url: app.api + 'sign-up',
	    data: data
	  }).done(success).fail(failure);
	};

	var signIn = function signIn(success, failure, data) {
	  $.ajax({
	    method: 'POST',
	    url: app.api + 'sign-in',
	    data: data
	  }).done(success).fail(failure);
	};

	var signOut = function signOut(success, failure) {
	  $.ajax({
	    method: "DELETE",
	    url: app.api + 'sign-out/' + app.user1.id,
	    headers: {
	      Authorization: 'Token token=' + app.user1.token
	    }
	  }).done(success).fail(failure);

	  $.ajax({
	    method: "DELETE",
	    url: app.api + 'sign-out/' + app.user2.id,
	    headers: {
	      Authorization: 'Token token=' + app.user2.token
	    }
	  }).done(success).fail(failure);
	};

	var changePassword = function changePassword(success, failure, data) {
	  $.ajax({
	    method: "PATCH",
	    url: app.api + 'change-password/' + users.currentPlayer.id,
	    data: data,
	    headers: {
	      Authorization: "Token token=" + users.currentPlayer.authToken
	    }
	  }).done(success).fail(failure);
	};

	var newGame = function newGame(success, failure, data) {
	  $.ajax({
	    method: "POST",
	    url: app.api + 'games',
	    data: data,
	    headers: {
	      Authorization: "Token token=" + users.currentPlayer.authToken
	    }
	  }).done(success).fail(failure);
	};

	var updateGame = function updateGame(success, failure) {
	  $.ajax({
	    method: 'PATCH',
	    url: app.api + 'games/' + resources.gameID,
	    data: {
	      "game": {
	        "cell": {
	          "index": resources.sendIndex,
	          "value": resources.sendValue
	        }
	      }
	    },
	    headers: {
	      Authorization: "Token token=" + users.player1.authToken
	    }
	  }).done(success).fail(failure);
	};

	var getGames = function getGames(success, failure) {
	  $.ajax({
	    method: "GET",
	    url: app.api + "games/" + (resources.gameID - 1),
	    headers: {
	      Authorization: "Token token=" + users.player1.authToken
	    }
	  }).done(success).fail(failure);
	};

	module.exports = {
	  signUp: signUp,
	  signIn: signIn,
	  signOut: signOut,
	  newGame: newGame,
	  changePassword: changePassword,
	  getGames: getGames,
	  updateGame: updateGame
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	var app = {
	  api: 'http://tic-tac-toe.wdibos.com/'

	};

	module.exports = app;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var app = __webpack_require__(9);
	var users = __webpack_require__(4);
	var resources = __webpack_require__(5);

	var signUpSuccess = function signUpSuccess(data) {
	  app.user = data.user;
	  //$('#change-password').show();
	  console.log(data);
	};

	var signInSuccess = function signInSuccess(data) {
	  // app.user = data.user;
	  // console.log("Signed in " + app.user.email);
	  $('.change-password').show();
	  $('.sign-out').show();
	  if (users.player1.username === '') {
	    app.user1 = data.user;
	    $('.player1-user-name').text(users.player1.username = app.user1.email);
	    users.player1.id = data.user.id;
	    users.player1.authToken = data.user.token;
	  } else {
	    app.user2 = data.user;
	    $('.player2-user-name').text(users.player2.username = app.user2.email);
	    users.player2.id = data.user.id;
	    users.player2.authToken = data.user.token;
	    $('#new-game-button').removeClass('bottom-buttons-hidden');
	    $('.sign-up').hide('slow');
	    $('.login').hide('slow');
	  }
	};

	var signOutSuccess = function signOutSuccess() {
	  console.log('signed-out');
	  users.player1.username = '';
	  app.user1 = null;
	  $('.player1-user-name').text('');
	  users.player2.username = '';
	  app.user2 = null;
	  $('.player2-user-name').text('');
	};

	var newGameSuccess = function newGameSuccess(data) {
	  resources.gameID = data.game.id;
	  resources.gameObject = data.game;
	  console.log(resources.gameID);
	  console.log(resources.gameObject.cells);
	};

	var updateGameSuccess = function updateGameSuccess(data) {
	  console.log(data);
	  console.log('Patched');
	};

	var getGamesSuccess = function getGamesSuccess(data) {
	  console.log(data.game.cells);
	  resources.prevGameArray = data.game.cells;
	  console.log(resources.prevGameArray);
	  $('.top-box').css('opacity', '1');
	  $('.top-box').text(resources.prevGameFunk(resources.prevGameArray));
	};

	var failure = function failure(error) {
	  console.log("fail");
	  console.log(error);
	};

	module.exports = {
	  signUpSuccess: signUpSuccess,
	  signInSuccess: signInSuccess,
	  signOutSuccess: signOutSuccess,
	  newGameSuccess: newGameSuccess,
	  getGamesSuccess: getGamesSuccess,
	  updateGameSuccess: updateGameSuccess,
	  failure: failure
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(12);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(14)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./index.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./index.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(13)();
	// imports


	// module
	exports.push([module.id, "body {\n  background: #eee;\n  margin: 0; }\n\n.top-bar {\n  background: #808080;\n  border-bottom: 1px solid #808080;\n  box-sizing: border-box;\n  height: 50px;\n  padding: 2px 40px;\n  width: 100%; }\n\n.top-button {\n  background: #eee;\n  border: 1px solid #000;\n  border-radius: 5%;\n  box-sizing: border-box;\n  float: right;\n  height: 100%;\n  margin-left: 50px;\n  padding-top: 15px;\n  text-align: center;\n  transition: .25s ease;\n  width: 80px;\n  z-index: 1; }\n\n.title {\n  float: left;\n  margin-left: 5px;\n  width: 100px; }\n\n.login:hover,\n.password:hover {\n  background: #7f3fbf;\n  color: #fff; }\n\n.login-clicked {\n  background: #7f3fbf;\n  color: #fff; }\n\n.login-fields,\n.change-password-fields {\n  background: #7f3fbf;\n  border: 1px solid #000;\n  box-sizing: border-box;\n  display: none;\n  height: 200px;\n  padding: 3px 10px;\n  position: absolute;\n  right: 15px;\n  top: 50px;\n  width: 236px;\n  z-index: 1; }\n\n.login-fields input,\n.change-password-fields input {\n  border-radius: 5%;\n  display: block;\n  font-size: 18px;\n  height: 35px;\n  margin: 15px 0;\n  width: 90%; }\n\n.sign-up:hover {\n  background: #3fbf3f;\n  color: #fff; }\n\n.sign-up-clicked {\n  background: #3fbf3f;\n  color: #fff; }\n\n.sign-up-fields {\n  background: #3fbf3f;\n  border: 1px solid #000;\n  box-sizing: border-box;\n  display: none;\n  height: 230px;\n  padding: 3px 10px;\n  position: absolute;\n  right: 15px;\n  top: 50px;\n  width: 236px;\n  z-index: 1; }\n\n.sign-up-fields input {\n  border-radius: 5%;\n  display: block;\n  font-size: 18px;\n  height: 35px;\n  margin: 15px 0;\n  width: 90%; }\n\n.sign-out,\n.change-password {\n  display: none;\n  float: left;\n  margin-left: 10px; }\n\n.content-container {\n  border-left: 1px solid #808080;\n  border-right: 1px solid #808080;\n  margin: 0 auto;\n  max-width: 960px;\n  padding: 0 15px;\n  position: relative;\n  top: 25px; }\n\n.user-box {\n  border-radius: 5%;\n  box-sizing: border-box;\n  font-size: 25px;\n  height: 100px;\n  margin-bottom: 15px;\n  padding: 10px;\n  transition: .25s ease;\n  width: 200px; }\n\n.player1-box {\n  background: #00a896;\n  float: left; }\n\n.player2-box {\n  background: #7b435b;\n  float: right;\n  text-align: right; }\n\n.top-box {\n  border-radius: 5%;\n  box-sizing: border-box;\n  clear: both;\n  color: #eee;\n  font-size: 25px;\n  margin: 0 auto;\n  min-height: 75px;\n  opacity: 0;\n  padding: 4px;\n  text-align: center;\n  transition: .25s ease;\n  width: 175px; }\n\n.create-game {\n  margin: 0 auto;\n  width: 75px; }\n\ntable {\n  box-sizing: border-box;\n  color: #808080;\n  height: 400px;\n  margin: 0 auto;\n  position: relative;\n  top: 13px;\n  width: 400px; }\n\ntd {\n  border-radius: 5%;\n  font-size: 30px;\n  height: 40px;\n  text-align: center;\n  transition: .3s ease;\n  width: 40px; }\n\ntd:hover {\n  color: #fff; }\n\n.center-col {\n  border-left: 1px solid #000;\n  border-right: 1px solid #000; }\n\n.center-row {\n  border-bottom: 1px solid #000;\n  border-top: 1px solid #000; }\n\n.new-game-button {\n  border: 1px solid #000;\n  border-radius: 5%;\n  box-sizing: border-box;\n  height: 50px;\n  margin: 40px auto;\n  padding-top: 15px;\n  text-align: center;\n  transition: .25s ease;\n  width: 105px; }\n\n.bottom-buttons-hidden {\n  display: none; }\n\n.player1 {\n  color: #00a896; }\n\n.player2 {\n  color: #7b435b; }\n\n@media (max-width: 530px) {\n  .container {\n    width: 100%; }\n  .top-button {\n    margin-left: 5px; }\n  .user-box {\n    width: 50%; }\n  table {\n    height: 350px;\n    width: 100%; } }\n\n@media (max-width: 460px) {\n  .top-bar {\n    padding: 0; }\n  .top-button {\n    margin-left: 0;\n    margin-right: 0; }\n  .user-box {\n    width: 50%; }\n  table {\n    height: 350px;\n    width: 100%; } }\n\n.prev-winner {\n  text-align: center; }\n\n.top-left:hover {\n  background: #05668d; }\n\n.top-center:hover {\n  background: #028090; }\n\n.top-right:hover {\n  background: #273496; }\n\n.center-left:hover {\n  background: #1e2749; }\n\n.center-center:hover {\n  background: #30343f; }\n\n.center-right:hover {\n  background: #05668d; }\n\n.bottom-left:hover {\n  background: #028090; }\n\n.bottom-center:hover {\n  background: #273496; }\n\n.bottom-right:hover {\n  background: #1e2749; }\n\n.new-game-button:hover {\n  background: #808080; }\n", ""]);

	// exports


/***/ },
/* 13 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["$"] = __webpack_require__(2);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["jQuery"] = __webpack_require__(2);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["getFormFields"] = __webpack_require__(7);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }
]);