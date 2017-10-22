let startPoint;
//let min_allowed_dist = 15;
let points;
board = []
const divider = 15;
const time = 2;
let deadPoints = [];
let finished_points = []
let point_size = 5;

function setup() {
  createCanvas(windowWidth, windowWidth);
  points = new Array();
  generatePuzzle();
}

function generatePuzzle() {
  for (var i = 0, len = height / divider; i < len; i++) {
    temp = new Array(Math.floor(width / divider))
    for (var j = 0, len = width / divider; j < len; j++) {
      temp[j] = 0
    }
    board.push(temp);
  }
}

function draw() {
  background(0);
  frameRate(60)

  fill(255)
  stroke(255)
  strokeWeight(1)
  for (let i = points.length - 1; i > -1; i--) {

    //if (points[i].t > 0) {
      //points[i].t--;
      //print(points[i].parent)

      if(points[i].parent){
        line(points[i].x,points[i].y,points[i].parent.x, points[i].parent.y)
      }
      ellipse(points[i].x, points[i].y, points[i].s, points[i].s);
      //if(points.length < 1000){
        addNeighbour(points[i], i)
      //}

      move(points[i], i)

      if(points[i].x < 0 || points[i].x > width || points[i].y < 0 || points[i].y > height){
        points.splice(i, 1);
      }


    // } else {
    //   //points[i].t--;
    //   if (points[i].t < -1) {
    //     let dividedX = floor(points[i].x / divider);
    //     let dividedY = floor(points[i].y / divider);
    //     board[dividedX][dividedY] = 0;
    //     points.splice(i, 1);
    //   }
    //}
  }
  for (let j = finished_points.length - 1; j >= 0; j--) {
    let point = finished_points[j][0];
    if(point.parent){
      line(point.x,point.y,point.parent.x, point.parent.y)
    }
    ellipse(point.x, point.y, point.s, point.s);
  }

  //addRandomPoint();
}

function addRandomPoint() {
  if (random(1) > 0.1) {
    points.push(new Point(random(width), random(height), time, null, point_size));
  }
}

function move(point, index){
  let x = point.x;
  let y = point.y;
  for (var i = 0; i < points.length; i++) {
    if(i == index){continue}
    if(point.dist(x, y, points[i]) < point.min_allowed_dist){
      let dir_x = 0.05 * (points[i].x - x);
      let dir_y = 0.05 * (points[i].y - y);
      point.x -= dir_x;
      point.y -= dir_y;
    }
    // if(point.dist(x, y, point.parent) > point.min_allowed_dist){
    //   let dir_x = 0.0001 * (point.parent.x - x);
    //   let dir_y = 0.0001 * (point.parent.y - y);
    //   point.x -= dir_x;
    //   point.y -= dir_y;
    // }
  }
}

function addNeighbour(point, index) {
  let x = point.x;
  let y = point.y;

  let dividedX = floor(x / divider);
  let dividedY = floor(y / divider);

  is_close = false;

  let newX = random(-divider / point.num_parents, divider / point.num_parents);
  let newy = random(-divider / point.num_parents, divider / point.num_parents);

  for (var i = points.length-1; i >= 0; i--) {
    if(i === index){continue}

    if(point.dist(x + newX*2, y + newy*2, points[i]) < point.min_allowed_dist && x < width
  && x > 0 && y < height && y > 0){
      is_close = true;
    }

  }
  if(!is_close){
    points.push(new Point(x + newX*2, y + newy*2, time, point, point_size, point.num_parents+1, point.min_allowed_dist+4));
    //return true;
  }

  // is_close = false;
  //
  // for (var i = points.length-1; i >= 0; i--) {
  //   if(i == index){continue}
  //   if(point.dist(x - divider, y, points[i]) < min_allowed_dist && x >= -5){
  //     is_close = true;
  //   }
  //
  // }
  // if(!is_close){
  //   points.push(new Point(x - divider, y, time, point, point_size));
  //   //return true;
  // }
  //
  // is_close = false;
  //
  // for (var i = points.length-1; i >= 0; i--) {
  //   if(i == index){continue}
  //   if(point.dist(x, y + divider, points[i]) < min_allowed_dist && y < height){
  //     is_close = true;
  //   }
  //
  // }
  // if(!is_close){
  //   points.push(new Point(x, y + divider, time, point, point_size));
  //   //return true;
  // }
  //
  // is_close = false;
  //
  // for (var i = points.length-1; i >= 0; i--) {
  //   if(i == index){continue}
  //   if(point.dist(x, y - divider, points[i]) < min_allowed_dist ){
  //     is_close = true;
  //   }
  //
  // }
  // if(!is_close){
  //   points.push(new Point(x, y - divider, time, point, point_size));
  //   //return true;
  // }
  //
  // is_close = false;
  // for (var i = points.length-1; i >= 0; i--) {
  //   if(i == index){continue}
  //   if(point.dist(x - divider, y - divider, points[i]) < min_allowed_dist && x > 0 && y > 0){
  //     is_close = true;
  //   }
  //
  // }
  // if(!is_close){
  //   points.push(new Point(x - divider, y - divider, time, point, point_size));
  //   //return true;
  // }
  //
  // is_close = false;
  // for (var i = points.length-1; i >= 0; i--) {
  //   if(i == index){continue}
  //   if(point.dist(x + divider, y + divider, points[i]) < min_allowed_dist && x < width && y < height){
  //     is_close = true;
  //   }
  //
  // }
  // if(!is_close){
  //   points.push(new Point(x + divider, y + divider, time, point, point_size));
  //   //return true;
  // }
  //
  // is_close = false;
  // for (var i = points.length-1; i >= 0; i--) {
  //   if(i == index){continue}
  //   if(point.dist(x - divider, y + divider, points[i]) < min_allowed_dist && x > 0 && y < height){
  //     is_close = true;
  //   }
  //
  // }
  // if(!is_close){
  //   points.push(new Point(x - divider, y + divider, time, point, point_size));
  //   //return true;
  // }
  //
  // is_close = false;
  // for (var i = points.length-1; i >= 0; i--) {
  //   if(i == index){continue}
  //   if(point.dist(x + divider, y - divider, points[i]) < min_allowed_dist && x < width && y > 0){
  //     is_close = true;
  //   }
  //
  // }
  // if(!is_close){
  //   points.push(new Point(x + divider, y - divider, time, point, point_size));
  //   //return true;
  // }



    // if(point.dist(x - divider, y, points[i]) > min_allowed_dist){
    //   points.push(new Point(x - divider, y, time, point, point_size));
    //   //return true;
    // }
    //
    //
    // if(point.dist(x, y + divider, points[i]) > min_allowed_dist){
    //   points.push(new Point(x, y + divider, time, point, point_size));
    //   //return true;
    // }
    //
    //
    // if(point.dist(x, y - divider, points[i]) > min_allowed_dist){
    //   points.push(new Point(x, y - divider, time, point, point_size));
    //   //return true;
    // }
    //
    //
    // if(point.dist(x - divider, y - divider, points[i]) > min_allowed_dist){
    //   points.push(new Point(x - divider, y - divider, time, point, point_size));
    //   //return true;
    // }
    //
    //
    // if(point.dist(x + divider, y + divider, points[i]) > min_allowed_dist){
    //   points.push(new Point(x + divider, y + divider, time, point, point_size));
    //   //return true;
    // }
    //
    //
    // if(point.dist(x + divider, y - divider, points[i]) > min_allowed_dist){
    //   points.push(new Point(x + divider, y - divider, time, point, point_size));
    //   //return true;
    // }

    //
    // if(point.dist(x - divider, y + divider, points[i]) > min_allowed_dist){
    //   points.push(new Point(x - divider, y + divider, time, point, point_size));
    //   //return true;
    // }






  // if (board[dividedX - 1][dividedY] === 0) {
  //   points.push(new Point(x - divider, y, time, point, point_size));
  //   board[dividedX - 1][dividedY] = 1;
  //   return true;
  // }
  // if (board[dividedX][dividedY + 1] === 0) {
  //   points.push(new Point(x, y + divider, time, point, point_size));
  //   board[dividedX][dividedY + 1] = 1;
  //   return true;
  // }
  // if (board[dividedX][dividedY - 1] === 0) {
  //   points.push(new Point(x, y - divider, time, point, point_size));
  //   board[dividedX][dividedY - 1] = 1;
  //   return true;
  // }
  // if(board[dividedX-1][dividedY-1] === 0){
  // 	points.push(new Point(x-10, y-10, time, point, point_size));
  // 	board[dividedX-1][dividedY-1] = 1;
  //   return true;
  // }
  // if(board[dividedX+1][dividedY+1] === 0){
  // 	points.push(new Point(x+10, y+10, time, point, point_size));
  // 	board[dividedX+1][dividedY+1] = 1;
  //   return true;
  // }
  // if(board[dividedX-1][dividedY+1] === 0){
  // 	points.push(new Point(x-10, y+10, time, point, point_size));
  // 	board[dividedX-1][dividedY+1] = 1;
  //   return true;
  // }
  // if(board[dividedX+1][dividedY-1] === 0){
  // 	points.push(new Point(x+10, y-10, time, point, point_size));
  // 	board[dividedX+1][dividedY-1] = 1;
  //   return true;
  // }

  return false;

}

function mouseClicked() {
  print(points.length);
  points.push(new Point(mouseX, mouseY, time, null, point_size, 5, 5));
  board[floor(mouseX/divider)][floor(mouseY/divider)] = 1;
}