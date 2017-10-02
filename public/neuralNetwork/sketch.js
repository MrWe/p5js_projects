var perceptrons;
var outPercept;
var points;

function setup() {
  createCanvas(500, 500);
  background(50);
  outPercept = new Perceptron();
  // perceptrons = [];
  // perceptrons.push(new Perceptron());
  // perceptrons.push(new Perceptron());
  points = [];
  for (var i = 0; i < 100; i++) {
    points.push(new Point(random(width), random(height)))
  }

}

function draw() {
  frameRate(20);
  for (var i = 0; i < points.length; i++) {
    var guess = outPercept.guess([points[i].x, points[i].y]);
    if (guess == points[i].label) {
      points[i].classified = true;
    } else {
      points[i].classified = false;
    }
    points[i].show();
  }
  for (var i = 0; i < points.length; i++) {
    outPercept.train([
      points[i].x, points[i].y
    ], points[i].label);
  }

  line(0, 0, width, height);
}

function keyPressed() {
  // var done = false;
  //
  // while (!done) {
  //   done = true;
  //   for (var i = 0; i < points.length; i++) {
  //     if (!perceptron.train(points[i])) {
  //       done = false;
  //     }
  //   }
  // }
  //

  for (var j = 0; j < 100; j++) {

    for (var i = 0; i < points.length; i++) {
      outPercept.train([
        points[i].x, points[i].y
      ], points[i].label);
    }
  }

}

function mousePressed() {
  points.push(new Point(mouseX, mouseY));

}
