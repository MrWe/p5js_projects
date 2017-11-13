let points = [];
let neurons = [];
let temp_points_store = [];
let num_neurons;;
let dimension = 2;
let init_decay = 10;
let decay = init_decay;


let learning_rate = 0.1;
let file;

function preload(){
	file = loadStrings('sahara.txt');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	num_neurons = int(file[0]);

	p = sanitize_data(file);

	x_points = p.x;
	y_points = p.y;

	for (let i = 0; i < 5; i++) {
		points.push(createVector(x_points[i],y_points[i]));
	}

	for (var i = 0; i < 5; i++) {
		if(i == 0){
			neurons.push(new Neuron(createVector(random(width),random(height), null, null)));
		}
		else{
			neurons.push(new Neuron(createVector(random(width),random(height), null, null)));
			neurons[i].add_neighbour(neurons[i-1]);
		}
	}

	for (let i = 0; i < neurons.length-1; i++) {
		neurons[i].add_neighbour(neurons[i+1]);
	}

	// neurons[0].add_neighbour(neurons[neurons.length-1]);
	// neurons[neurons.length-1].add_neighbour(neurons[0]);

}

function draw() {
	frameRate(120)
	background(0);
	decay *= 0.999;

	for (let i = 0; i < points.length; i++) {
		fill(255,0,0);
		noStroke();
		ellipse(points[i].x, points[i].y,15,15);

	}
	for (let i = 0; i < temp_points_store.length; i++) {
		fill(255,0,0);
		noStroke();
		ellipse(temp_points_store[i].x, temp_points_store[i].y,15,15);
	}

	for (let i = 0; i < neurons.length; i++) {
		neurons[i].show()
	}
	discriminant_function()

}

function discriminant_function(){
	if(points.length == 0){
		points = temp_points_store.slice();
		temp_points_store = [];
	}

	let rand_num = floor(random(points.length));

	let point = points[rand_num]
	points.splice(rand_num,1);

	temp_points_store.push(point);

	let nearest_neuron = null;
	let that_distance = Infinity;

	for (let i = 0; i < neurons.length; i++) {
		let d = neurons[i].distance_to(point);
		if(d < that_distance){
			nearest_neuron=neurons[i];
			that_distance = d;
		}
	}


	cooperative_Process(nearest_neuron, that_distance, point);
	//update_neighbours();



}

function cooperative_Process(neuron, that_distance, point){


	let n_function = Math.E**((-10^2)/(5^2));



	let dir_x = learning_rate * (neuron.weights.x - point.x);
	let dir_y = learning_rate * (neuron.weights.y - point.y);
	neuron.weights.x -= dir_x*0.1;
	neuron.weights.y -= dir_y*0.1;



	//if(that_distance > 15){
		for (var i = 0; i < neuron.neighbours.length; i++) {
			dir_x = (learning_rate * (neuron.neighbours[i].weights.x - neuron.weights.x));
			dir_y = ( learning_rate * (neuron.neighbours[i].weights.y - neuron.weights.y));
			neuron.neighbours[i].weights.x -= dir_x*decay*0.1;
			neuron.neighbours[i].weights.y -= dir_y*decay*0.1;
		}
	//}

}


function update_neighbours(){
	new_neuron_list = [];
	for (let i = 0; i < neurons.length; i++) {
		for (let j = 0; j < neurons.length; j++) {
			if(i === j){continue;}
			if(neurons[i].distance_to(neurons[j].weights) < neurons[i].distance_to(neurons[i].neighbours[neurons[i].neighbours.length-1].weights)){
				neurons[i].add_neighbour(neurons[j]);
				neurons[j].add_neighbour(neurons[i]);
			}

			// else if(neurons[i].distance_to(neurons[j].weights) < neurons[i].distance_to(neurons[i].neighbours[1].weights)){
			// 	neurons[i].add_neighbour(neurons[j]);
			// }
		}
	}
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