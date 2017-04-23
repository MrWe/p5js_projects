var atoms = [];
var numPoints = 100;
var time = 0;

var numNoisesSquares = 100;
var noises = [];

var inc = 0.1;
var zoff = 0;
var p;

function setup() {
  createCanvas(1700,1000);

  for (var i = 0; i < numPoints; i++) {
    var atom = new Atom(random(height), random(width));
    atoms.push(atom);
  }

  noises = new Array(numNoisesSquares);
  for (var i = 0; i < numNoisesSquares; i++) {
    noises[i] = new Array(numNoisesSquares);
  }

  background(255);
}


function draw() {
  var yoff = 1000000;
  var xoff = 0;
  for (var i = 0; i < noises.length; i++) {
    xoff = 0;
    for (var j = 0; j < noises[i].length; j++) {
      xoff += inc;
      var n = noise(xoff, yoff, zoff) * TWO_PI;
      var v = p5.Vector.fromAngle(n);
      noises[i][j] = v;
      /*push()
      stroke(0);
      strokeWeight(2)

      translate(numNoisesSquares*j, numNoisesSquares*i)
      rotate(v.heading());
      line(0,0,numNoisesSquares,0);
      pop()*/
      //getVector(floor(width/numNoisesSquares*i), floor(height/numNoisesSquares*j), floor(width/numNoisesSquares), floor(height/numNoisesSquares));
    }
    yoff += inc;
  }
  zoff += 0.01;


  for (var i = 0; i < atoms.length; i++) {
    atoms[i].show();
    atoms[i].edge();
    atoms[i].update(noises, numNoisesSquares);

  }
}
