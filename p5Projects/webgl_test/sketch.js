let angle = 0;
let vert;




function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  vert = _box(50, 50, 50)
}

function draw() {
  background(255);

  ambientLight(255,0,0)
  rotateX(angle);
  rotateY(-angle);

  angle += 0.01
  for(let v of vert){
    translate(v.x,v.y,v.z);
    box(v.x, v.y, v.z)
  }
  for(let v of vert){
    translate(-v.x,-v.y,-v.z);
    box(-v.x, -v.y, -v.z)
  }


}

var _box = function() {
  let faces = [];
  let uvs = [];
  let vertices = [];
  var args = new Array(arguments.length);
  for (var i = 0; i < args.length; ++i) {
    args[i] = arguments[i];
  }

  var width = args[0] || 50;
  var height = args[1] || width;
  var depth = args[2] || width;


  var cubeIndices = [
    [
      0, 4, 2, 6
    ], // -1, 0, 0],// -x
    [
      1, 3, 5, 7
    ], // +1, 0, 0],// +x
    [
      0, 1, 4, 5
    ], // 0, -1, 0],// -y
    [
      2, 6, 3, 7
    ], // 0, +1, 0],// +y
    [
      0, 2, 1, 3
    ], // 0, 0, -1],// -z
    [4, 5, 6, 7] // 0, 0, +1]  +z
  ];
  var id = 0;
  for (var i = 0; i < cubeIndices.length; i++) {
    var cubeIndex = cubeIndices[i];
    var v = i * 4;
    for (var j = 0; j < 4; j++) {
      var d = cubeIndex[j];
      //inspired by lightgl:
      //https://github.com/evanw/lightgl.js
      //octants:https://en.wikipedia.org/wiki/Octant_(solid_geometry)
      var octant = new p5.Vector(((d & 1) * 2 - 1) * width / 2, ((d & 2) - 1) * height / 2, ((d & 4) / 2 - 1) * depth / 2);
      vertices.push(octant);
      uvs.push([
        j & 1,
        (j & 2) / 2
      ]);
      id++;
    }
    faces.push([
      v, v + 1,
      v + 2
    ]);
    faces.push([
      v + 2,
      v + 1,
      v + 3
    ]);
  }

  return vertices;
};