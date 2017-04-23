var c1;
var c2;
var c1r = 200;
var c2r = c1r/2;


function setup(){
  createCanvas(500,500);
  c1 = new circle(width/2, height/2, c1r);
  c2 = new circle(width/2, height/2+c2r+c2r/2, c1r/2, true);
}

function draw(){
  background(255);
  c1.show();
  c2.update();
  c2.show();
}
