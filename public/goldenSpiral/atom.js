function Atom(x, y) {
  this.x = x;
  this.y = y;

  this.print = function() {
    stroke(0, 255, 0);
    ellipse(this.x, this.y, 5, 5);
  };
}
