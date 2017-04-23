var constants;


function Rect(x,y){
  constants = new Constants();
  this.pos = createVector(x,y);
  this.color = color(255,255,255);
  this.owner;

  this.setOwner = function(player, perm){
    this.owner = player.name;
    if(perm){
      this.color = color(player.color.levels[0], player.color.levels[1], player.color.levels[2], 200);
    }
    else{
      this.color = color(player.color.levels[0], player.color.levels[1], player.color.levels[2], 100);
    }
  }

  this.show = function(){
    //console.log(this.color);
    push();
    fill(this.color);
    stroke(0);
    rect(this.pos.x, this.pos.y, constants.rectSize, constants.rectSize);
    pop();
  }
}
