function Rect(x,y, size){
  this.x = x;
  this.y = y;
  this.size = size;

  this.show = function(){
    push();
    fill(255);
    stroke(0);
    strokeWeight(2)
    rect(this.x,this.y,this.size,this.size);
    pop();
  }
}
