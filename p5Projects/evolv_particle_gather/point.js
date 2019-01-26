class Point {
  constructor(parent, start_pos, stop_pos, direction) {
    this.parent = parent;
    this.pos = start_pos.copy();
    this.stop_pos = stop_pos.copy();
    this.direction = direction;
  }

  update(elements) {
    this.pos.add(this.direction);
  }

  show() {
    print(this.pos);
    push();
    fill(255);
    strokeWeight(0);
    ellipse(this.pos.x, this.pos.y, 5);
    pop();
  }
}
