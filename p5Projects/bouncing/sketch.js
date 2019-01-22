let balls = [];
let speed = 3.14;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(50);
}

function mousePressed() {
  balls.push(new Ball(mouseX, mouseY, speed));
}

function draw() {
  background(50);
  for (let ball of balls) {
    ball.update();
    ball.show();
  }
}
