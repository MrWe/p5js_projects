points = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  for (let point of points) {
    point.update();
    point.show();
  }
}

function mouseDragged() {
  points.push(new Point(createVector(mouseX, mouseY)));
}
