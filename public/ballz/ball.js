function Ball(x,y){
  this.pos = createVector(x,y);
  this.vel = createVector();
  this.acc = createVector();
  this.maxSpeed = 10;
  this.size = 10;

  this.addForce = function(f){
    this.acc.add(f);
  }

  this.update = function(rects){
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed)
    this.pos.add(this.vel);
    this.edge();
    this.rectColl(rects);
    this.acc.mult(0);
  }

  this.edge = function(){
    if(this.pos.y < this.size*1.5){
      this.vel.y *= -1;
    }
    else if(this.pos.y > (height-this.size*1.5)){
      this.vel.mult(0);
    }
    else if(this.pos.x < this.size*1.5){
      this.vel.x *= -1;
    }
    else if(this.pos.x > (width - this.size*1.5)){
      this.vel.x *= -1;
    }
  }

  this.rectColl = function(rects){
    for (var i = rects.length-1; i > 0; i--) {
      if(dist(rects[i].x,rects[i].y,this.pos.x,this.pos.y) < (rects[i].size)){
        var x = rects[i].x;
        var y = rects[i].y;

        if(this.pos.x - x < rects[i].size){
          this.addForce(createVector(this.pos.x*-1, 0))
          this.vel.x *= -1;
        }
        else if(this.pos.y - y < rects[i].size){
          this.addForce(createVector(0, this.vel.y*-1))
          this.vel.y *= -1;
        }
        rects.splice(i,1);
        break;
      }
    }
  }

  this.show = function(){
    push();
    fill(255);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
    pop()
  }
}
