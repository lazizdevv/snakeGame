const gameArea = document.querySelector(".game-area");
const scoreDisplay = document.getElementById("score");
const startButton = document.getElementById("start");
const restartButton = document.getElementById("restart");
const upButton = document.getElementById("up");
const downButton = document.getElementById("down");
const leftButton = document.getElementById("left");
const rightButton = document.getElementById("right");

let snake = [{ x: 100, y: 100 }];
let apple = { x: 200, y: 200 };
let direction = { x: 0, y: 0 };
let score = 0;
let intervalId;
let gameStarted = false;

function createElement(x, y, className) {
  const element = document.createElement("div");
  element.style.left = x + "px";
  element.style.top = y + "px";
  element.classList.add(className);
  gameArea.appendChild(element);
}

function updateGameArea() {
  gameArea.innerHTML = "";
  snake.forEach((segment) => createElement(segment.x, segment.y, "snake"));
  createElement(apple.x, apple.y, "apple");
  scoreDisplay.textContent = score;
}

function getRandomPosition() {
  const max = gameArea.clientWidth / 20;
  const randomX = Math.floor(Math.random() * max) * 20;
  const randomY = Math.floor(Math.random() * max) * 20;
  return { x: randomX, y: randomY };
}

function moveSnake() {
  if (!gameStarted) return;
  const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Check for collisions with walls or itself
  if (
    newHead.x < 0 ||
    newHead.x >= gameArea.clientWidth ||
    newHead.y < 0 ||
    newHead.y >= gameArea.clientHeight ||
    snake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)
  ) {
    gameOver();
    return;
  }

  snake.unshift(newHead);

  if (newHead.x === apple.x && newHead.y === apple.y) {
    score++;
    apple = getRandomPosition();
  } else {
    snake.pop();
  }

  updateGameArea();
}

function gameOver() {
  clearInterval(intervalId);
  alert("Game Over! Your score: " + score);
  restartButton.style.display = "block";
  gameStarted = false;
}

function startGame() {
  snake = [{ x: 100, y: 100 }];
  apple = getRandomPosition();
  direction = { x: 20, y: 0 }; // Reset direction to moving right
  score = 0;
  restartButton.style.display = "none";
  startButton.style.display = "none";
  gameStarted = true;
  intervalId = setInterval(moveSnake, 200);
  updateGameArea();
}

document.addEventListener("keydown", (event) => {
  if (!gameStarted && event.key === "Enter") {
    startGame();
  }
  if (gameStarted) {
    switch (event.key) {
      case "ArrowUp":
        if (direction.y === 0) direction = { x: 0, y: -20 };
        break;
      case "ArrowDown":
        if (direction.y === 0) direction = { x: 0, y: 20 };
        break;
      case "ArrowLeft":
        if (direction.x === 0) direction = { x: -20, y: 0 };
        break;
      case "ArrowRight":
        if (direction.x === 0) direction = { x: 20, y: 0 };
        break;
    }
  }
});

startButton.addEventListener("click", startGame);

restartButton.addEventListener("click", startGame);

upButton.addEventListener("click", () => {
  if (gameStarted && direction.y === 0) direction = { x: 0, y: -20 };
});
downButton.addEventListener("click", () => {
  if (gameStarted && direction.y === 0) direction = { x: 0, y: 20 };
});
leftButton.addEventListener("click", () => {
  if (gameStarted && direction.x === 0) direction = { x: -20, y: 0 };
});
rightButton.addEventListener("click", () => {
  if (gameStarted && direction.x === 0) direction = { x: 20, y: 0 };
});

// Initial game setup
updateGameArea();
