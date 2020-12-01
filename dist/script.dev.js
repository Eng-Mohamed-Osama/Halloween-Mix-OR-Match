"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var cards = document.querySelectorAll('.card');
var cardsNormalLevel = document.querySelectorAll('.normal');
var cardsHardLevel = document.querySelectorAll('.normal-hard');
var flipCounts = document.querySelector('.flips');
var timeScore = document.querySelector('.time');
var mainGameAudio = new Audio('Assets/Audio/creepy.mp3');
var gameOverAudio = new Audio('Assets/Audio/gameOver.wav');
var victoryAudio = new Audio('Assets/Audio/victory.wav');
var flipAudio = new Audio('Assets/Audio/flip.wav');
var matchAudio = new Audio('Assets/Audio/match.wav');
var gameTypeIndecator = document.querySelector('.game-Type');
var overlayerItems = Array.from(document.querySelectorAll('.overlayer'));
var overlayerButtonStart = Array.from(document.querySelectorAll('.start'));
var playerName = document.querySelector('#start-game-screen input');
var score = document.querySelector('.score'); // let nextLevel = document.querySelector('.next-level');

var getTheScoreButton = document.querySelector('.get-score');
var getTheScoreButtonFromWin = document.querySelector('.get-score-from-win');
var getBackToTheGameButton = document.querySelector('.get-back-to-game');
var clearThelocalStorageButton = document.querySelector('.delete-all-score');
var gameMessage = document.querySelector('.message');
var scoreTableHead = document.querySelector('.tablescore');
overlayerButtonStart.forEach(function (item) {
  item.addEventListener('click', function () {
    item.parentNode.classList.remove('visible');
    startTheGame();
  });
});
window.onload = document.querySelector('#start-game-screen').classList.add('visible');
var timers = document.querySelector('.scoreandtime-container .timer');
console.log(scoreTableHead);

function gameType() {
  document.querySelectorAll('.button-container button').forEach(function (button) {
    return button.addEventListener('click', function (e) {
      button.classList.remove('coloration');
      document.querySelectorAll('.button-container button').forEach(function (el) {
        el.classList.remove('coloration');
      });

      if (e.target.id == 'Normal') {
        e.target.classList.add('coloration');
        document.querySelector('.content-container').classList.remove('hard-grid-system');
        document.querySelector('.content-container ').classList.remove('impossible-grid-system');
        document.querySelectorAll('.hard').forEach(function (card) {
          card.classList.remove('show');
        });
        document.querySelectorAll('.impossible').forEach(function (card) {
          card.classList.remove('show');
        });
        document.querySelector('.game-Type').innerHTML = e.target.id;
      } else if (e.target.id == 'Hard') {
        e.target.classList.add('coloration');
        document.querySelector('.content-container ').classList.add('hard-grid-system');
        document.querySelector('.content-container ').classList.remove('impossible-grid-system');
        document.querySelectorAll('.hard').forEach(function (card) {
          card.classList.add('show');
        });
        document.querySelectorAll('.impossible').forEach(function (card) {
          card.classList.remove('show');
        });
        document.querySelector('.game-Type').innerHTML = e.target.id;
      } else if (e.target.id == "Impossible") {
        e.target.classList.add('coloration');
        document.querySelector('.content-container ').classList.add('impossible-grid-system');
        document.querySelector('.content-container ').classList.remove('hard-grid-system');
        document.querySelectorAll('.hard').forEach(function (card) {
          card.classList.add('show');
        });
        document.querySelectorAll('.impossible').forEach(function (card) {
          card.classList.add('show');
        });
        document.querySelector('.game-Type').innerHTML = e.target.id;
      }
    });
  });
}

gameType();

function getTheScorePage() {
  getTheScoreButton.addEventListener('click', function () {
    getTheScoreButton.parentNode.classList.add('swing');
    getTheScoreButton.classList.add('swing');
    var socring = document.querySelector('#scoringTable');
    socring.classList.add('overlayer-score');
    socring.classList.add('visible');
    console.log('worked');

    if (localStorage.length > 0) {
      gameMessage.remove();
    } else if (localStorage.length <= 0) {
      scoreTableHead.remove();
    }
  });
}

getTheScorePage();

function getBackToTheGame() {
  getBackToTheGameButton.addEventListener('click', function () {
    getBackToTheGameButton.parentNode.classList.remove('overlayer-score');
    getBackToTheGameButton.classList.remove('visible');
    var gamePage = document.querySelector('#start-game-screen');
    gamePage.classList.remove('swing');
    getTheScoreButton.classList.remove('swing');
  });
}

getBackToTheGame();
clearThelocalStorageButton.addEventListener('click', function () {
  clearThelocalStorageButton.parentNode.prepend(gameMessage);
  scoreTableHead.remove();
  window.localStorage.clear();
});

function startTheGame() {
  var order = function order() {
    cardNumber = _toConsumableArray(Array(cards.length).keys());
    console.log(cardNumber);
    cards.forEach(function (card) {
      for (i = 0; i <= cardNumber.length; i++) {
        number = Math.floor(Math.random() * cardNumber.length);
        card.style.order = number;
      }
    });
    console.log(number);
  };

  order();
  cards.forEach(function (card) {
    setTimeout(function () {
      card.classList.remove('flipped');
      card.classList.remove('dance');
    }, 50);
  });
  getTheScorePage();
  gameLogic();
  mainGameAudio.play();
}

for (i = 0; i < localStorage.length; i++) {
  var tableScore = "\n                 <tbody>\n                   <tr >\n                     <td id = \"".concat(JSON.parse(localStorage.getItem(localStorage.key(i))).name, "\" ><span class =\"clear-score\">X</span>").concat(JSON.parse(localStorage.getItem(localStorage.key(i))).name, "</td>\n                     <td>").concat(JSON.parse(localStorage.getItem(localStorage.key(i))).Timing, "</td>\n                     <td>").concat(JSON.parse(localStorage.getItem(localStorage.key(i))).flipScore, "</td>\n                     <td>").concat(JSON.parse(localStorage.getItem(localStorage.key(i))).gameLevel, "</td>\n                   </tr>\n                </tbody>\n                ");
  document.querySelector('.tablescore').innerHTML += tableScore;
}

document.querySelectorAll('.clear-score').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.target.parentNode.parentNode.parentNode.remove();
    console.log(e.target.parentNode.id);
    window.localStorage.removeItem(e.target.parentNode.id);

    if (localStorage.length <= 0) {
      scoreTableHead.remove();
      clearThelocalStorageButton.parentNode.prepend(gameMessage);
    }
  });
});

function gameOver() {
  document.querySelector('#lost-game-screen').classList.add('visible');
  var timer = document.querySelector('.scoreandtime-container .timer');
  timer.innerHTML = 100;
  cards.forEach(function (card) {
    setTimeout(function () {
      card.classList.remove('flipped');
      card.classList.remove('dance');
    }, 50);
  });
  mainGameAudio.pause();
  mainGameAudio.currentTime = 0;
  gameOverAudio.play();
  getTheScorePage();
}

function win() {
  document.querySelector('#won-game-screen').classList.add('visible');
  var timer = document.querySelector('.scoreandtime-container .timer');
  mainGameAudio.pause();
  mainGameAudio.currentTime = 0;
  victoryAudio.play();
  var player = {
    name: playerName.value,
    Timing: timeScore.innerHTML,
    flipScore: score.innerHTML,
    gameLevel: gameTypeIndecator.innerHTML
  };
  window.localStorage.setItem(playerName.value, JSON.stringify(player)); // if(player.name === ""){
  //     window.localStorage.setItem('guest', JSON.stringify(player));
  // }else{
  //     window.localStorage.setItem(playerName.value, JSON.stringify(player));
  // }
}

function gameLogic() {
  flipCounts.innerHTML = 0;
  var timer = document.querySelector('.scoreandtime-container .timer');
  timer.innerHTML = 100;
  var StartCount = 100;
  var counter = setInterval(function () {
    var matchArray = document.querySelectorAll('.dance');
    timer.innerHTML = StartCount;

    if (StartCount > 0) {
      if (gameTypeIndecator.innerHTML === "Normal" && matchArray.length === cardsNormalLevel.length) {
        clearInterval(counter);
        win(); // document.querySelector('#won-game-screen').append(nextLevel)
        // nextLevel.innerHTML = "that was easy right ? , let's go a bit harder "
        // nextLevel.addEventListener("click" , ()=>{
        //     // nextLevel.target.classList.add('coloration')
        //     document.querySelector('.content-container ').classList.add('hard-grid-system')
        //     document.querySelector('.content-container ').classList.remove('impossible-grid-system')
        //     document.querySelectorAll('.hard').forEach(card=>{card.classList.add('show')})
        //     nextLevel.parentNode.remove()
        //     // document.querySelectorAll('.impossible').forEach(card=>{card.classList.remove('show')})
        //     cards.forEach(card =>{
        //         setTimeout(() => {
        //             card.classList.remove('flipped');
        //             card.classList.remove('dance');
        //         }, (50));
        //         document.querySelector('.game-Type').innerHTML = "Hard"   
        //     })
        // })

        StartCount = 100;
      } else if (gameTypeIndecator.innerHTML === "Hard" && matchArray.length === cardsHardLevel.length) {
        clearInterval(counter);
        win(); // nextLevel.innerHTML = "next Level , You ready !"

        StartCount = 100;
      } else if (gameTypeIndecator.innerHTML === "Impossible" && matchArray.length === cards.length) {
        clearInterval(counter);
        win();
        StartCount = 100; // nextLevel.remove()
      } else {
        StartCount--;
      }
    } else if (StartCount === 0) {
      gameOver();
      clearInterval(counter);
    } else {
      StartCount--;
    }
  }, 1000);
  cards.forEach(function (card) {
    flipCountNumber = 0;
    card.addEventListener('click', function () {
      flipped(card);
      flipCounts.innerHTML = flipCountNumber;
      score.innerHTML = flipCounts.innerHTML;
      timeScore.innerHTML = 101 - timer.innerHTML;
    });
  });
}

function flipped(card) {
  card.classList.add('flipped');
  flipAudio.play();
  cardCount = Array.from(document.querySelectorAll('.card'));
  var arr = cardCount.filter(function (flipBlock) {
    return flipBlock.classList.contains('flipped');
  });
  console.log(arr);

  if (arr.length === 2) {
    stopClicking();
    checkflipped(arr[0], arr[1]);
  }
}

function stopClicking() {
  cards.forEach(function (el) {
    el.classList.add('stop-clicking');
    setTimeout(function () {
      el.classList.remove('stop-clicking');
    }, 750);
  });
}

function checkflipped(card1, card2) {
  if (card1.dataset.name === card2.dataset.name) {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
    card1.classList.add('dance');
    card2.classList.add('dance');
    matchAudio.play();
    flipCountNumber++;
  } else {
    flipCountNumber++;
    setTimeout(function () {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
    }, 750);
  }
}