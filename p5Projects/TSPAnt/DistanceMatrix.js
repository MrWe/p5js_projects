class DistanceMatrix {
  constructor(cities) {
    this.matrix = Array(cities.length)
      .fill()
      .map(() => Array(cities.length)
        .fill(initPheromoneValue));


    for (let i = 0; i < cities.length; i++) {
      for (let j = 0; j < cities.length; j++) {
        this.matrix[cities[i].index][cities[j].index] = dist(cities[i].x, cities[i].y, cities[j].x, cities[j].y);
      }
    }
  }

  get(i, j){
    return this.matrix[i][j];
  }
}