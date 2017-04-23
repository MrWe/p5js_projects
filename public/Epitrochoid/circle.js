function circle(x, y, r, isC2) {
  this.x = x;
  this.y = y;
  this.time = 0;
  this.r = r;
  if (isC2) {
    this.line = createVector(this.x, this.y);
    this.line.setMag(this.r / 4);
    this.points = [];
  }


  this.update = function() {

    //circle move
    this.time += 0.01;
    this.x = (r + r / 2) * cos(this.time * PI) + width / 2;
    this.y = (r + r / 2) * sin(this.time * PI) + height / 2;

    //line move
    this.line.x = (c1r + c2r) * cos(this.time * 5) - (c2r / 4) * cos(((c1r + c2r) / c2r) * this.time * 5);
    this.line.y = (c1r + c2r) * sin(this.time * 5) - (c2r / 4) * sin(((c1r + c2r) / c2r) * this.time * 5);
    this.line.setMag(this.r / 4);

    this.points.push([this.line.x, this.line.y]);

  }


  this.show = function(x, y) {
    push()
    translate(this.x, this.y);
    //translate(this.transx, this.transy);
    noFill();
    ellipse(0, 0, r, r);
    if (isC2) {
      line(0, 0, this.line.x, this.line.y);
    }
    pop();
    push()
    if (isC2) {
      beginShape();
      for (var i = 0; i < this.points.length; i++) {
        vertex(this.points[i][0], this.points[i][1])
      }
      endShape();
    }
    pop();

  }
}
