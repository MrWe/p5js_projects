var ball;
var mousexyStart;
var mousexyEnd;
var rectSize = 20;
var rects;

function setup() {
  createCanvas(500, 600);
  background(50)
  ball = new Ball(width / 2, height - 10);
  var numRects = floor(width/rectSize);
  var left = (width - (numRects*rectSize));
  console.log(left);

  rects = [];
  for (var i = 0; i < numRects; i++) {
    rects.push(new Rect(i*rectSize + left*i, 80, rectSize));
  }
  //ball.addForce(createVector(-1,-10))
}

function draw() {
  background(50)
  for (var i = 0; i < rects.length; i++) {
    rects[i].show();
  }
  ball.update(rects);
  ball.show();
}

function mousePressed(){
  if(dist(ball.pos.x,ball.pos.y,mouseX,mouseY) < ball.size){
    mousexyStart = createVector(mouseX,mouseY);
  }
  else{
    mousexyStart = null;
  }
}

function mouseReleased(){
  if(mousexyStart !== null){
    mousexyEnd = createVector(mouseX,mouseY);
    ball.addForce(mousexyStart.sub(mousexyEnd));
  }
  else{
    mousexyEnd = null;
  }
}
