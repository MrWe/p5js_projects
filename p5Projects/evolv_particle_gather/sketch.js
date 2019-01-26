let start_pos;
let stop_pos;
const r = 20;
const num_points = 100;
const population_size = 1;
let population = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  start_pos = createVector(200, height / 2);
  stop_pos = createVector(1000, height / 2);
  for (let i = 0; i < population_size; i++) {
    population.push(new Genome());
  }
}

function draw() {
  background(0);

  //Draw start and stop
  push();
  noFill();
  stroke(255);
  strokeWeight(2);
  ellipse(start_pos.x, start_pos.y, r);
  ellipse(stop_pos.x, stop_pos.y, r);
  pop();

  population[0].show();
}
