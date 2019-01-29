class Point {
  constructor(parent, start_pos, stop_pos, direction) {
    this.parent = parent;
    this.pos = start_pos.copy();
    this.stop_pos = stop_pos.copy();
    this.direction = direction;
    this.catched = false;
  }

  update(elements) {
    if(this.catched){
      return;
    }
    if(dist(this.pos.x, this.pos.y, this.stop_pos.x, this.stop_pos.y) < r/2){
      this.catched = true;
      this.parent.fitness += 1;
      return;
    }
    for(let element of elements){
      if(dist(this.pos.x, this.pos.y, element.pos.x, element.pos.y) < element.size/2){
        this.direction.add(element.speed)
      }
    }
  
    this.pos.add(this.direction);
   
  }

  show() {
    push();
    fill(255);
    strokeWeight(0);
    ellipse(this.pos.x, this.pos.y, 5);
    pop();
  }
}
