let canvas = document.getElementById("gameboard");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
let score = 0;
let top_left = {x: 0, y: 0}
let bottom_right = {x: 512, y: 512}

snake[0] = {
  x: 8*box,
  y: 8*box
};

let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
}
  
let direction = "down";

function showBoard() {
  context.fillStyle = "#322E87";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function showSnake() {
  for(i = 0; i < snake.length; i++){
    context.fillStyle = "#fff";
    context.fillRect(snake[i].x, snake[i].y, box - 1, box - 1); // O valor -1 vai criar um espaço de 1px entre os quadrados da cobrinha
  }
}

function showFood() {
  context.fillStyle = "#C2402C";
  context.fillRect(food.x, food.y, box, box);
}

function reset()
{
  point = snake[0];

  if(point.x > 16*box && direction === "right") point.x = 0;
  if(point.x < 0 && direction === "left") point.x = 16 * box;

  if(point.y > 16 * box && direction === "down") point.y = 0;
  if(point.y < 0 && direction === "up") point.y = 16 * box;
}

function isColision(first_point, second_point)
{
    if (first_point.x === second_point.x && 
        first_point.y === second_point.y)
      {
        return true;
      }  
      else return false;
}

function isOutOfTheGameBoard()
{
  point = snake[0];

  if (!(point.x > top_left.x && 
      point.x < bottom_right.x &&
      point.y > top_left.y && 
      point.y < bottom_right.y)
      )
  {
    return true;
  }
  else return false
}

document.addEventListener('keydown', update);

function update(event) {
  if(event.keyCode === 37 && direction !== "right") direction = "left";
  if(event.keyCode === 38 && direction !== "down") direction = "up";
  if(event.keyCode === 39 && direction !== "left") direction = "right";
  if(event.keyCode === 40 && direction !== "up") direction = "down";
}

function startGame() 
{
  let food_position = food
  let newHead = {x: 0, y: 0};
  let oldHead = snake[0];
  let isGameOver = false;

  reset();
  showBoard();
  showFood();
  
  newHead.x = oldHead.x;
  newHead.y = oldHead.y;

  if(direction === 'right')
      newHead.x = newHead.x + box 

  if(direction === 'left')
    newHead.x = newHead.x - box
  
  if(direction === 'up') 
    newHead.y = newHead.y - box

  if(direction === 'down')
    newHead.y = newHead.y + box
  
  if(isColision(snake[0], food_position))
 {
    snake.unshift(newHead);
    showSnake();

    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;

    score += 35;

    document.getElementById("score").innerHTML = "Score: " + score;    
  }
  else
  {
    snake.unshift(newHead)
    snake.pop();
    showSnake();
  }
    
  
  if (isOutOfTheGameBoard())
      isGameOver = true;
  
  for(i = 1; i < snake.length; i++) 
  {
    if(isColision(snake[0], snake[i]))
    {
      isGameOver = true;
      break;
    }
  }

  if (isGameOver)
  {
    clearInterval(game);
    alert("Você perdeu :( \nSeu score foi: " + score);
    location.reload();
  }
}

let game = setInterval(startGame, 140);