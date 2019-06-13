class Iblock {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    const options = {
      restitution: 0
    };

    this.body = Matter.Bodies.rectangle(x, y, w, h, options);
    Matter.World.add(world, this.body);
  }

  remove() {
    if (this.body.position.y > height) {
      Matter.Composite.remove(world, this.body);
      return true;
    }
    return false;
  }

  show() {
    const pos = this.body.position;
    const angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(rotate(angle));
    fill(0);
    noStroke();
    rectMode(CENTER);
    rect(0, 0, this.w, this.h, 2);
    pop();
  }
}
