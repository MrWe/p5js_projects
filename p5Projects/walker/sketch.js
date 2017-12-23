let result;
let start;
let i = 0;
let size = 15;

let moves = {
  "north": [
    0, -1
  ],
  "east": [
    1, 0
  ],
  "south": [
    0, 1
  ],
  "west": [-1, 0]
};

function preload() {
  result = loadStrings('data.txt');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  start = createVector(width / 2.2, height / 2)
}

function draw() {
  if (i < result.length - 1) {
    for (let j = 0; j < parseInt(result[i].split(",")[0]); j++) {
      curr_move = moves[result[i].split(",")[1].trim()];
      start.add(createVector(curr_move[0] * size,curr_move[1] * size))
      fill(0);
      //if(i > 55){fill(255,255,0)}
      text("Na", start.x, start.y, start.x+10, start.y+10)
      //ellipse(start.x, start.y, size, size);
    }
    i++;
  }
}