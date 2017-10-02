var sigmoid;

function setup(){
  createCanvas(500,500);
  sigmoid = new Sigmoid();
  sigmoid.createPoints();

}

function draw(){
  background(50);
  push()
  //translate(width/2);
  sigmoid.show();
  pop()
}
