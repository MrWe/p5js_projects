dots = []
goal = 0;

function setup(){
  createCanvas(1700,500)
  goal = floor(random(width));
  print(goal)
}

function draw(){
  background(0);
  push()
  stroke(255);
  line(0, 50, width, 50)
  line(mouseX, 40, mouseX, 60)
  pop()
  fill(255)
  text(mouseX, mouseX, 20, mouseX, 60)


  for (var i = 0; i < dots.length; i++) {
    if(dots[i] > goal){
      fill(255, 0, 0);
    }
    else{
      fill(0, 255, 0);
    }
      ellipse(dots[i],20,5)
  }

}


function mouseClicked(){
  if(mouseX === goal){
    print("You win!")
  }
  dots.push(mouseX);
}
