var rects = [];
var counter = 0;
var timer = 0;


function setup() {
  createCanvas(1000,1000);


  c = new circle();
}
function draw(){
  background(0);
  push()
  noFill();
  stroke(255);
  ellipse(width/2,height/2,10,10)
  pop();
  if(dist(c.pos.x, c.pos.y, width/2, height/2) < 10){
    counter++;
    console.log(counter);
  }
  c.update();
  c.show();
  c.edges();

  if(timer > 1000){
    console.log("TIMER")
    noLoop();
  }
  timer++;


}

function keyPressed() {
  c.updateForce();
}
