var s = function(sketch) {

  sketch.goal_spots = []
  sketch.visible_spots = []
  sketch.num_spots = 200
  sketch.t = 20
  sketch.lr = 0.05
  sketch.should_update = 0;
  sketch.finished = false;


  sketch.font;



  sketch.setup = function() {

    document.body.style['background'] = 'white';
    document.body.style['z_index'] = '100';
    let h = document.body.clientHeight;
    let c = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    c.position(0, 0);
    c.style('pointer-events', 'none');


    for (let i = 0; i < sketch.num_spots; i++) {
  		// x = width/2 + 300 * cos(map(i, 0, num_spots,0, TWO_PI));
  		// y = height/2 + 300 * sin(map(i, 0, num_spots,0, TWO_PI));
  		x = sketch.width/2 + -(sketch.t *  16*sketch.sin(sketch.map(i, 0, sketch.num_spots,0, sketch.TWO_PI))**3)
  		y = sketch.height/2+ -(sketch.t *  13*sketch.cos(sketch.map(i, 0, sketch.num_spots,0, sketch.TWO_PI))-(8*sketch.t)*sketch.cos(2*sketch.map(i, 0, sketch.num_spots,0, sketch.TWO_PI))-2*sketch.cos(3*sketch.map(i, 0, sketch.num_spots,0, sketch.TWO_PI))-sketch.cos(4*sketch.map(i, 0, sketch.num_spots,0, sketch.TWO_PI)))

  		sketch.goal_spots.push(sketch.createVector(x,y))
  	}

    for (let i = 0; i < sketch.goal_spots.length; i++) {
  		x = sketch.width/2 + sketch.width * sketch.cos(sketch.map(i, 0, sketch.num_spots,0, sketch.TWO_PI));
  		y = sketch.height/2 + sketch.height * sketch.sin(sketch.map(i, 0, sketch.num_spots,0, sketch.TWO_PI));

  		sketch.visible_spots.push(sketch.createVector(x,y))
  	}



  }

  sketch.draw = function() {
    sketch.background(255,255,255,0);
    sketch.noStroke()
  	for (let i = 0; i < sketch.visible_spots.length; i++) {
  		sketch.fill(0)
  		sketch.ellipse(sketch.visible_spots[i].x, sketch.visible_spots[i].y,4,4)
  		//vertex(visiblsketch.e_spots[i].x, visible_spots[i].y)
  	  sketch.should_update = sketch.update_visible_spots_towards_goal(i);

  	}
    if(sketch.frameCount % 2 == 0 && !sketch.finished){
      sketch.clear()
      if(sketch.should_update < 0.1){
        sketch.finished = true;
      }
    }
  }

  sketch.update_visible_spots_towards_goal = function(i){

    let x_move = sketch.lr * (sketch.visible_spots[i].x - sketch.goal_spots[i].x);
  	sketch.visible_spots[i].x -= x_move
  	sketch.visible_spots[i].y -= sketch.lr * (sketch.visible_spots[i].y - sketch.goal_spots[i].y);
    return x_move

  }
};

var myp5 = new p5(s);
