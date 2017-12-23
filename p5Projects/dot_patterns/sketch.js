goal_spots = []
visible_spots = []
num_spots = 200
t = 20
lr = 0.05
mouse_radius = 400
theta = 0

let font;
let img;

function preload() {
    font = loadFont('FreeMonoBold.ttf')
		img = loadImage("swastika.jpg");

}

function setup() {
	createCanvas(windowWidth, windowHeight);

	// goal_spots = font.textToPoints('ERIK', width/4, height/2, 500);
	// print(goal_spots.length)
	img.loadPixels()

	for (i = 0; i < img.width-1; i+=3) {
	  for (j = 0; j < img.height-1; j+=3) {
			let pix = img.get(i,j)
			let sum = pix[0] + pix[1] + pix[2]
			if(sum <150){
				goal_spots.push(createVector(((width/2)-img.width/2)+i,((height/2)-img.height/2)+j))
			}


	  }
	}

	// for (let i = 0; i < num_spots; i++) {
	// 	// x = width/2 + 300 * cos(map(i, 0, num_spots,0, TWO_PI));
	// 	// y = height/2 + 300 * sin(map(i, 0, num_spots,0, TWO_PI));
	// 	x = width/2 + -(t *  16*sin(map(i, 0, num_spots,0, TWO_PI))**3)
	// 	y = height/2+ -(t *  13*cos(map(i, 0, num_spots,0, TWO_PI))-(8*t)*cos(2*map(i, 0, num_spots,0, TWO_PI))-2*cos(3*map(i, 0, num_spots,0, TWO_PI))-cos(4*map(i, 0, num_spots,0, TWO_PI)))
	//
	// 	goal_spots.push(createVector(x,y))
	// }


	for (let i = 0; i < goal_spots.length; i++) {
		x = width/2 + width * cos(map(i, 0, num_spots,0, TWO_PI));
		y = height/2 + height * sin(map(i, 0, num_spots,0, TWO_PI));

		visible_spots.push(createVector(x,y))
	}

}

function draw() {
	background(255)
	// for (let i = 0; i < goal_spots.length; i++) {
	// 	fill(255)
	// 	ellipse(goal_spots[i].x, goal_spots[i].y, 5, 5)
	// }

	//beginShape(LINES)
	noStroke()
	for (let i = 0; i < visible_spots.length; i++) {

		fill(0)
		ellipse(visible_spots[i].x, visible_spots[i].y,2,2)
		//vertex(visible_spots[i].x, visible_spots[i].y)
		update_visible_spots_towards_goal(i)
		update_visible_spots_away_from_goal(i)
	}
	//endShape(CLOSE);

	// if(frameCount%60 === 0){
	// 	let last = goal_spots.pop()
	// 	goal_spots.unshift(last)
	// }





}

function update_visible_spots_towards_goal(i){

	visible_spots[i].x -= lr * (visible_spots[i].x - goal_spots[i].x);
	visible_spots[i].y -= lr * (visible_spots[i].y - goal_spots[i].y);

}

function update_visible_spots_away_from_goal(i){

	mousePos = createVector(mouseX, mouseY)
	distance = visible_spots[i].dist(mousePos)
	if(distance < mouse_radius){
		visible_spots[i].x += ((mouse_radius - distance)*0.05) * (visible_spots[i].x - mousePos.x);
		visible_spots[i].y += ((mouse_radius - distance)*0.05) *  (visible_spots[i].y - mousePos.y);
	}

}