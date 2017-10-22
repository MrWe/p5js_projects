var numRects;
var rects = [];
var player;
var mousePressCounter = 0;

function setup() {
	createCanvas(500, 500);
	background(255);
  constants = new Constants();
  numRects = constants.numRects;
  //rects
  rects = new Array(numRects);

  for (var i = 0; i < rects.length; i++) {
    rects[i] = new Array(numRects);
  }

  for (var i = 0; i < rects.length; i++) {
    for (var j = 0; j < rects[i].length; j++) {
      rects[i][j] = new Rect((width / numRects * j)-1, (height / numRects * i)-1);
    }
  }

  var name = Math.random()
    .toString(36)
    .substring(7);
  player = new Player(width / numRects * floor(random(numRects)), height / numRects * floor(random(numRects)), name);

}

function draw() {
  mousePressCounter++;
  for (var i = 0; i < rects.length; i++) {
    for (var j = 0; j < rects[i].length; j++) {
      rects[i][j].show();
    }
  }
  player.show();
  player.update(rects);
}


function keyPressed(key) {
  if (mousePressCounter > 0) {
    if (key.key === "ArrowUp") {
      player.dir(0, -1);
    } else if (key.key === "ArrowDown") {
      player.dir(0, 1);
    } else if (key.key === "ArrowRight") {
      player.dir(1, 0);
    } else if (key.key === "ArrowLeft") {
      player.dir(-1, 0);
    }
    mousePressCounter = 0;
  }

  return false;
}