var perceptrons;
var outPercept;
var points;

function setup() {
  createCanvas(500, 500);
  background(50);
  outPercept = new Output();
  perceptrons = [];
  perceptrons.push(new Perceptron());
  perceptrons.push(new Perceptron());
  points = [];
  for (var i = 0; i < 20; i++) {
    points.push(new Point(random(width), random(height)))
  }

}

function draw() {
  frameRate(10);
  for (var i = 0; i < points.length; i++) {
    //for (var j = 0; j < perceptrons.length; j++) {
    if (!points[i].classified) {
      var g1 = perceptrons[0].guess(points[i].x, points[i].y, points[i].label);
      var g2 = perceptrons[1].guess(points[i].x, points[i].y, points[i].label);
      console.log(outPercept.guess(g1, g2));
      if (outPercept.guess(g1, g2) == points[i].label) {
        points[i].classified = true;
      }
    }
    //  }
    points[i].show();
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

  for (var i = 0; i < points.length; i++) {
    for (var j = 0; j < perceptrons.length; j++) {
      perceptrons[j].train(
        outPercept.train(perceptrons[0].guess(points[i].x, points[i].y, points[i].label), perceptrons[1].guess(points[i].x, points[i].y, points[i].label), this.points[i].label
      ));
    }
  }
}

function mousePressed() {
  points.push(new Point(mouseX, mouseY));

}
