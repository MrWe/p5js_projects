var nodes = [];
var mousePos;
var mouseIsPressed = false;
var keyIsPressed = false;
var direction;
var directionSpeed = 200;


function setup() {
  createCanvas(windowWidth, windowHeight);
  direction = createVector(0, 0);

  $.getJSON("relations.json", function(json) {
    for (var key in json) {
      var currName = key.substring(key.lastIndexOf('/') + 1, key.length);
      var currChildren = json[key];
      var substrings = [];
      for (var i = 0; i < currChildren.length; i++) {
        var currChild = currChildren[i];
        currChild = currChild.substring(currChild.lastIndexOf('/') + 1, currChild.length);
        //nodes.push(new Node(currChild, []));
        substrings.push(currChild);
      }
      nodes.push(new Node(currName, substrings));
    }
  });
}

function draw() {
  frameRate(10);
  mousePos = createVector(mouseX, mouseY);
  background(255);
  if (nodes[0]) {
    for (var i = 0; i < nodes.length; i++) {
      if (mouseIsPressed) {
        nodes[i].moveNode();
      }
      for (var j = 0; j < nodes.length; j++) {
        if (nodes[i].children.includes(nodes[j].name)) {
          nodes[i].paintRelation(nodes[j]);
        }
      }
      nodes[i].show();
      if (keyIsPressed) {
        nodes[i].pos.add(direction);
      }
    }
  }
}


function mousePressed() {
  mouseIsPressed = true;
}


function mouseReleased() {
  mouseIsPressed = false;
}

function keyPressed(key) {

  if (key.key === "ArrowUp") {
    direction.add(0, directionSpeed)
  } else if (key.key === "ArrowDown") {
    direction.sub(0, directionSpeed)
  } else if (key.key === "ArrowRight") {
    direction.add(-directionSpeed, 0)
  } else if (key.key === "ArrowLeft") {
    direction.sub(-directionSpeed, 0)
  }
  keyIsPressed = true;
}

function keyReleased() {
  direction.mult(0);
  keyIsPressed = false;
}
