let start_pos;
let stop_pos;
const r = 100;
const num_points = 100;
const population_size = 20;
let population = [];
let finished_population = [];
let population_count = 0;

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

  for (let i = population.length-1; i >= 0; i--) {
    population[i].update();  
    if(population[i].life <= 0){
      population[i].fitness /= (population[i].elements.length * 0.001);
      finished_population.push(population[i]);
      population.splice(i, 1);
    }
  }

  if(population.length == 0){
    create_new_population();
  }
  
  if(population_count % 10 === 0){
    population[0].show();
  }
}

function create_new_population(){
  finished_population.sort(compare);
  for (let i = 0; i < finished_population.length/5; i++) {
    for (let j = 0; j < 5; j++) {
      let new_genome = finished_population[i].copy();
      for (let n = 0; n < random(1, 5); n++) {
        new_genome.mutate();
      }
      population.push(new_genome);
    }
  }
  finished_population = [];
  population_count++;
  print(population_count);
}

function compare(a,b) {
  if (a.fitness > b.fitness){
    return -1;
  }
  if (a.fitness < b.fitness){
    return 1;
  }
  return 0;
}
