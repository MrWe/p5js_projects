var mousepressed = false;
var text;
var texts = [];
var btnSubmit;
var btnSaveImg;
var points;
var imageToReplicate;
var numFilters = 10;
var filters;
var filterSize = 5;


function preload() {
  randomSeed(1); //DEBUG
  try {
    imageToReplicate = loadJSON('points.json');
  } catch (err) {
    console.log(err)
  };

}

function setup() {

  createCanvas(100, 50);
  background(50);
  btnSubmit = createButton('submit');
  btnSubmit.position(width / 2 + 50, 500);
  btnSubmit.mousePressed(imageToNumbers);
  btnSaveImg = createButton('Save Image');
  btnSaveImg.position(width / 2 - 50, 500);
  btnSaveImg.mousePressed(saveImage);
  imageToReplicate = imageToReplicate['points'];
  if (imageToReplicate) {
    createFilters();
  }

}

function createFilters() {
  var filt = [];
  for (var i = 0; i < numFilters; i++) {

    var x = floor(random() * imageToReplicate.length);
    var y = floor(random() * imageToReplicate.length);
    var hasOne = false;
    var temp = [];
    var index = 0;
    for (var j = x; j <= filterSize + x - 1; j++) {
      temp.push([]);
      for (var k = y; k <= filterSize + y - 1; k++) {
        if (j < imageToReplicate.length && k < imageToReplicate.length) {
          temp[index].push(imageToReplicate[j][k]);
        }
      }
      index++;
    }

    filt.push(temp);
  }
  filters = filt;
}

function draw() {
  if (mousepressed) {
    text.addPoint(createVector(mouseX, mouseY));
    text.show();
    for (var i = 0; i < texts.length; i++) {
      texts[i].show();
    }
  }
}

function filterImage(){
  for (var i = 0; i < filters.length; i++) {
    filters[i]
  }
}

function imageToNumbers() {
  points = [];
  for (var i = 0; i < height; i++) {
    points.push([]);
    for (var j = 0; j < width / 2; j++) {
      if (get(i, j)[0] === 255) {
        points[i].push(1);
      } else {
        points[i].push(-1);
      }
    }
  }
}

function saveImage() {
  imageToNumbers();
  saveJSON({
    points
  }, 'points.json');
}

function scaleDownImage() {}

function mousePressed() {
  mousepressed = true;
  text = new Text();
}

function mouseReleased() {
  mousepressed = false;
  texts.push(text);
}
