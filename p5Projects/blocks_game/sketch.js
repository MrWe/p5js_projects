const {
  Engine,
  World,
  Composites,
  Bodies,
  Mouse,
  MouseConstraint,
  Constraint
} = Matter;

let size = 20;
let world, engine;
let blocks = [];
let mConstraint;
let mouseArea;
let sling;
function setup() {
  let canvas = createCanvas(600, 400);

  mouseArea = new MouseArea(50, 50, 100, 200);

  engine = Engine.create();
  world = engine.world;

  sling = new Sling(0, 0, 20);
  // add mouse control
  var mouse = Mouse.create(canvas.elt),
    mConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.3,
        render: {
          visible: false
        }
      }
    });
  mouse.pixelRatio = pixelDensity();
  World.add(world, mConstraint);

  blocks.push(new StaticBlock(400, 200, 200, 20));

  for (let i = 1; i < 10; i++) {
    for (let j = 0; j < 5; j++) {
      blocks.push(
        new DynamicBlock(
          size * 10 * 1.5 + i * size - 1,
          100 + j * size,
          size + 1,
          size
        )
      );
    }
  }
}

function draw() {
  background(200);
  Engine.update(engine);
  for (let i = blocks.length - 1; i > -1; i--) {
    let block = blocks[i];
    block.show();
    if (block.remove()) {
      blocks.splice(i, 1);
    }
  }
  mouseArea.show();
  if (sling) {
    sling.show();
  }
}

function mousePressed() {
  if (mouseArea.contains(mouseX, mouseY)) {
    if (sling.sling.bodyB === null) {
      sling.resetBody(mouseX, mouseY);
    } else {
      sling.fly();
    }
  }
}

function mouseReleased() {
  sling.fly();
}
