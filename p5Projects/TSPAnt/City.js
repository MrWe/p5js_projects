class City {
  constructor(x, y, index) {
    this.x = x;
    this.y = y;
    this.index = index;
    this.r = 5;
  }

  show() {
    fill(255);
    ellipse(this.x, this.y, this.r);
  }
}