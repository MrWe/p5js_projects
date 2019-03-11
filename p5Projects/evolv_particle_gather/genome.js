class Genome {
  constructor() {
    this.possible_elements = [Slower, Vertical, Horizontal];
    this.elements = [];
    this.points = [];
    this.fitness = 0;
    this.life = 150;

    for (let i = 0; i < num_points; i++) {
      let angle = (TWO_PI / num_points) * i;
      let direction = createVector(cos(angle), sin(angle));
      this.points.push(new Point(this, start_pos, stop_pos, direction.mult(20)));
    }
    let r = random(1, 30);

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
    let r = random(1);
    if(r < 0.01){
      this.add_rand_element();
    }
    if(this.elements.length > 1){
      let r = random(1);
      if(r < 0.01){
        this.elements.splice(floor(random(this.elements.length)), 1);
      }
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

  update(){
    for(let point of this.points){
      point.update(this.elements);
    }
    this.life--;
  }

  copy() {
    let new_elements = [];
    for (let element of this.elements) {
      new_elements.push(element.copy());
    }
    let new_object = new Genome();
    new_object.elements = new_elements;
    new_object.fitness = 0;
    return new_object;
  }
}
