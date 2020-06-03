let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
let score = 0;

snake[0] = {
  x: 8*box,
  y: 8*box
};

let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
}
  
let direction = "down";

function createBackground() {
  context.fillStyle = "#322E87";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
  for(i = 0; i < snake.length; i++){
    context.fillStyle = "#fff";
    context.fillRect(snake[i].x, snake[i].y, box - 1, box - 1); // O valor -1 vai criar um espaço de 1px entre os quadrados da cobrinha
  }
}

function createFood() {
  context.fillStyle = "#C2402C";
  context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event) {
  if(event.keyCode === 37 && direction !== "right") direction = "left";
  if(event.keyCode === 38 && direction !== "down") direction = "up";
  if(event.keyCode === 39 && direction !== "left") direction = "right";
  if(event.keyCode === 40 && direction !== "up") direction = "down";
}

function startGame() {
  if(snake[0].x > 15 * box && direction === "right") snake[0].x = 0;
  if(snake[0].x < 0 && direction === "left") snake[0].x = 16 * box;

  if(snake[0].y > 15 * box && direction === "down") snake[0].y = 0;
  if(snake[0].y < 0 && direction === "up") snake[0].y = 16 * box;

  createBackground();
  createSnake();
  createFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if(direction === 'right') snakeX += box;
  if(direction === 'left') snakeX -= box;
  if(direction === 'up') snakeY -= box;
  if(direction === 'down') snakeY += box;

  if(snakeX !== food.x || snakeY !== food.y){
    snake.pop();
  }
  else{
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;

    score += 35;

    document.getElementById("score").innerHTML = "Score: " + score;
  }

  for(i = 1; i < snake.length; i++) {
    if(snake[0].x === snake[i].x && snake[0].y === snake[i].y){
      clearInterval(game);
      alert("Você perdeu :( \nSeu score foi: " + score);
      location.reload();
    }
  }

  let newHead = {
    x: snakeX, 
    y: snakeY
  }

  snake.unshift(newHead);
}

let game = setInterval(startGame, 100);