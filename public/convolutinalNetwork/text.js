function Text() {
  this.points = [];

  this.addPoint = function(point) {
    if (point.x <= width / 2) {
      this.points.push(point);
    } else {
      this.points.push(null);
    }
  }

  this.show = function() {
    for (var i = 1; i < this.points.length; i++) {
      var prev = this.points[i - 1];
      var curr = this.points[i];
      if (prev != null && curr != null) {
        push()
        stroke(255);
        strokeWeight(2);
        line(prev.x, prev.y, curr.x, curr.y);
        pop()
      }
    }
  }
}
