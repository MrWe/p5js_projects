var width = 1000;
var height = 600;
var rocketx = width / 2;
var rockety = height - 50;
var counter = 0;
var populationCounter = 0;
var timeToLive = 400;
var target;
var oneCompleted = false;
var magnitude = 0.5;
var runtimeS = 0;
var runtimeMS = 0;
var rx = width / 4;
var ry = height / 2
var rw = 500;
var rh = 30;
var shapes = [];
var bestRocket;

function Population() {
  this.rockets = [];
  this.popSize = 800;
  this.matingPool = [];


  for (var i = 0; i < this.popSize; i++) {
    this.rockets.push(new Rocket());
  }

  this.evaluate = function() {
    this.matingPool = [];
    var maxfit = 0;

    for (var i = 0; i < this.popSize; i++) {
      this.rockets[i].calcFitness();
      if (this.rockets[i].fitness > maxfit) {
        maxfit = this.rockets[i].fitness;
      }
      if (bestRocket.fitness < this.rockets[i].fitness) {
        bestRocket = Object.assign({}, this.rockets[i]);
        bestRocket.best = true;
      }
      var fitness = map(this.rockets[i].fitness, 0, maxfit, 0, 1);
      var n = fitness * 100;
      for (var j = 0; j < n; j++) {
        this.matingPool.push(this.rockets[i]);
      }
    }
  }

  this.selection = function() {
    try {
      var newrockets = [];
      for (var i = 0; i < this.rockets.length; i++) {
        //console.log(random(this.matingPool).dna);
        var parentA = random(this.matingPool)
          .dna;
        var parentB = random(this.matingPool)
          .dna;
        var child = parentA.crossover(parentB);
        child.mutation();
        newrockets[i] = new Rocket(child);
      }
      this.rockets = newrockets;
      this.rockets.push(bestRocket);
      populationCounter++;
    } catch (err) {
      console.log("ERROR: ", err);
    }
  }

  this.run = function() {
    this.allStuck = true;
    for (var i = 0; i < this.popSize; i++) {
      if (!this.rockets[i].crashed && !this.rockets[i].completed) {
        this.rockets[i].update();
        this.allStuck = false;
      }
      this.rockets[i].show();
    }
    if (this.allStuck) {
      this.startNewPop();
    }
  }
  this.startNewPop = function() {
    counter = 0
    population.evaluate();
    population.selection();
  }
}

function DNA(genes) {
  if (genes) {
    this.gene = genes;
  } else {
    this.gene = []
    for (var i = 0; i < timeToLive; i++) {
      this.gene.push(p5.Vector.random2D());
      this.gene[i].setMag(magnitude);
    }
  }

  this.crossover = function(partner) {
    var newgenes = [];
    var mid = floor(random(this.gene.length));
    for (var i = 0; i < this.gene.length; i++) {
      if (i > mid) {
        newgenes[i] = this.gene[i];
      } else {
        newgenes[i] = partner.gene[i];
      }


    }
    return new DNA(newgenes);
  }

  this.mutation = function() {
    for (var i = 0; i < this.gene.length; i++) {
      this.mutationRate = 0.02;
      if (oneCompleted) {
        this.mutationRate = 0.01;
      }
      if (random(1) < this.mutationRate) {
        this.gene[i] = p5.Vector.random2D();
        this.gene[i].setMag(magnitude);
      }
    }
  }
}

function Rocket(dna) {
  //this.vel = createVector(0,-1);
  this.vel = createVector();
  this.pos = createVector(width / 2, height - 50);
  this.acc = createVector();
  this.completed = false;
  this.crashed = false;
  this.time = timeToLive;
  this.best = false;

  this.minDistance = 1000000;

  if (dna) {
    this.dna = dna;
  } else {
    this.dna = new DNA();
  }
  this.count = 0;
  this.fitness = 0;

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.update = function() {
    if (this.time > -1) {
      this.time--;
    }

    var d = dist(this.pos.x, this.pos.y, target.x, target.y);

    if (d < 16) {
      this.completed = true;
      oneCompleted = true;
      this.pos = target.copy();
    }

    for (var i = 0; i < shapes.length; i++) {
      if (this.pos.x > shapes[i].rx && this.pos.x < shapes[i].rx + shapes[i].rw &&
        this.pos.y > shapes[i].ry && this.pos.y < shapes[i].ry + shapes[i].rh) {
        this.crashed = true;
      }
    }


    if (this.pos.y < 0 || this.pos.y > height || this.pos.x < 0 || this.pos.x > width) {
      this.crashed = true;
      this.time = -1;
    }


    this.applyForce(this.dna.gene[this.count]);
    this.count++;
    if (!this.completed && !this.crashed) {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.vel.limit(4);

      var currDist = dist(this.pos.x, this.pos.y, target.x, target.y);

      if (currDist < this.minDistance) {
        this.minDistance = currDist;
      }

    }
  }

  this.calcFitness = function() {
    var d = dist(this.pos.x, this.pos.y, target.x, target.y); /*this.minDistance*/
    this.fitness = 2 ** map(d, 0, width, height, 0);
    if (this.completed) {
      this.fitness *=(this.time*10);
    }
    if (this.completed) {
      this.fitness *= 30;
      //this.timefit = counter / timeToLive;
      //this.fitness *= this.timefit;
    }
    if (this.crashed) {
      this.fitness *= 0.01;
    }
  }

  this.show = function() {
    push()
    if(this.best){
      fill(255, 0, 0, 150);
    }
    else{
      fill(255, 150);
    }
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading())
    rectMode(CENTER);
    rect(0, 0, 20, 4);
    pop()
  }
}

function Shape(rx, ry, rw, rh) {
  this.rx = rx;
  this.ry = ry;
  this.rw = rw;
  this.rh = rh;



  this.show = function() {
    push()
    fill(255, 150);
    rect(rx, ry, rw, rh)

    pop()
  }
}


function setup() {

  createCanvas(1000, 600);
  rocket = new Rocket();
  bestRocket = new Rocket();
  bestRocket.best = true;
  population = new Population();
  target = createVector(width / 2, 50);
  this.crashed = false;

  var rx = random(1000);
  var ry = random(100, 300);
  var rw = random(500);
  var rh = random(250);

  for (var i = 0; i < 2; i++) {
    var rx = random(1000);
    var ry = random(100, 300);
    var rw = random(500);
    var rh = random(250);
    if (shapes.length > 0) {
      if (rx > shapes[i].rx && rx + rw < shapes[i].rx + shapes[i].rw &&
        ry > shapes[i].ry && ry + rh < shapes[i].ry + shapes[i].rh) {

        this.crashed = true;
      }
      if (!this.crashed) {
        shapes.push(new Shape(rx, ry, rw, rh));
      } else {
        i--;
      }
    } else {
      shapes.push(new Shape(rx, ry, rw, rh));
      i--;
    }

  }


}

function draw() {
  var t0 = performance.now();
  background(125);
  population.run()

  ellipse(target.x, target.y, 16, 16);

  for (var i = 0; i < shapes.length; i++) {
    shapes[i].show();
  }

  counter++;
  if (counter == timeToLive) {
    population.startNewPop();
  }
  text(counter, 30, 40);
  text("Populations: " + populationCounter, 30, 60);

  var t1 = performance.now();

  var ms = (t1 - t0);
  ms = ms / 100;
  runtimeMS += ms % 60;
  runtime = Math.round(runtimeMS)
  text("Runtime: " + runtime + " seconds.", 30, 80)

}
