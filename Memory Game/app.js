document.addEventListener('DOMContentLoaded', () => {
  const cardArray = [
    { name: 'fries', img: 'image/fries.png' },
    { name: 'cheeseburger', img: 'image/cheeseburger.png' },
    { name: 'ice-cream', img: 'image/ice-cream.png' },
    { name: 'pizza', img: 'image/pizza.png' },
    { name: 'milkshake', img: 'image/milkshake.png' },
    { name: 'hotdog', img: 'image/hotdog.png' },
    { name: 'fries', img: 'image/fries.png' },
    { name: 'cheeseburger', img: 'image/cheeseburger.png' },
    { name: 'ice-cream', img: 'image/ice-cream.png' },
    { name: 'pizza', img: 'image/pizza.png' },
    { name: 'milkshake', img: 'image/milkshake.png' },
    { name: 'hotdog', img: 'image/hotdog.png' }
  ];

  const grid = document.querySelector('.grid');
  const resultDisplay = document.querySelector('#result');
  const timerDisplay = document.querySelector('#timer');
  const bestTimeDisplay = document.querySelector('#best-time');
  const controls = document.querySelector('.controls');
  let timer;
  let secondsElapsed = 0;
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];
  let bestTime = localStorage.getItem('bestTime') || 'N/A';

  bestTimeDisplay.textContent = bestTime;

  function createBoard() {
    grid.innerHTML = '';
    cardArray.sort(() => 0.5 - Math.random());
    cardArray.forEach((_, i) => {
      const card = document.createElement('img');
      card.setAttribute('src', 'image/blank.png');
      card.setAttribute('data-id', i);
      card.classList.add('card');
      card.addEventListener('click', flipCard);
      grid.appendChild(card);
    });
    startTimer();
  }

  function flipCard() {
    const cardId = this.getAttribute('data-id');
    if (!cardsChosenId.includes(cardId)) {
      cardsChosen.push(cardArray[cardId].name);
      cardsChosenId.push(cardId);
      this.setAttribute('src', cardArray[cardId].img);
      this.classList.add('flipped');
      if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500);
      }
    }
  }

  function checkForMatch() {
    const cards = document.querySelectorAll('.card');
    const [optionOneId, optionTwoId] = cardsChosenId;
    if (cardsChosen[0] === cardsChosen[1]) {
      cards[optionOneId].setAttribute('src', 'image/white.png');
      cards[optionTwoId].setAttribute('src', 'image/white.png');
      cards[optionOneId].removeEventListener('click', flipCard);
      cards[optionTwoId].removeEventListener('click', flipCard);
      cardsWon.push(cardsChosen);
    } else {
      cards[optionOneId].setAttribute('src', 'image/blank.png');
      cards[optionTwoId].setAttribute('src', 'image/blank.png');
      cards[optionOneId].classList.remove('flipped');
      cards[optionTwoId].classList.remove('flipped');
    }
    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = cardsWon.length;
    if (cardsWon.length === cardArray.length / 2) {
      clearInterval(timer);
      resultDisplay.textContent = 'Congratulations! You found them all!';
      updateBestTime();
    }
  }

  function startTimer() {
    clearInterval(timer);
    secondsElapsed = 0;
    timerDisplay.textContent = secondsElapsed;
    timer = setInterval(() => {
      secondsElapsed++;
      timerDisplay.textContent = secondsElapsed;
    }, 1000);
  }

  function updateBestTime() {
    if (bestTime === 'N/A' || secondsElapsed < bestTime) {
      localStorage.setItem('bestTime', secondsElapsed);
      bestTimeDisplay.textContent = secondsElapsed;
    }
  }

  controls.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const difficulty = e.target.id;
      adjustDifficulty(difficulty);
      createBoard();
    }
  });

  function adjustDifficulty(level) {
    if (level === 'easy') {
      grid.style.width = '300px';
      cardArray.splice(8); // Fewer cards for easy mode
    } else if (level === 'medium') {
      grid.style.width = '400px';
    } else if (level === 'hard') {
      grid.style.width = '500px';
      cardArray.push(
        { name: 'donut', img: 'image/donut.png' },
        { name: 'donut', img: 'image/donut.png' }
      );
    }
  }
});
