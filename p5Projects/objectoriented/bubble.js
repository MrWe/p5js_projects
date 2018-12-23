class Bubble {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
  }
  
  show(){
    ellipse(this.x, this.y, this.w);
  }
}