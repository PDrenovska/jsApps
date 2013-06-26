module("SnakeGame.checkCollisions");

test("", function() {
  var context = document.getElementById("snake-canvas").getContext("2d");
  var game = new snakeGame.SnakeEngine(context, 300, 300);
  var collidePosition = {
    x: 2,
    y: 2
  };
  var oldsnakesize = game.snake.size;
  game.snake.position.x = collidePosition.x;
  game.snake.position.y = collidePosition.y;
  game.food.position.x = collidePosition.x;
  game.food.position.y = collidePosition.y;
  game.checkCollisions();
  var newsnakesize = game.snake.size;
  equal(newsnakesize, oldsnakesize + 1);
});
