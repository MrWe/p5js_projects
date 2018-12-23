const treeLimit = 4;


let points = [];
let tree;


function setup() {
	createCanvas(windowWidth, windowHeight);
	tree = new QuadTree(0, 0, width, height);
}

function draw() {
	background(0);
	noStroke();
	
	for (let point of points){
		ellipse(point.x, point.y, 1)
	}
	tree.show();
	for (let i = 0; i < 50; i++) {
		randomGaussianAddPoint()
		
	}
	
	


}

function randomAddPoint(){
	let point = createVector(random(width), random(height))
	points.push(point);
	tree.addPoint(point);
}


function randomGaussianAddPoint(){
	let point = createVector(randomGaussian(width/2, 100), randomGaussian(height/2, 100))
	points.push(point);
	tree.addPoint(point);
}

function mouseDragged(){
	let point = createVector(mouseX, mouseY);
	points.push(point);
	tree.addPoint(point);
}