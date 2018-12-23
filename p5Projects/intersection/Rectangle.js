class Rectangle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;
    this.paintRed = false;
  }

  show() {

    if (this.paintRed) {
      fill(255, 0, 0);
    } else {
      fill(255);
    }
    stroke(255);
    beginShape();
    vertex(this.x, this.y);
    vertex(this.x + this.w, this.y);
    vertex(this.x + this.w, this.y + this.h);
    vertex(this.x, this.y + this.h);
    endShape(CLOSE);
  }

  intersectsCircle(cx, cy, cr) {
    let circleDistancex = abs(cx - (this.x + (this.w / 2)));
    let circleDistancey = abs(cy - (this.y + this.h / 2));

    if (circleDistancex > (this.w / 2 + (cr/2))) {
      return false;
    }
    if (circleDistancey > (this.h / 2 + (cr/2))) {
      return false;
    }

    if (circleDistancex <= (this.w / 2)) {
      return true;
    }
    if (circleDistancey <= (this.h / 2)) {
      return true;
    }

    let cornerDistance_sq = (circleDistancex - this.w / 2) ^ 2 + (circleDistancey - this.h / 2) ^ 2;

    return (cornerDistance_sq <= ((cr/2) ^ 2));
  }

}
