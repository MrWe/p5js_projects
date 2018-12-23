class Circle {
  constructor(x, y) {
    this.pos = createVector(x,y);
    this.vel = createVector();
    this.direction = createVector(width/2, height/2).sub(this.pos).mult(-1);
    this.direction = this.direction.setMag(5)
  }

  update(){
    this.pos.sub(this.direction);
  }

  show(){
    fill(255);
    ellipse(this.pos.x, this.pos.y, 20);
  }
}
