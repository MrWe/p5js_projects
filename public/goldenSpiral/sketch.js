var center;
var start;
var atoms = [];

var zoff = 0;

function setup() {
  createCanvas(500, 500);
  background(50);
  center = createVector(width / 2, height / 2);
  start = new Atom(center.x, center.y);
}

function draw() {
  var xchange = start.x;
  var ychange = start.y;
  var goldChange = 0.1;
  var xoff = 0;
  var yoff = 10000000;

  frameRate(10);

  background(50);
  beginShape();
  noFill();
  stroke(255);
  strokeWeight(2);
  for (var i = 0; i <= TWO_PI * 5; i += 0.9) {
    atoms.push(
      new Atom(
        TWO_PI * goldChange * cos(i) + width / 2,
        TWO_PI * goldChange * sin(i) + height / 2
      )
    );
    vertex(
      TWO_PI * random(0, 0.1) * 300 * cos(i) + width / 2,
      TWO_PI * random(0, 0.1) * 300 * sin(i) + height / 2
    );

    xchange++;
    ychange++;
    goldChange *= 1.04;
  }
  endShape();
  zoff += 0.01;
  xoff += 0.01;
  yoff += 0.01;
  /*
  var xchange = start.x;
  var ychange = start.y;
  var goldChange = 0.1;
  xoff += 0.01;
  yoff += 0.01;
  beginShape();
  noFill()
  stroke(255);
  strokeWeight(2)
  for (var i = 0; i <= TWO_PI * 5; i += 0.1) {
    atoms.push(new Atom(TWO_PI * goldChange * cos(i) + width / 2, TWO_PI * goldChange * sin(i) + height / 2));
    vertex(-(TWO_PI * noise(xoff, yoff) * goldChange * cos(i) + width / 2), -(TWO_PI * noise(xoff, yoff) * goldChange * sin(i) + height / 2));

    xchange++;
    ychange++;
    goldChange *= 1.04;
  }
  endShape()
  for (var i = 0; i < atoms.length; i++) {
    //atoms[i].print();
  }
  */
}
