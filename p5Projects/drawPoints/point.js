class Point {
  constructor(target) {
    this.pos = createVector(
      floor(random(-1, 2)) * windowWidth,
      floor(random(-1, 2)) * windowHeight
    );
    this.target = target;
    this.finished = false;
    this.vel = createVector();
    this.acc = createVector();
    this.r = random(2, 5);
  }

  update() {
    if (this.finished) {
      return;
    }
    if (dist(this.pos.x, this.pos.y, this.target.x, this.target.y) < this.r) {
      this.finished = true;
    }
    let dir = this.pos.copy().sub(this.target);

    dir.mult(0.05);

    this.pos.sub(dir);
  }

  show() {
    noStroke();
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.r);
  }
}
