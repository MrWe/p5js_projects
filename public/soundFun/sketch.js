var mic;
function setup() {
  mic = new p5.AudioIn()
  mic.start();
  createCanvas(500,500)

}

function draw() {
  background(0);
  var y = mic.getLevel()
  y = map(y, 0, 1, 300, 400);
  push();
  fill(255,255,0)
  ellipse(height/2,width/2,y,y);
  pop();
  push();
  fill(0);
  ellipse(200,200,80,80);
  pop();
  push();
  fill(0);
  ellipse(300,200,80,80);
  pop();
  var x = mic.getLevel()
  x = map(x, 0, 1, 1, 800);
  push();
  fill(0);
  ellipse(width/2,320,200,x);
  pop();

}
