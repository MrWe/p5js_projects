let startPos;
let stopPos;
let r = 20;
let numPoints = 10;
let population = [];
let population_size = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  startPos = createVector(200, height / 2);
  stopPos = createVector(1000, height / 2);
  start_genome = new Genome();
  for (let i = 0; i < population_size; i++) {
    const element = array[i];
  }
}

function draw() {
  background(0);

  //Draw start and stop
  push();
  noFill();
  stroke(255);
  strokeWeight(2);
  ellipse(startPos.x, startPos.y, r);
  ellipse(stopPos.x, stopPos.y, r);
  pop();

  //g.show();
}
