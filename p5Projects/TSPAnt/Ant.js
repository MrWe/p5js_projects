class Ant {
  constructor(cities, alpha, beta, pheromoneMatrix, distanceMatrix) {
    this.notVisited = cities.slice(1);
    this.currentCity = cities[0];
    this.path = [this.currentCity]
    this.cities = cities;
    this.alpha = alpha;
    this.beta = beta;
    this.pheromoneMatrix = pheromoneMatrix;
    this.distanceMatrix = distanceMatrix;
    this.distance;
  }

  heuristic(c1, c2) {
    return 1 / this.distanceMatrix.get(c1.index, c2.index);
  }

  probGoToNextFromC1(c1, c2) {
    if (this.notVisited.indexOf(c2) == -1) {
      return 0;
    }

    let pheromone = this.pheromoneMatrix.get(c1.index, c2.index) ** this.alpha;
    let heur = this.heuristic(this.cities[c1.index], this.cities[c2.index]) ** this.beta;
    //console.log(pheromone + " -- " + heur);


    let notVisitedVal = 0;
    for (let i = 0; i < this.notVisited.length; i++) {
      let h = this.notVisited[i];
      if (h.index == c1.index) {
        continue;
      }
      let currP = this.pheromoneMatrix.get(c1.index, h.index) ** this.alpha;
      let currH = this.heuristic(this.cities[c1.index], this.cities[h.index]) ** this.beta;

      notVisitedVal += currP * currH;
    }
    return (pheromone * heur) / notVisitedVal;
  }

  createPath() {
    while (this.notVisited.length > 0) {
      let bestCity;
      let bestCityValue = -1;
      let index = 0;

      for (let i = 0; i < this.notVisited.length; i++) {
      let notVisitedCity = this.notVisited[i];
      let currProb = this.probGoToNextFromC1(this.currentCity, notVisitedCity);
        if (currProb > bestCityValue) {
          bestCity = notVisitedCity;
          bestCityValue = currProb;
          index = i;
        }
      }
      if(random() < 0.9){
        this.notVisited.splice(index, 1);
        this.path.push(bestCity);
        this.currentCity = bestCity;
      }
      else{
        let rand = floor(random(0, this.notVisited.length));
        this.path.push(this.notVisited[rand]);
        this.currentCity = this.notVisited[rand];
        this.notVisited.splice(rand, 1);
      }
    }

    return this.path;
  }

  setDistance(distance){
    this.distance = distance;
  }


  show(){
    for (var i = 0; i < this.path.length-1; i++) {
      stroke(255);
      strokeWeight(2);
      line(this.path[i].x, this.path[i].y, this.path[i+1].x, this.path[i+1].y);
    }
    line(this.path[0].x, this.path[0].y, this.path[this.path.length-1].x, this.path[this.path.length-1].y);
  }

}