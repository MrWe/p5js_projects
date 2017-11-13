let points = [];
let neurons = [];
let size;
let file;

let assigned_cities = [];
let assigned_neurons = [];

function preload(){
	file = loadStrings('sahara.txt');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);

	size = int(file[0]);

	p = sanitize_data(file);

	for (let i = 0; i < size; i++) {
		points.push(createVector(p.x[i],p.y[i]));
	}

	for (let i = 0; i < size; i++) {
		neurons.push(createVector(random(width), random(height)));
	}

	points.forEach(x=>{
		fill(255,0,0);
		noStroke();
		ellipse(x.x,x.y,15,15);

		let nearest_neuron = neurons[0];
		let distance = Infinity;

		neurons.forEach((y)=>{
			let tmp_dist = dist(x.x,x.y, y.x, y.y);
			if(tmp_dist < distance){
				nearest_neuron = y;
				distance = tmp_dist;
			}
		})

		if(distance != Infinity && assigned_neurons.indexOf(nearest_neuron) == -1 && assigned_cities.indexOf(x) == -1){
			assigned_cities.push(x);
			assigned_neurons.push(nearest_neuron);
		}
	});





}

function draw() {

	background(0)

	for (var i = 0; i < neurons.length; i++) {
		let index = assigned_neurons.indexOf(neurons[i]);
		if(index == -1){continue};
		let dir_x = (assigned_neurons[index].x - assigned_cities[index].x);
		let dir_y = (assigned_neurons[index].y - assigned_cities[index].y);
		assigned_neurons[index].x -= dir_x*0.01;
		assigned_neurons[index].y -= dir_y*0.01;
		neurons[i].x -= dir_x*0.01;
		neurons[i].y -= dir_y*0.01;
		// if(i > 0){
		// 	let dir_x = (neurons[i-1].x - assigned_cities[index].x);
		// 	let dir_y = (neurons[i-1].y - assigned_cities[index].y);
		// 	index = assigned_neurons.indexOf(neurons[i-1]);
		// 	neurons[i-1].x -= dir_x*0.1;
		// 	neurons[i-1].y -= dir_y*0.1;
		// 	if(index == -1){continue};
		// 	assigned_neurons[index].x -= dir_x*0.1;
		// 	assigned_neurons[index].y -= dir_y*0.1;
		// }
		// if(i < neurons.length-1){
		// 	let dir_x = (neurons[i+1].x - assigned_cities[index].x);
		// 	let dir_y = (neurons[i+1].y - assigned_cities[index].y);
		// 	index = assigned_neurons.indexOf(neurons[i+1]);
		// 	neurons[i+1].x -= dir_x*0.1;
		// 	neurons[i+1].y -= dir_y*0.1;
		// 	if(index == -1){continue};
		// 	assigned_neurons[index].x -= dir_x*0.1;
		// 	assigned_neurons[index].y -= dir_y*0.1;
		// }

	}


	neurons.forEach((x,i)=>{
		fill(255);
		noStroke();
		ellipse(x.x,x.y,10,10);

		if(i < neurons.length-1){
			stroke(255);
			strokeWeight(2);
			line(x.x,x.y,neurons[i+1].x,neurons[i+1].y);
		}
	});

	points.forEach(x=>{
		fill(255,0,0);
		noStroke();
		ellipse(x.x,x.y,15,15);


		let nearest_neuron = neurons[0];
		let distance = Infinity;

		neurons.forEach((y)=>{
			let tmp_dist = dist(x.x,x.y, y.x, y.y);
			if(tmp_dist < distance){
				nearest_neuron = y;
				distance = tmp_dist;
			}
		})

		if(distance != Infinity && assigned_neurons.indexOf(nearest_neuron) == -1 && assigned_cities.indexOf(x) == -1){
			assigned_cities.push(x);
			assigned_neurons.push(nearest_neuron);
		}


	});

}



function sanitize_data(data){
	x_points = [];
	y_points = [];
	data.shift();
	data.forEach(x=>{
		x = x.split(" ");
		x_points.push(float(x[1]));
		y_points.push(float(x[2]));
	});
	let max_x = Math.max.apply(Math, x_points);
	let min_x = Math.min.apply(Math, x_points);
	let max_y = Math.max.apply(Math, y_points);
	let min_y = Math.min.apply(Math, y_points);

	x_points.forEach((elem, i)=>{
		x_points[i] = map(elem, min_x, max_x, 5, width-5);
	});
	y_points.forEach((elem, i)=>{
		y_points[i] = map(elem, min_y, max_y, 5, height-5);
	});

	return {x: x_points, y: y_points};

}