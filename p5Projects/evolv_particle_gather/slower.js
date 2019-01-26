class Slower {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.size = random(10, 200);
    this.speed = random(1, 2);
  }

  mutate() {
    let r = random(0, 3);
    if (r < 0.3) {
      this.pos.add(createVector(random(-0.1, 0.1), random(-0.1, 0.1)));
    } else if (r < 0.6) {
      this.size += random(-10, 10);
    } else if (r < 1) {
      this.speed += random(-0.1, 0.1);
    }
  }

  show() {
    push();
    noFill();
    stroke(100, 100, 200);
    strokeWeight(2);
    ellipse(this.pos.x, this.pos.y, this.size);
    pop();
  }

  copy() {
    return JSON.parse(JSON.stringify(this));
  }
}
