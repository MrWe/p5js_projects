function Atom(x, y){
  this.x = x;
  this.y = y;

  this.print = function(){
    stroke(255);
    ellipse(this.x, this.y, 5, 5);
  }
}
