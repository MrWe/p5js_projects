let bubbles = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	fill(255);
	stroke(255);
	for (let i = 0; i < 10; i++) {
		bubbles.push(new Bubble(random(width), random(height), 50));
	}
}

function draw() {
	for(let bubble of bubbles){
		bubble.show();
	}
}

function mouseDragged(){
	bubbles.push(new Bubble(mouseX, mouseY, 50));
}