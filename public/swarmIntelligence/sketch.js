var swarm = [];
var xoff = 0;
var yoff = 100000;
var zoff = 0;
function setup() {
  createCanvas(1000, 800);

  for (var i = 0; i < 200; i++) {
    swarm.push(new Individual());
  }

}

function draw() {
  background(50);
  xoff = 0;
  yoff++;
  for (var i = 0; i < swarm.length; i++) {
    xoff++;
    var n = noise(xoff, yoff, zoff) * random(TWO_PI * 4);
    var v = p5.Vector.fromAngle(n);
    swarm[i].update(v, swarm);
    //swarm[i].boundaries();
    //swarm[i].genForce(swarm);
    swarm[i].show();
  }
  zoff++;
}
