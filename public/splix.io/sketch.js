var rects = [];
var playersIO = [];
var players = [];
var constants;
var numRects;
var dir;
var mousePressCounter = 0;
var player;

var socket;

function setup() {
  createCanvas(600, 600);
  background(255);
  frameRate(10);
  constants = new Constants();
  numRects = constants.numRects;
  socket = io.connect('http://localhost:3000');

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
  players.push(player);

  socket.on('otherPlayers', function(p) {
    var flag = false;
    for (var i = 0; i < players.length; i++) {
      if (players[i].name === p.name) {
        players[i] = new Player(p.x, p.y, p.name, p.color.levels, p.permOwnedRects, p.tempOwnedRects);
        flag = true;
        return;
      }
    }
    if (!flag) {
      playersIO.push(p);
    }
  });

}

function draw() {
  mousePressCounter++;
  background(255);

  for (var i = 0; i < playersIO.length; i++) {
    var p = playersIO[i];
    playersIO.splice(i, 1);
    var newPlayer = new Player(p.x, p.y, p.name, p.color.levels, p.permOwnedRects, p.tempOwnedRects)
    players.push(newPlayer);

  }
  //translate(player.pos.x, player.pos.y);
  for (var i = 0; i < rects.length; i++) {
    for (var j = 0; j < rects[i].length; j++) {
      rects[i][j].show();
    }
  }
  for (var i = 0; i < players.length; i++) {
    if (players[i].name !== player.name) {
      for (var j = 0; j < players[i].tempOwnedRects.length; j++) {
        for (var k = 0; k < rects.length; k++) {
          for (var l = 0; l < rects[k].length; l++) {
            if (rects[k][l].pos.x == players[i].tempOwnedRects[j].x && rects[k][l].pos.y == players[i].tempOwnedRects[j].y) {
              var c = players[i].tempOwnedRects[j].color.levels;
              rects[k][l].color = color(c[0], c[1], c[2], c[3]);
            }
          }
        }
      }
      for (var f = 0; f < players[i].permOwnedRects.length; f++) {
        for (var k = 0; k < rects.length; k++) {
          for (var l = 0; l < rects[k].length; l++) {
            if (rects[k][l].pos.x == players[i].permOwnedRects[f].x && rects[k][l].pos.y == players[i].permOwnedRects[f].y) {
              var c = players[i].permOwnedRects[f].color.levels;
              rects[k][l].color = color(c[0], c[1], c[2], c[3]);
            }
          }
        }
      }
    }
    players[i].show();
  }
  player.update(rects);


  //var playerData = {x: player.pos.x, y: player.pos.y, color: player.color};

  socket.emit('player', new ioPlayer(player));

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
