class PheromoneMatrix {
  constructor(citites, initPheromoneValue) {

    this.p = 0.1;
    this.max = 2;
    this.min = 0.01;

    this.matrix = Array(cities.length)
      .fill()
      .map(() => Array(cities.length)
        .fill(initPheromoneValue));
  }

  get(i, j) {
    return this.matrix[i][j];
  }

  evaporate(){
    this.matrix = this.matrix.map(x => x.map(y => y > this.min ? y * (1-this.p) : y));
  }

  updateSingle(i, j, value){
    if(this.matrix[i][j] < this.max){
      this.matrix[i][j] += value;
    }
  }
}