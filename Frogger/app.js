const timeLeftDisplay = document.querySelector('#time-left');
const livesDisplay = document.querySelector('#lives');
const scoreDisplay = document.querySelector('#score');
const resultDisplay = document.querySelector('#result');
const startPauseButton = document.querySelector('#start-pause-button');
const grid = document.querySelector('.grid');

let currentIndex = 76; // Starting position of the frog
const width = 9; // Width of the grid
let timerId;
let obstacleTimerId;
let currentTime = 20;
let lives = 3;
let score = 0;

// Create grid dynamically
function createGrid() {
    for (let i = 0; i < width * width; i++) {
        const div = document.createElement('div');
        if (i === 4) div.classList.add('ending-block');
        if (i === currentIndex) div.classList.add('starting-block', 'frog');
        grid.appendChild(div);
    }
}
createGrid();

const squares = document.querySelectorAll('.grid div');

// Move the frog based on key input
function moveFrog(e) {
    squares[currentIndex].classList.remove('frog');

    switch (e.key) {
        case 'ArrowLeft':
            if (currentIndex % width !== 0) currentIndex -= 1;
            break;
        case 'ArrowRight':
            if (currentIndex % width < width - 1) currentIndex += 1;
            break;
        case 'ArrowUp':
            if (currentIndex - width >= 0) currentIndex -= width;
            break;
        case 'ArrowDown':
            if (currentIndex + width < width * width) currentIndex += width;
            break;
    }

    squares[currentIndex].classList.add('frog');
    checkOutComes();
}

// Add obstacles (cars and logs) at fixed positions
function addObstacles() {
    squares.forEach((square) => {
        square.classList.remove('c1', 'c2', 'c3', 'l1', 'l2', 'l3', 'l4', 'l5');
    });

    // Cars moving left (Row 6)
    for (let i = 45; i < 54; i += 3) {
        squares[i].classList.add('c1');
    }

    // Cars moving right (Row 7)
    for (let i = 54; i < 63; i += 3) {
        squares[i].classList.add('c2');
    }

    // Logs moving left (Row 2)
    for (let i = 9; i < 18; i += 2) {
        squares[i].classList.add('l1');
    }

    // Logs moving right (Row 3)
    for (let i = 18; i < 27; i += 2) {
        squares[i].classList.add('l2');
    }
}

// Move obstacles (cars and logs) infinitely
function moveObstacles() {
    squares.forEach((square, index) => {
        // Cars moving left
        if (square.classList.contains('c1')) {
            square.classList.remove('c1');
            squares[(index - 1 + squares.length) % squares.length].classList.add('c1');
        }

        // Cars moving right
        if (square.classList.contains('c2')) {
            square.classList.remove('c2');
            squares[(index + 1) % squares.length].classList.add('c2');
        }

        // Logs moving left
        if (square.classList.contains('l1')) {
            square.classList.remove('l1');
            squares[(index - 1 + squares.length) % squares.length].classList.add('l1');
        }

        // Logs moving right
        if (square.classList.contains('l2')) {
            square.classList.remove('l2');
            squares[(index + 1) % squares.length].classList.add('l2');
        }
    });
}

// Check if the player wins or loses
function checkOutComes() {
    lose();
    win();
}

// Lose condition
function lose() {
    if (
        currentTime <= 0 ||
        squares[currentIndex].classList.contains('c1') || // Cars
        squares[currentIndex].classList.contains('l4') || // Logs (unsafe)
        squares[currentIndex].classList.contains('l5')
    ) {
        lives--;
        livesDisplay.textContent = lives;

        if (lives <= 0) {
            resultDisplay.textContent = 'Game Over!';
            clearInterval(timerId);
            clearInterval(obstacleTimerId);
            document.removeEventListener('keyup', moveFrog);
        } else {
            resultDisplay.textContent = 'You lost a life!';
            resetFrog();
        }
    }
}

// Win condition
function win() {
    if (squares[currentIndex].classList.contains('ending-block')) {
        score += 10;
        scoreDisplay.textContent = score;
        resultDisplay.textContent = 'You Win!';
        resetFrog();
    }
}

// Reset the frog's position
function resetFrog() {
    squares[currentIndex].classList.remove('frog');
    currentIndex = 76;
    squares[currentIndex].classList.add('frog');
}

// Automatically move elements (timer and obstacles)
function autoMoveElements() {
    currentTime--;
    timeLeftDisplay.textContent = currentTime;
    moveObstacles();
    if (currentTime <= 0) checkOutComes();
}

// Start or pause the game
startPauseButton.addEventListener('click', () => {
    if (timerId) {
        clearInterval(timerId);
        clearInterval(obstacleTimerId);
        timerId = null;
        obstacleTimerId = null;
        document.removeEventListener('keyup', moveFrog);
    } else {
        timerId = setInterval(autoMoveElements, 1000);
        obstacleTimerId = setInterval(moveObstacles, 300);
        document.addEventListener('keyup', moveFrog);
    }
});

// Initialize the obstacles
addObstacles();
