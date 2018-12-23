let rectangle;
let rectSize = 500;
let circleR = 50;

let circles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectangle = new Rectangle(width/4, height/4, rectSize, rectSize);
}

function draw() {
  background(0);
  fill(255);
  //ellipse(mouseX, mouseY, circleR);
  //
  for(circle of circles){
    if(intersects(circle.pos.x, circle.pos.y, 20, rectangle)){

    }
    circle.update();
    circle.show();
  }

  rectangle.show();
}

function intersects(ellipseX, ellipseY, ellipseR, rectangle) {
  if (rectangle.intersectsCircle(ellipseX, ellipseY, ellipseR)) {
    rectangle.paintRed = true;
  } else {
    rectangle.paintRed = false;
  }
}

function mouseClicked(){
  circles.push(new Circle(mouseX, mouseY));
}
