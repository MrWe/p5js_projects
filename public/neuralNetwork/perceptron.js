function Perceptron() {
  this.weights = [
    random(-1, 1),
    random(-1, 1)
  ];
  this.learningRate = 0.01;

  this.activate = function(val) {
    if (val > 0)
      return 1;
    else
      return -1;
    }

  this.guess = function(input) {
    var sum = 0;

    for (var i = 0; i < input.length; i++) {
      sum += input[i] + this.weights[i];
    }
    return this.activate(sum);
  }

  this.train = function(input, label) {
    var guess = this.guess(input);
    var err = label - guess;

    for (var i = 0; i < this.weights.length; i++) {
      map(input[i], 0, height, 0, 1);
      this.weights[i] -= this.learningRate * err * input[i];
    }
    console.log(this.weights);
  }

}
