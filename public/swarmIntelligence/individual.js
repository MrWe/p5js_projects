function Individual() {
  this.pos = createVector(random(width), random(height));
  this.vel = createVector(random(-TWO_PI), random(TWO_PI));
  this.acc = createVector();
  this.size = 5;
  this.maxSpeed = 5;
  this.maxForce = 1;
  this.sight = 20;

}

Individual.prototype.addForce = function(f) {
  this.acc.add(f);
}

Individual.prototype.update = function(v, swarm) {
  //this.edge();
  this.genForce(swarm);
  this.addForce(this.boundaries());
  //this.addForce();
  this.vel.add(this.acc);
  this.vel.limit(this.maxSpeed);
  this.pos.add(this.vel);
  this.acc.mult(0);
}

Individual.prototype.genForce = function(swarm) {
  var x = 0;
  var y = 0;
  var numOfIndividuals = 0;
  var avoidCollision = createVector(0, 0);
  for (var i = 0; i < swarm.length; i++) {
    var distance = dist(this.pos.x, this.pos.y, swarm[i].pos.x, swarm[i].pos.y);
    if (swarm[i] !== this && distance < this.sight) {
      x += swarm[i].pos.x;
      y += swarm[i].pos.y;
      numOfIndividuals++;
      if (distance < this.sight / 1.9) {
        var desired = createVector(-swarm[i].pos.x, -swarm[i].pos.y).add(this.pos);
        desired.mult(this.maxSpeed);
        var force = p5.Vector.sub(desired, this.vel);
        force.limit(this.maxForce);
        force.setMag(force.mag()/5);
        this.addForce(force.mult(this.sight*2 - dist(this.pos.x, this.pos.y, swarm[i].pos.x, swarm[i].pos.y)).normalize());
      }
      avoidCollision.sub(createVector(swarm[i].pos.x, swarm[i].pos.y), this.maxSpeed);
    }
  }

  avoidCollision.mult(this.maxSpeed);
  var force = p5.Vector.sub(avoidCollision, this.vel);
  avoidCollision.div(numOfIndividuals);
  //avoidCollision.limit(this.maxForce);

  this.addForce(avoidCollision.normalize().mult(0.2));


  // if (numOfIndividuals !== 0) {
  //   var target = createVector((x / numOfIndividuals), (y / numOfIndividuals));
  //   var desired = p5.Vector.sub(target, this.pos);
  //   desired.mult(this.maxSpeed);
  //   var force = p5.Vector.sub(desired, this.vel);
  //   force.limit(this.maxForce); // Limit to maximum steering force
  //
  //   this.addForce(force);
  // }

}

Individual.prototype.show = function() {
  push();
  stroke(255);
  strokeWeight(2);
  fill(200);
  ellipse(this.pos.x, this.pos.y, this.size, this.size);
  pop();
};

Individual.prototype.edge = function() {
  if (this.pos.x < 0) {
    this.pos.x = width - 1;
  }
  if (this.pos.x > width) {
    this.pos.x = 0;
  }
  if (this.pos.y < 0) {
    this.pos.y = height - 1;
  }
  if (this.pos.y > height) {
    this.pos.y = 0;
  }
  //console.log(this.pos.x);
}

Individual.prototype.boundaries = function() {
  var d = 25;

  var desired = null;

  if (this.pos.x < d) {
    desired = createVector(this.maxSpeed, this.vel.y);
  } else if (this.pos.x > width - d) {
    desired = createVector(-this.maxSpeed, this.vel.y);
  }

  if (this.pos.y < d) {
    desired = createVector(this.vel.x, this.maxSpeed);
  } else if (this.pos.y > height - d) {
    desired = createVector(this.vel.x, -this.maxSpeed);
  }

  if (desired !== null) {
    desired.mult(this.maxSpeed);
    //console.log(this.maxSpeed);
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxSpeed);
    //console.log(desired);
    return steer;
  }
  return createVector();
}
