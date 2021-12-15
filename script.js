'use strict';

//TODO

//*diceroll
//generate.diceroll
//display dicerooll

//if roll = 1
//  switchPlayer()

//  if not add dice roll to current score and display new score

//* holdscore
//generate.diceroll
//addToTotalScore
//If score >= 100
//  yes
//      player wins
//  No
//      switchPlayer()

//* ResetGame
//setScore to 0
//set player 1 as active

let scores = {
  score0: 0,
  currentScore0: 0,
  score1: 0,
  currentScore1: 0,
};

let scoresDom = {
  score0dom: document.getElementById('score--0'),
  score1dom: document.getElementById('score--1'),
  currentScore0dom: document.getElementById('current--0'),
  currentScore1dom: document.getElementById('current--1'),

  player0dom: document.querySelector('.player--0'),
  player1dom: document.querySelector('.player--1'),
};

//init dom elements

scoresDom['score0dom'].textContent = scores['score0'];
scoresDom['score1dom'].textContent = scores['score1'];

scoresDom['currentScore0dom'].textContent = scores['currentScore0'];
scoresDom['currentScore0dom'].textContent = scores['currentScore1'];

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
btnHold.disabled = true;
const dice = document.querySelector('.dice');
dice.classList.add('hidden');

let activePlayer = '0';

function updateDom(diceroll) {
  //current update

  scoresDom[`currentScore${activePlayer}dom`].textContent = diceroll;

  //total update
  scoresDom[`score${activePlayer}dom`].textContent =
    scores[`score${activePlayer}`];
}

function generateRoll() {
  return Math.floor(Math.random() * 6) + 1;
}

btnRoll.addEventListener('click', function () {
  dice.classList.remove('hidden');
  let diceroll = generateRoll();
  btnHold.disabled = false;
  scores[`currentScore${activePlayer}`] = diceroll;
  dice.src = `dice-${diceroll}.png`;

  updateDom(diceroll);

  if (diceroll == 1) {
    switchPlayer();
  }
});

function switchPlayer() {
  // switch player
  scoresDom[`player${activePlayer}dom`].classList.remove('player--active');
  activePlayer == 0 ? (activePlayer = 1) : (activePlayer = 0);
  scoresDom[`player${activePlayer}dom`].classList.add('player--active');

  btnHold.disabled = true;
}

btnHold.addEventListener('click', function () {
  //set total score
  scores[`score${activePlayer}`] += scores[`currentScore${activePlayer}`];
  updateDom();
  dice.classList.add('hidden');
  //reset current
  scoresDom[`currentScore${activePlayer}dom`].textContent = 0;
  switchPlayer();
});

//reset game
btnNew.addEventListener('click', function () {
  scores = {
    score0: 0,
    currentScore0: 0,
    score1: 0,
    currentScore1: 0,
  };
  scoresDom['score0dom'].textContent = scores['score0'];
  scoresDom['score1dom'].textContent = scores['score1'];

  scoresDom['currentScore0dom'].textContent = scores['currentScore0'];
  scoresDom['currentScore0dom'].textContent = scores['currentScore1'];

  //reset active player
  scoresDom[`player${activePlayer}dom`].classList.remove('player--active');
  activePlayer = 0;
  scoresDom[`player${activePlayer}dom`].classList.add('player--active');
});
