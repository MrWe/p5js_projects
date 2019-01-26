class Genome {
  constructor() {
    this.possible_elements = [Slower, Vertical, Accelerator];
    this.elements = [];
    this.points = [];

    for (let i = 0; i < num_points; i++) {
      let angle = (TWO_PI / num_points) * i;
      let direction = createVector(cos(angle), sin(angle));
      this.points.push(new Point(this, start_pos, stop_pos, direction));
    }
    let r = random(1, 10);

    for (let i = 0; i < r; i++) {
      this.add_rand_element();
    }
  }

  add_rand_element() {
    let r = floor(random(0, this.possible_elements.length));
    this.elements.push(new this.possible_elements[r]());
  }

  mutate() {
    for (let element of this.elements) {
      element.mutate();
    }
  }

  show() {
    for (let element of this.elements) {
      element.show();
    }
    for (let point of this.points) {
      point.show();
    }
  }

  copy() {
    new_elements = [];
    for (let element of this.elements) {
      new_elements.push(element.copy());
    }
    new_object = JSON.parse(JSON.stringify(this));
    new_object.elements = new_elements;
    return new_object;
  }
}
