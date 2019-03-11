class Ball {
  constructor(target_x, target_y, start_x, start_y, c) {
    this.target = createVector(target_x, target_y);
    this.pos = createVector(start_x, start_y);
    this.last_pos = this.pos.copy();
    this.c = c;
  }

  update() {
    if (random() > 0.5) {
      return;
    }
    this.last_pos = this.pos.copy();
    this.pos.x = lerp(this.pos.x, this.target.x, random() < 0.5 ? -0.8 : 0.8);
    this.pos.y = lerp(this.pos.y, this.target.y, random() < 0.5 ? -0.8 : 0.8);
    this.pos.rotate(random(-0.1, 0.1));
    if (dist(this.pos.x, this.pos.y, this.target.x, this.target.y) < 1) {
      this.pos = createVector(
        random() > 0.5 ? -width / 5 : width / 5,
        random() > 0.5 ? -height / 5 : height / 5
      );

      this.last_pos = this.pos.copy();
    }
  }

  show() {
    if (dist(this.pos.x, this.pos.y, this.target.x, this.target.y) < 10) {
      let sat = (float(250 - (frameCount % 100)) / 250) * 255;
      stroke(
        this.c,
        sat,
        sat,
        map(
          dist(this.pos.x, this.pos.y, this.target.x, this.target.y),
          0,
          width / 7,
          10,
          1
        )
      );
      strokeWeight(1);
      line(this.pos.x, this.pos.y, this.last_pos.x, this.last_pos.y);
      //ellipse(this.pos.x, this.pos.y, 5);
    } else {
      let sat = (float(250 - (frameCount % 100)) / 250) * 255;
      stroke(
        this.c,
        sat,
        sat,
        map(
          dist(this.pos.x, this.pos.y, this.target.x, this.target.y),
          0,
          width / 10,
          10,
          1
        )
      );
      strokeWeight(0.1);
      fill(
        this.c,
        sat,
        sat,
        map(
          dist(this.pos.x, this.pos.y, this.target.x, this.target.y),
          0,
          width / 10,
          10,
          1
        )
      );
      line(this.pos.x, this.pos.y, this.last_pos.x, this.last_pos.y);
      //ellipse(this.pos.x, this.pos.y, 5);
    }
  }
}
