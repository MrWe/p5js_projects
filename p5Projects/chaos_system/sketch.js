let t = -5;
let x = 0;
let y = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  translate(width / 2, height / 2);
  for (let i = 0; i < 100; i++) {
    nextPoint();
    drawPoint();
  }

  t += 0.1;
}
function drawPoint() {
  stroke(255);
  strokeWeight(2);
  let px = x;
  let py = y;

  ellipse(x, y, 5);
}
function nextPoint() {
  let nextX = (-y ^ 2) - x * t + y;
  let nextY = (x ^ 2) - x * y + t;

  x = nextX * 0.5;
  y = nextY * 0.5;
}
