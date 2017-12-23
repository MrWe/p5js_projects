let data_points = [];
let classifier_points = [];
let colors = [];
let num_points = 200;
let num_classifiers = 3;



function setup() {
	createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < num_points; i++) {
    data_points.push(createVector(random(width),random(height)));
  }
  for (let i = 0; i < num_classifiers; i++) {
    classifier_points.push(createVector(random(width),random(height)));
    colors.push(color(random(255), random(255), random(255)));
  }

}

function draw() {

  background(50);

  let groups = new Array(classifier_points.length);

  for(let p of data_points){
    let shortest_dist = Infinity;
    let index = 0;
    for(let c of classifier_points){
      let curr_dist = dist(p.x,p.y,c.x,c.y);
      if(curr_dist < shortest_dist){
        shortest_dist = curr_dist;
        index = classifier_points.indexOf(c);
      }
    }
    if(groups[index] == null){groups[index] = []}
    groups[index].push(p)
  }

  for(let i = 0; i < groups.length; i++) {
    let avgV = createVector();
    if(groups[i] == null){continue};
    for(let p of groups[i]){
      avgV.add(p);
    }
    avgV = avgV.div(groups[i].length);
    let dir;
    if(dist(classifier_points[i].x,classifier_points[i].y,avgV.x,avgV.y) < 1){
      dir = classifier_points[i].copy().sub(avgV);
    }
    else{
      dir = get_normalized_dir(classifier_points[i].copy().sub(avgV));
    }
    classifier_points[i].sub(dir)
  }

  show_points(groups);
  show_classifiers(classifier_points);
}


function show_classifiers(arr){
  for (let i = 0; i < arr.length; i++) {
    push()
    fill(colors[i]);
    stroke(255);
    ellipse(arr[i].x, arr[i].y, 10, 10);
    pop()
  }
}

function show_points(groups){
  for (let i = 0; i < groups.length; i++) {
    if(groups[i] == null){continue};
    for(p of groups[i]){
      fill(colors[i]);
      ellipse(p.x, p.y, 10, 10);
    }
  }
}

function mousePressed(){
  data_points.push(createVector(mouseX,mouseY))
}

function get_normalized_dir(vec){
  return createVector(Math.sign(vec.x),Math.sign(vec.y))
}