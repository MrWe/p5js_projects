const numCities = 36;
const numAnts = 300;
const initPheromoneValue = 0.1;
const alpha = 0.5;
const beta = 0.3;
let cities = [];
let pheromoneMatrix;
let distanceMatrix;
let alltimeBest;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < numCities; i++) {
    cities.push(new City(random(0, width), random(0, height), i));
  }
  pheromoneMatrix = new PheromoneMatrix(cities, initPheromoneValue);
  distanceMatrix = new DistanceMatrix(cities);
}

function draw() {
  background(0);

  for (var N = 0; N < 10; N++) {
    let ants = [];
    for (var i = 0; i < numAnts; i++) {

      cities = ESshuffle(cities);

      ants.push(new Ant(cities, alpha, beta, pheromoneMatrix, distanceMatrix));
      ants[i].createPath();
    }

    let bestAnt = getBestAnt(ants);
    if (alltimeBest == undefined || bestAnt.distance < alltimeBest.distance) {
      alltimeBest = bestAnt;
    }

    updatePheromone(bestAnt, 0.0005);
  }

  for (let city of cities) {
    city.show();
  }
  alltimeBest.show();
}

function antLength(ant) {
  let distance = 0;
  for (let i = 0; i < ant.path.length - 1; i++) {
    //distance += dist(ant.path[i].x, ant.path[i].y, ant.path[i+1].x, ant.path[i+1].y);
    distance += distanceMatrix.get(ant.path[i].index, ant.path[i + 1].index);
  }
  //distance += dist(ant.path[0].x, ant.path[0].y, ant.path[ant.path.length-1].x, ant.path[ant.path.length-1].y);
  distance += distanceMatrix.get(ant.path[0].index, ant.path[ant.path.length - 1].index);
  ant.setDistance(distance);
  return distance;
}

function getBestAnt(ants) {
  let bestAnt;
  let bestPathLength = Infinity;

  for (let ant of ants) {
    let currDist = antLength(ant);
    if (currDist < bestPathLength) {
      bestPathLength = currDist;
      bestAnt = ant;
    }
  }

  return bestAnt;
}

function updatePheromone(bestAnt, decay) {
  pheromoneMatrix.evaporate();
  for (var i = 0; i < bestAnt.path.length - 1; i++) {
    pheromoneMatrix.(bestAnt.path[i].index, bestAnt.path[i + 1].index, bestAnt.distance * decay);
  }

}

function ESshuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [
      a[i], a[j]
    ] = [
      a[j], a[i]
    ];
  }
  return a;
}
