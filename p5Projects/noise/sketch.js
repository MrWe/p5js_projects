let r = 200;

let zoff = 0;
let slider;

let min = 70;
let max = 130;
function setup() {
  createCanvas(600, 600);
  background(0);
  slider = createSlider(0, 20);
}

function draw() {
  background(0, 10);
  beginShape();
  translate(width / 2, height / 2);
  noFill();
  stroke(255);
  for (let index = 0; index < TWO_PI; index += 0.005) {
    let xoff = map(cos(index), -1, 1, 0, 2);
    let yoff = map(sin(index), -1, 1, 0, 2);
    let r = map(noise(xoff, yoff, zoff), 0, 1, 100, 200);

    let x = r * cos(index);
    //let y = r * sin(index);
    let y = r * sin(index * slider.value());

    vertex(x, y);
  }

  zoff += 0.01;

  endShape();
}
