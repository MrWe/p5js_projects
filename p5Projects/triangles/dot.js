class Dot {
  constructor(x,y,r,velX,velY,opacity) {
    this.pos = createVector(x,y);
    this.vel = createVector(velX,velY);
    this.r = r;
    this.opacity = opacity;
  }

  dist(other){
    if(other != null){
      var a = this.pos.x - other.x;
      var b = this.pos.y - other.y;
      return Math.sqrt( a*a + b*b );
    }
  }

  show(){
    fill(50,this.opacity)
    noStroke()
    ellipse(this.pos.x,this.pos.y,this.r)
  }

  move(){
    this.pos.add(this.vel);
  }
}