board = []
colors = []
boardSize = 8
numRaces = 3;


function setup(){
  createCanvas(500,500)
  // for (var i = 0; i < numRaces; i++) {
  //   colors.push(color(random(255), random(255), random(255)));
  // }
  colors.push(color(255, 0, 0));
  colors.push(color(0, 255, 0));
  colors.push(color(0, 0, 255));
  colors.push(color(255));
  for (var i = 0, len = height/boardSize; i < len; i++) {
    temp = []
    for (var j = 0, len = width/boardSize; j < len; j++) {
      temp.push(Math.floor(random(numRaces)));
    }
    board.push(temp)
  }
  //console.log(board)


}

function draw(){
  background(255);
  frameRate(60)
  for (var i = 0, len = board.length-1; i < len; i++) {
    for (var j = 0, len = board[i].length-1; j < len; j++) {
      war()
      push()
      pixel = board[i][j];

      fill(colors[pixel])
      noStroke()
      /*
      if(pixel === 0){fill(255,0,0);}
      if(pixel === 1){fill(0,255,0);}
      if(pixel === 2){fill(0,0,255);}
      */
      translate(i * height/board.length,j*width/board[0].length)
      ellipse(0,0,12,12)
      //rect(0,0,(height/boardSize)+2,(height/boardSize)+2)

      pop()
    }
  }

  //randomPixel()
}


function randomPixel(){
  var i = Math.floor(random(1, board.length-1));
  var j = Math.floor(random(1, board[i].length-1));
  board[i][j] = Math.floor(random(3))
}

function war(){
  var i = Math.floor(random(1, board.length-1));
  var j = Math.floor(random(1, board[i].length-1));
  // for (var i = 1; i < board.length-1; i++) {
  //   for (var j = 1; j < board[i].length-1; j++) {
      pixel = board[i][j];
      if(shouldKill(pixel, board[i-1][j])){
        board[i-1][j] = pixel
      }
      else if(shouldKill(pixel, board[i+1][j])){
        board[i+1][j] = pixel
      }
      else if(shouldKill(pixel, board[i][j-1])){
        board[i][j-1] = pixel
      }
      else if(shouldKill(pixel, board[i][j+1])){
        board[i][j+1] = pixel
      }
      else if(shouldKill(pixel, board[i+1][j+1])){
        board[i+1][j+1] = pixel
      }
      else if(shouldKill(pixel, board[i-1][j+1])){
        board[i-1][j+1] = pixel
      }
      else if(shouldKill(pixel, board[i+1][j-1])){
        board[i+1][j-1] = pixel
      }
      else if(shouldKill(pixel, board[i-1][j-1])){
        board[i-1][j-1] = pixel
      }
  //   }
  // }
}

function shouldKill(pixel, neighbour){
  if(pixel === neighbour-1){
    return true
  }
  if(pixel == (numRaces-1) && neighbour == 0){
    return true;
  }
  return false;

}