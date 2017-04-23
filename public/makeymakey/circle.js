function circle() {
  this.pos = createVector(width / 2, height / 2);
  this.vel = createVector();
  this.acc = createVector();
  this.force = createVector();
  this.gravity = createVector(0, 2);
  this.gravMult = 1.1;
  this.r = 50;
  this.canFallDown = true;
  this.canFly = true;


  this.applyForce = function() {

    this.acc.add(this.force);
    this.force.mult(0.1);
  }

  this.updateForce = function() {

    var newVec = createVector(0, -10);
    this.gravity = createVector(0, 2);
    this.force.add(newVec);

  }

  this.update = function() {
    this.applyForce();
    this.gravity.mult(this.gravMult);
    if (this.canFly) {
      this.vel.add(this.acc);
      this.pos.add(this.vel);

      this.acc.mult(0);
      this.vel.mult(0.9);

    }
    else {
      this.acc.mult(0);
      this.vel.mult(0);
    }

    if(this.canFallDown){

      this.pos.add(this.gravity);
      this.gravity.limit(20);
    }
    else{
      this.gravity = createVector(0, 2);
    }
  }

  this.edges = function() {
    if (this.pos.y > height) {
      this.canFallDown = false;
      this.canFly = true;
    } else if (this.pos.y < 0) {
      this.canFly = false;
      this.canFallDown = true;
    }
    else{
      this.canFly = true;
      this.canFallDown = true;
    }
    if(this.pos.x < 0){
      this.pos.x = 0;
    }
    if(this.pos.x > width){
      this.pos.x = width;
    }

  }

  this.show = function() {
    push();
    fill(255);
    stroke(255);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);

    pop();
  }
}
