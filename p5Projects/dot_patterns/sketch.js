goal_spots = []
visible_spots = []
num_spots = 200
t = 20
lr = 0.05
mouse_radius = 100
theta = 0

let font;

function preload() {
    font = loadFont('FreeMonoBold.ttf')
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	// goal_spots = font.textToPoints('ERIK', width/4, height/2, 500);
	// print(goal_spots.length)

	for (let i = 0; i < num_spots; i++) {
		// x = width/2 + 300 * cos(map(i, 0, num_spots,0, TWO_PI));
		// y = height/2 + 300 * sin(map(i, 0, num_spots,0, TWO_PI));
		x = width/2 + -(t *  16*sin(map(i, 0, num_spots,0, TWO_PI))**3)
		y = height/2+ -(t *  13*cos(map(i, 0, num_spots,0, TWO_PI))-(8*t)*cos(2*map(i, 0, num_spots,0, TWO_PI))-2*cos(3*map(i, 0, num_spots,0, TWO_PI))-cos(4*map(i, 0, num_spots,0, TWO_PI)))

		goal_spots.push(createVector(x,y))
	}


	for (let i = 0; i < num_spots; i++) {
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

	beginShape(LINES)
	for (let i = 0; i < visible_spots.length; i++) {
		fill(255)
		//ellipse(visible_spots[i].x, visible_spots[i].y,2,2)
		vertex(visible_spots[i].x, visible_spots[i].y)
		update_visible_spots_towards_goal(i)
		update_visible_spots_away_from_goal(i)
	}
	endShape(CLOSE);

	if(frameCount%2 === 0){
		let last = goal_spots.pop()
		goal_spots.unshift(last)
	}





}

function update_visible_spots_towards_goal(i){

	visible_spots[i].x -= lr * (visible_spots[i].x - goal_spots[i].x);
	visible_spots[i].y -= lr * (visible_spots[i].y - goal_spots[i].y);

}

function update_visible_spots_away_from_goal(i){

	mousePos = createVector(mouseX, mouseY)
	distance = visible_spots[i].dist(mousePos)
	if(distance < mouse_radius){
		visible_spots[i].x += ((mouse_radius - distance)*0.1) * (visible_spots[i].x - mousePos.x);
		visible_spots[i].y += ((mouse_radius - distance)*0.1) *  (visible_spots[i].y - mousePos.y);
	}

}