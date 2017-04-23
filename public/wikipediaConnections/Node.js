function Node(name, children) {
  this.name = name;
  this.children = children;
  this.ellipseSize = this.name.length * 8;
  this.pos = createVector(random(this.ellipseSize / 2, width), random(this.ellipseSize / 2, height));



  this.show = function() {
    push();
    if (this.mouseover()) {
      fill(25, 200);
      stroke(255);
    } else {
      fill(50, 150);
      stroke(255);
    }

    ellipse(this.pos.x, this.pos.y, this.ellipseSize, this.ellipseSize);
    pop();

    push();
    fill(255);
    text(this.name, this.pos.x - this.name.length * 3, this.pos.y);
    pop();
  }

  this.paintRelation = function(node) {
    if (node) {
      //console.log("Heisann");
      push();
      if (this.mouseover()) {
        stroke(0);
        strokeWeight(5);
      }
      line(this.pos.x, this.pos.y, node.pos.x, node.pos.y);
      pop();
    }

  }

  this.setCoords = function() {
    this.pos = createVector(random(width), random(height));

  }


  this.moveNode = function(){
    if(this.mouseover()){
      this.pos.x = mousePos.x;
      this.pos.y = mousePos.y;
    }
  }

  this.mouseover = function() {
    if (mousePos) {
      return (dist(this.pos.x, this.pos.y, mousePos.x, mousePos.y) < this.ellipseSize/2);
    }
    return false;

  }



}
