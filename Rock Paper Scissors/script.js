const computerChoiceDisplay = document.getElementById('computer-choice');
const userChoiceDisplay = document.getElementById('user-choice');
const resultDisplay = document.getElementById('result');
const winsDisplay = document.getElementById('wins');
const lossesDisplay = document.getElementById('losses');
const drawsDisplay = document.getElementById('draws');
const winSound = document.getElementById('win-sound');
const loseSound = document.getElementById('lose-sound');
const drawSound = document.getElementById('draw-sound');
const possibleChoices = document.querySelectorAll('button');

let userChoice;
let computerChoice;
let result;
let wins = 0;
let losses = 0;
let draws = 0;

possibleChoices.forEach(possibleChoice =>
  possibleChoice.addEventListener('click', (e) => {
    userChoice = e.target.id;
    userChoiceDisplay.innerHTML = capitalize(userChoice);
    generateComputerChoice();
    getResult();
    updateScore();
    playSound();
  })
);

function generateComputerChoice() {
  const randomNumber = Math.floor(Math.random() * 3);
  const choices = ['rock', 'paper', 'scissors'];
  computerChoice = choices[randomNumber];
  computerChoiceDisplay.innerHTML = capitalize(computerChoice);
}

function getResult() {
  if (computerChoice === userChoice) {
    result = 'It\'s a draw!';
    draws++;
  } else if (
    (computerChoice === 'rock' && userChoice === 'scissors') ||
    (computerChoice === 'scissors' && userChoice === 'paper') ||
    (computerChoice === 'paper' && userChoice === 'rock')
  ) {
    result = 'You lost!';
    losses++;
  } else {
    result = 'You win!';
    wins++;
  }
  resultDisplay.innerHTML = result;
}

function updateScore() {
  winsDisplay.innerHTML = wins;
  lossesDisplay.innerHTML = losses;
  drawsDisplay.innerHTML = draws;
}

function playSound() {
  if (result.includes('win')) {
    winSound.play();
  } else if (result.includes('lost')) {
    loseSound.play();
  } else {
    drawSound.play();
  }
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
