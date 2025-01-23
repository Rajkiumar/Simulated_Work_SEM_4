const squares = document.querySelectorAll('.square');
const timeLeft = document.querySelector('#time-left');
const scoreDisplay = document.querySelector('#score');

let result = 0;
let hitPosition;
let currentTime = 60;
let moleTimerId;
let countdownTimerId;

// Function to select a random square and show the mole
function randomSquare() {
  squares.forEach(square => square.classList.remove('mole')); // Clear mole from all squares

  const randomSquare = squares[Math.floor(Math.random() * squares.length)];
  randomSquare.classList.add('mole');
  hitPosition = randomSquare.id; // Update hit position
}

// Function to dynamically adjust the mole's speed
function moveMole() {
  let moleSpeed = Math.max(300, 1000 - result * 50); // Speed up as score increases
  if (moleTimerId) clearInterval(moleTimerId); // Clear previous timer
  moleTimerId = setInterval(randomSquare, moleSpeed); // Start new interval
}

// Track the player's clicks on the squares
squares.forEach(square => {
  square.addEventListener('mousedown', () => {
    if (square.id === hitPosition) {
      result++; // Increment the score
      scoreDisplay.textContent = result; // Update score in the DOM
      hitPosition = null; // Clear the hit position
    }
  });
});

// Function to handle countdown and end the game
function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;

  if (currentTime === 0) {
    clearInterval(countdownTimerId); // Stop countdown timer
    clearInterval(moleTimerId); // Stop mole movement
    alert('GAME OVER! Your final score is ' + result);
  }
}

// Initialize the game
function startGame() {
  randomSquare(); // Start showing moles
  moveMole(); // Adjust mole speed
  countdownTimerId = setInterval(countDown, 1000); // Start countdown timer
}

startGame();
