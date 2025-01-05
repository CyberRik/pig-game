'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores = [0, 0]; //player 0 and 1
let CurrentScore = 0;
let ActivePlayer = 0;

let Playing = true;

const init = function () {
  scores = [0, 0]; //player 0 and 1
  CurrentScore = 0;
  ActivePlayer = 0;

  Playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;

  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  diceEl.classList.remove('hidden');
};

init();

const SwitchPlayer = function () {
  let CurrentScore = 0;
  document.getElementById(`current--${ActivePlayer}`).textContent =
    CurrentScore;
  ActivePlayer = ActivePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (Playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      CurrentScore += dice;
      document.getElementById(`current--${ActivePlayer}`).textContent =
        CurrentScore;
      console.log(CurrentScore);
    } else {
      //switch
      SwitchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (Playing) {
    scores[ActivePlayer] += CurrentScore;
    document.getElementById(`score--${ActivePlayer}`).textContent =
      scores[ActivePlayer];

    if (scores[ActivePlayer] >= 100) {
      Playing = false;

      document
        .querySelector(`.player--${ActivePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${ActivePlayer}`)
        .classList.remove('player--active');
    }
  }
  SwitchPlayer();
});

btnNew.addEventListener('click', init);
