let num_points = 200;
let balls = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 0, 0);
  colorMode(HSB);
  translate(width / 2, height / 2);
  create_new_balls();
}

function draw() {
  background(0, 0, 0, 0.05);
  colorMode(HSB);
  translate(width / 2, height / 2);

  for (let ball of balls) {
    ball.update();
    ball.show();
  }
  // if (random() < 0.01) {
  //   create_new_balls();
  // }
}

function create_new_balls() {
  for (let i = 0; i < num_points; i++) {
    let a = i * (TWO_PI / num_points) + random(0, 0.5);
    let r = height / 45;
    let x = r * 16 * pow(sin(a), 3);
    let y = -r * (13 * cos(a) - 5 * cos(2 * a) - 2 * cos(3 * a) - cos(4 * a));
    balls.push(
      new Ball(
        x,
        y,
        random() > 0.5 ? -width / 5 : width / 5,
        random() > 0.5 ? -height / 5 : height / 5,
        round(i / float(num_points / 255))
      )
    );
  }
}
