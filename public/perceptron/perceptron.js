function Perceptron() {
  this.weights = [
    random(-0.5, 0.5),
    random(-0.5, 0.5)
  ];
  this.learningRate = 0.1;

  this.activate = function(val) {
    if (val < 0) {
      return -1;
    }
    return 1;
  }

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
      error *= this.learningRate;
      this.updateW(error);
      return guess;
    }
    return 0;

  }

  this.updateW = function(sum) {
    for (var i = 0; i < this.weights.length; i++) {
      this.weights[i] -= sum + random(-0.1, 0.1);
    }
  }
}
