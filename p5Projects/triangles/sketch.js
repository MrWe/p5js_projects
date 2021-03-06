let dots = [];
let lineDist = 100;
let dotSpeed = 2;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255);
}

function draw() {
	background(255);
	createDot();

	for(dot in dots){
		if(dots[dot].pos.x < -10 || dots[dot].pos.x > width + 10 || dots[dot].pos.y < -10 || dots[dot].pos.y > height + 10){
			dots.splice(dot, 1);
		}
		else{
			dots[dot].move();
			dots[dot].show();

			for (let i = dot; i < dots.length; i++) {
				let dist = dots[dot].dist(dots[i].pos)
				let x = dots[dot].pos.x;
				let y = dots[dot].pos.y;
				let dir_x = 0.001 * (dots[i].pos.x - x);
				let dir_y = 0.001 * (dots[i].pos.y - y);
				dots[dot].pos.sub(createVector(dir_x, dir_y))


				stroke(0, 255/(dist*0.2));
				strokeWeight(1);
				if(dist < lineDist){
					line(dots[dot].pos.x, dots[dot].pos.y, dots[i].pos.x, dots[i].pos.y);
				}
			}
			let mouseDist = dots[dot].dist(createVector(mouseX, mouseY))
			stroke(0, 255/(mouseDist*0.1));
			if(mouseDist < lineDist){

				line(dots[dot].pos.x, dots[dot].pos.y, mouseX, mouseY);
			}
		}
	}
}


function createDot(){
	top_bottom = Math.round(random(0,1));
	left_right = Math.round(random(0,1));

	let x = (random() < 0.5 ? -5 : width+5);
	let y = (random() < 0.5 ? -5 : height+5);
	if(random() > 0.7){
		dots.push(new Dot(x,y, random(2,5),random(-dotSpeed,dotSpeed),random(-dotSpeed,dotSpeed), random(255)))
		//dots.push(new Dot(width/2,height/2, random(2,5),random(-dotSpeed,dotSpeed),random(-dotSpeed,dotSpeed), random(255)))
	}

}