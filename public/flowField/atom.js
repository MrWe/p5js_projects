var maxSpeed = 100;

function Atom(x, y){

  this.vel = createVector(random(TWO_PI));
  this.acc = createVector(0.0);
  this.pos = createVector(-5,-5);

  this.prevPos = this.pos.copy();

  this.applyForce = function(force){
    this.acc.add(force);
  }

  this.update = function(noises, numNoisesSquares){
    //console.log(noises[floor(this.pos.x/noises.length)][this.pos.y/height]);
    //console.log(noises[floor(this.pos.x/height)][this.pos.y/height])
    var one = floor(map(this.pos.x,0, width, 0, noises.length-1));
    var two = floor(map(this.pos.y,0, height, 0, noises[0].length-1));


    this.applyForce(noises[one][two]);
    //console.log(noises);
    //console.log(floor(this.x/numNoisesSquares), floor(this.y/numNoisesSquares));
    //console.log(noises[floor(this.x/numNoisesSquares)][floor(this.y/numNoisesSquares)])
    //this.vel = noises[floor(this.x/numNoisesSquares)][floor(this.y/numNoisesSquares)];
    this.vel.add(this.acc);
    this.vel.limit(maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
    //this.vel.limit(6);
  }

  this.updatePrev = function(){
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  this.edge = function(){
    if(this.pos.x < 0){
      this.pos.x = width-1;
      this.updatePrev();
    }
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if(this.pos.y < 0){
      this.pos.y = height-1;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    //console.log(this.pos.x);
  }

  this.show = function(){

    stroke(0, 5);
    strokeWeight(1);
    //point(this.pos.x,this.pos.y);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();

  }
}
