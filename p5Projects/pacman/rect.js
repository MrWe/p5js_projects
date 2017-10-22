var constants;


function Rect(x,y){
  constants = new Constants();
  this.pos = createVector(x,y);
  this.color = color(0);

  this.show = function(){
    push();
    fill(this.color);
    stroke(0);
    rect(this.pos.x, this.pos.y, constants.rectSize, constants.rectSize);
    pop();
  }
}
