function Output() {
  this.weights = [
    random(-0.5, 0.5),
    random(-0.5, 0.5)
  ];
  this.learningRate = 0.1;

  this.activate = function(x) {
    //console.log(1/(1+(Math.E^(-val))))
    return 1/(1+(Math.E^(-x)));
  }


  // this.sigmoidDeriv = function(x){
  //   return (1/(1+(Math.E^(-x))) * (1-(1/(1+(Math.E^(-x))))));
  // }

  this.guess = function(x, y) {
    var sum = 0;
    for (var i = 0; i < this.weights.length; i++) {
      sum += this.weights[0] * x;
      sum += this.weights[1] * y;
    }
    return this.activate(sum);
  }

  this.train = function(x, y, label) {
    var guess = this.guess(x, y);
    if (guess !== label) {
      var error = (1/2)*(label - guess)^2
      //error *= this.learningRate;
      this.updateW(error);
      return guess;
    }
    return 0;

  }

  this.updateW = function(sum) {
    for (var i = 0; i < this.weights.length; i++) {
      this.weights[i] -= sum;
    }
  }
}
