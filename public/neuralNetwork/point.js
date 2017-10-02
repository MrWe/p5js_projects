function Point(x,y){
  this.x = x;
  this.y = y;

  if(x >= y){
    this.label = 1;
  }
  else{
    this.label = -1;
  }

  this.classified = false;

  this.show = function(){
    push()
    stroke(0);
    strokeWeight(2);
    if(this.classified){
      if(this.label == 1){
        fill(255,0,0);
      }
      else{
        fill(0,255,0);
      }
    }
    else{
      fill(255);
    }
    ellipse(x,y,10,10);
    pop()
  }
}
