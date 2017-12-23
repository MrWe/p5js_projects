board = []
num_opens = 0
c = [0,0]
have_visited = [c]
have_visited_text = ""
to_visit = []
to_visit_text = ""

function setup() {
	createCanvas(1000, 1000);
	for(let i=1; i<11; i++){
		board.push([])
		for(let j=1; j<11; j++){
			chr = ((((j**3 + j*i*(5*i + 12)) >>> 0).toString(2)).match(/1/g)||[]).length % 2 === 0 ? "_" : "#"
			if(chr == "_"){
		    num_opens += 1
			}
	    board[i-1].push(chr)
		}
	}
	print(board)

}

function is_valid_move(x,y){
  if(have_visited_text.indexOf(x.toString() + y.toString()) == -1 && to_visit_text.indexOf(x.toString() + y.toString()) == -1 && x >= 0 && x < board.length && y >= 0 && y < board[0].length && board[x][y] != "#"){
    to_visit.push([x,y])
		to_visit_text += x.toString() + y.toString()
	}
}

function add_valid_moves(){
  is_valid_move(c[0]+1, c[1])
  is_valid_move(c[0]-1, c[1])
  is_valid_move(c[0], c[1]+1)
  is_valid_move(c[0], c[1]-1)
}

function draw() {
	frameRate(10)
	add_valid_moves()
  for(let i=to_visit.length-1; i>= 0; i--){
    have_visited.push(to_visit[i])
		have_visited_text += i.toString() + to_visit[i].toString()
    c = to_visit[i]
		to_visit.splice(to_visit.indexOf(i.toString() + to_visit[i].toString()), 2)
    to_visit.splice(i, 1)
	}

	for(let i=0; i<board.length; i++){
		for(let j=0; j<board[i].length; j++){
			fill(0)
			if(board[j][i] == "_"){fill(255)}
			if(have_visited_text.indexOf(i.toString() + j.toString()) != -1){fill(0,255,0)}
			rect(i*50, j*50, 50, 50)
    }
	}

	//print(num_opens - have_visited.length)
}