let matrix = [];
const size = 2;
const point_size = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 2 ** size + 1; i++) {
    let row = [];
    for (let j = 0; j < 2 ** size + 1; j++) {
      row.push(random(-1, 1));
    }
    matrix.push(row);
  }

  print(matrix);
}

function draw() {
  background(0);

  //diamond algorithm
  square_queue = [];
  current_square = [];
  current_square.push([0, 0]);
  current_square.push([0, matrix.length - 1]);
  current_square.push([matrix.length - 1, matrix.length - 1]);
  current_square.push([matrix.length - 1, 0]);

  current_diamond = diamond_step(current_square);
  square_step(current_square, current_diamond);

  noLoop();

  translate(
    width / 2 - (matrix.length * point_size) / 2,
    height / 2 - (matrix.length * point_size) / 2
  );
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      fill(255);
      noStroke();
      ellipse(i * point_size, j * point_size, 5, 5);
    }
  }
}

function square_step(square, diamond_point) {
  let square_points = [];

  let square_x = (square[0][0] + square[1][0]) / 2;
  let square_y = (square[0][1] + square[1][1]) / 2;
  square_points.push([square_x, square_y]);

  square_x = (square[1][0] + square[2][0]) / 2;
  square_y = (square[1][1] + square[2][1]) / 2;
  square_points.push([square_x, square_y]);

  square_x = (square[2][0] + square[3][0]) / 2;
  square_y = (square[2][1] + square[3][1]) / 2;
  square_points.push([square_x, square_y]);

  square_x = (square[3][0] + square[0][0]) / 2;
  square_y = (square[3][1] + square[0][1]) / 2;
  square_points.push([square_x, square_y]);

  print(square_points);
}

function diamond_step(square) {
  let diamond_x = (square[0][0] + square[3][0]) / 2;
  let diamond_y = (square[0][1] + square[3][1]) / 2;

  let sum = 0;
  for (dot of square) {
    let i = dot[0];
    let j = dot[1];
    sum += matrix[i][j];
  }
  sum /= 4;
  matrix[diamond_x][diamond_y] = sum + random(-0.1, 0.1);

  return [diamond_x, diamond_y];
}
