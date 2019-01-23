let startPos;
let stopPos;
let r = 10;
let numPoints = 10;
let genomes = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	startPos = createVector(100, height / 2);
	stopPos = createVector(500, height / 2);
}

function draw() {
	//Draw start and stop
	noFill();
	stroke(255);
	strokeWeight(2);
	ellipse(startPos.x, startPos.y);
	ellipse(stopPos.x, stopPos.y);

	g = new Genome();
	print(g)
	noLoop();


}