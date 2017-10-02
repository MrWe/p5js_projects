function Sigmoid() {
  this.points = [];

  this.func = function(x) {
    var val = height / (1 + exp(-1));
    //console.log(val);
    return val;
  }

  this.createPoints = function() {
    for (var i = 0; i < height; i++) {
      var x = i;
      var b = 0 // intercept
      var m = 1 // slope
      var y = map(exp((b + m * x)) / (1 + exp((b + m * x))), 0, 1, 0, height)
      this.points.push(createVector(x,y));
    }

  }

  this.show = function() {
    for (var i = 1; i < this.points.length; i++) {
      var curr = this.points[i];
      var prev = this.points[i - 1];
      stroke(255);
      //strokeWeight(20)
      line(prev.x, prev.y, curr.x, curr.y)
    }
  }
}
