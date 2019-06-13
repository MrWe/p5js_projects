class MouseArea {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  contains(x, y) {
    return (
      x >= this.x && x <= this.x + this.w && y >= this.y && y <= this.y + this.h
    );
  }

  show() {
    push();
    fill(50, 50);
    noStroke();
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}
