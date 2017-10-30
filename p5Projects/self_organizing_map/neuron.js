class Neuron {
  constructor(weights) {
    this.weights = weights;
    this.neighbours = [];
  }

  show(){
    fill(51);
    stroke(255);
    strokeWeight(2);
    ellipse(this.weights.x,this.weights.y,10,10)
    for (var n in this.neighbours) {
      line(this.weights.x,this.weights.y,this.neighbours[n].weights.x,this.neighbours[n].weights.y)
    }
  }

  distance_to(point){
    return dist(this.weights.x,this.weights.y,point.x,point.y);
  }

  add_neighbour(neuron){
    for (var i = 0; i < this.neighbours.length; i++) {
      if(this.neighbours[i] === neuron){
        return;
      }
    }
    this.neighbours.push(neuron);
    if(this.neighbours.length === 3){
      this.neighbours.splice(0,1);
    }

  }
}