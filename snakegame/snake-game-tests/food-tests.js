module("Food.init");

test("When food is initialized, should set the correct values", function() {
  var foodPosition = {
    x: 50,
    y: 13
  }
  var foodSize = 10;
  var food = new snakeGame.Food(foodPosition, foodSize);
  equal(food.position.x, foodPosition.x);
  equal(food.position.y, foodPosition.y);
  equal(food.size, foodSize);
});