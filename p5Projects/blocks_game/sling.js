class Sling {
  constructor(x, y, circle_size) {
    this.bodies = [];
    this.circle_size = circle_size;
    this.body = Matter.Bodies.circle(x, y, circle_size, {
      restitution: 0.5
    });
    this.bodies.push(this.body);
    Matter.Body.setMass(this.body, this.body.mass * 4);
    Matter.World.add(world, this.body);

    const options = {
      pointA: {
        x: x,
        y: y
      },
      bodyB: this.body,
      stiffness: 0.3
    };
    this.sling = Constraint.create(options);
    World.add(world, this.sling);
  }

  resetBody(x, y) {
    this.sling.pointA = { x, y };
    this.body = Matter.Bodies.circle(x, y, this.circle_size, {
      restitution: 0.5
    });
    this.bodies.push(this.body);
    Matter.Body.setMass(this.body, this.body.mass * 4);
    Matter.World.add(world, this.body);
    this.sling.bodyB = this.body;
  }

  fly() {
    this.sling.bodyB = null;
    Matter.Body.setVelocity(this.body, {
      x: (this.body.position.x - this.sling.pointA.x) * -1 * 0.3,
      y: (this.body.position.y - this.sling.pointA.y) * -1 * 0.3
    });
  }

  show() {
    push();
    stroke(0);
    strokeWeight(4);
    try {
      const posA = this.sling.pointA;
      const posB = this.sling.bodyB.position;
      line(posA.x, posA.y, posB.x, posB.y);
    } catch {}

    for (let body of this.bodies) {
      ellipse(
        body.position.x,
        body.position.y,
        this.circle_size,
        this.circle_size
      );
    }
    pop();
  }
}
