let start;
let p = [0.01, 0.85, 0.07, 0.07];
let funcs = [f1, f2, f3, f4];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  start = createVector(0, 0);

}

function draw() {

  translate(width / 2, height);
  rotate(160.2);
  for (let n = 0; n < 200; n++) {
    start = start.mult(0.855);
    let previous = createVector(start.x, start.y);
    fill(255);
    noStroke();

    //start.mult(0.82);
    ellipse(start.x, start.y, 2);

    let r = random();

    let psum = 0;
    for (let i = 0; i < p.length; i++) {
      psum += p[i];
      if (r <= psum) {
        start = funcs[i](start);
        break;
      }
    }

    stroke(255);
    strokeWeight(1);
    line(start.x, start.y, previous.x, previous.y);
  }

}

function f1(v) {
  let x = 0;
  let y = (0.16 * v.y) + v.y;
  return createVector(x, y);
}

function f2(v) {
  let x = ((0.85 * v.x) + (0.04 * v.y)) + v.x;
  let y = (((-0.04 * v.x) + (0.85 * v.y)) + 1.6) + v.y;
  return createVector(x, y);
}

function f3(v) {
  let x = ((0.2 * v.x) - (0.26 * v.y)) + v.x;
  let y = (((0.23 * v.x) + (0.22 * v.y)) + 1.6) + v.y;
  return createVector(x, y);
}

function f4(v) {
  let x = ((-0.15 * v.x) + (0.28 * v.y)) + v.x;
  let y = (((0.26 * v.x) + (0.24 * v.y)) + 0.44) + v.y;
  return createVector(x, y);
}
