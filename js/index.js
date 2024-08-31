const array = [
  "images/blueberry.jpg", //1
  "images/cherry.jpg", //2
  "images/kiwi.jpg", //3
  "images/lemon.jpg", //4
  "images/blueberry.jpg", //5
  "images/cherry.jpg", //6
  "images/kiwi.jpg", //7
  "images/lemon.jpg", //8
];

let flippedCards = [];
let matchedCrads = [];

function shuffle(array) {
  let currentIndex = array.length;
  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

function gameBoard() {
  const board = document.getElementById("game-board");
  shuffle(array).forEach((image, index) => {
    const card = document.createElement("div");
    card.classList.add("card", "bg-gray-700", "relative");
    card.dataset.name = image;
    card.dataset.index = index;
    card.innerHTML = `
        <div class="card-front"></div>
        <div class="card-back" style="background-image: url('${image}')"></div>
      `;
    card.addEventListener("click", () => flipCard(card));
    board.appendChild(card);
  });
}

function flipCard(card) {
  card.classList.toggle("flip");
  flippedCards.push(card);

  if (flippedCards.length == 2) {
    checkForMatch(flippedCards[0], flippedCards[1]);
  } else if (flippedCards.length === 1) {
    setTimeout(() => {
      flippedCards[0].classList.remove("flip");
      flippedCards = [];
    }, 3000);
  }
}

function checkForMatch(card1, card2) {
  if (card1.dataset.name == card2.dataset.name) {
    matchedCrads.push(card1, card2);
  } else {
    setTimeout(() => {
      card1.classList.remove("flip");
      card2.classList.remove("flip");
      flippedCards = [];
    }, 1500);
  }
}

document.getElementById("reset-button").addEventListener("click", resetGame);

function resetGame() {
  flippedCards = [];
  matchedCards = [];
  document.getElementById("game-board") = "reset game";
  gameBoard();
}

gameBoard();
