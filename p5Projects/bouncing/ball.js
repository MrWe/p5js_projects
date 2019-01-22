class Ball {
  constructor(x, y, speed) {
    this.speed = speed;
    /*
        Create random direction and speed of ball
    */
    this.vel = createVector(cos(random(0, speed)), sin(random(0, speed)));
    if (random(0, 1) < 0.5) {
      this.vel.mult(-1);
    }
    this.pos = createVector(x, y);
  }

  /*
        Bounce on wall hit
    */
  update() {
    if (this.pos.x < 1 || this.pos.x > width) {
      this.vel.x *= -1;
    }
    if (this.pos.y < 1 || this.pos.y > height) {
      this.vel.y *= -1;
    }

    /*
        Add velocity to position to make the ball move.
    */
    this.pos.sub(this.vel);
  }

  show() {
    stroke(238, 18, 246, 50);
    fill(238, 18, 246, 50);
    ellipse(this.pos.x, this.pos.y, 15, 15);
  }
}
