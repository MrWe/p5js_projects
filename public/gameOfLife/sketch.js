board = []
tempBoard = []
colors = []
boardSize = 8
numRaces = 3;
started = false


function setup(){
  createCanvas(500,500)
  for (var i = 0, len = height/boardSize; i < len; i++) {
    temp = new Array(Math.floor(width/boardSize))
    for (var j = 0, len = width/boardSize; j < len; j++) {
      let r = random(1);
      if(r > 2){
        temp[j] = 1
      }
      else{
        temp[j] = 0
      }
    }

    board.push(temp)
  }
}

function draw(){
  background(0);
  frameRate(10)

  tempBoard = board.slice();
  for (var i = 1, len = board.length-1; i < len; i++) {
    for (var j = 1, len = board[i].length-1; j < len; j++) {
      if(started){
        rule1(i,j)
      }
      pixel = board[i][j];
      if(pixel != 0){
        push()
        fill(255)

        translate(i * height/board.length,j*width/board[0].length)
        rect(0,0,5,5)
        //rect(0,0,(height/boardSize)+2,(height/boardSize)+2)

        pop()
      }
    }
  }
  board = tempBoard.slice();
}

function mouseClicked(){
  x = floor(mouseX/boardSize)
  y = floor(mouseY/boardSize)
  board[x][y] = 1;
}

function keyPressed(){
  if(started){
    started = false
  }
  else{
    started = true
  }
}

function life(){

  for (var i = 1; i < board.length-1; i++) {
    for (var j = 1; j < board[i].length-1; j++) {
      rule1(i,j)
    }
  }
}

//Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
function rule1(i,j){
  count = 0;
  pixel = board[i][j]
  if(board[i-1][j] === 1){count++;}
  if(board[i+1][j] === 1){count++;}
  if(board[i][j-1] === 1){count++;}
  if(board[i][j+1] === 1){count++;}
  if(board[i-1][j-1] === 1){count++;}
  if(board[i+1][j+1] === 1){count++;}
  if(board[i+1][j-1] === 1){count++;}
  if(board[i-1][j+1] === 1){count++;}

  if(count == 0){
    tempBoard[i][j] = 0
  }
  if(count == 1){
    tempBoard[i][j] = 0
  }
  if(count > 3){
    tempBoard[i][j] = 0
  }
  if(board[i][j] == 0 && count == 3){
    tempBoard[i][j] = 1
  }
}
