class Genome {
  constructor() {
    this.possible_elements = [Slower, Vertical, Accelerator];
    this.elements = [];
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
  }
}
