var constants;


//var playerSize = 10;

function Player(x,y,name,c, permOwnedRects, tempOwnedRects){
  constants = new Constants();
  this.pos = createVector(x,y);
  this.vel = createVector();
  this.direction = createVector();
  this.name = name;


  if(c){
    this.color = c;
    this.permOwnedRects = permOwnedRects;
    this.tempOwnedRects = tempOwnedRects;
  }
  else{
    this.color = color(random(0, 255), random(0, 255), random(0, 255));
    this.permOwnedRects = [];
    this.tempOwnedRects = [];
  }




  this.dir = function(x,y){
    if(this.direction.x != x*-1 || this.direction.y != y*-1){
      this.direction.x = x;
      this.direction.y = y;
    }
  }

  this.update = function(rects){
    var currDir = createVector(this.direction.x*constants.rectSize, this.direction.y*constants.rectSize);
    //Edges
    if(!(this.pos.x == 0 && this.direction.x == -1 || this.pos.x == width-constants.rectSize
    && this.direction.x == 1 || this.pos.y == 0 && this.direction.y == -1 ||
    this.pos.y == height-constants.rectSize && this.direction.y == 1)){

      this.vel = currDir;
      this.pos.add(this.vel);
      this.addRect(rects);
    }
  }

  this.addRect = function(rects){
    var rect = rects[this.pos.y/constants.rectSize][this.pos.x/constants.rectSize];
    if(rect.owner == this.name){
      for (var i = 0; i<this.tempOwnedRects.length; i++) {

        this.permOwnedRects.push(this.tempOwnedRects[i])
      }
      this.tempOwnedRects = [];
    }
    else{
      this.tempOwnedRects.push(rect);

    }
  }



  this.show = function(){
    fill(this.color);
    rect(this.pos.x-1, this.pos.y-1, constants.rectSize, constants.rectSize);
  }
}


