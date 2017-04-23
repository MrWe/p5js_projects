
JSONObject json;
ArrayList<Node> nodes;
PVector direction;
int directionSpeed = 100;
boolean keyIsPressed = false; 
boolean mouseIsPressed = false;
float scaleChange = 0.1;


void setup(){
  
  size(2000, 1000);
  nodes = new ArrayList<Node>();
  direction = new PVector(0,0);
  
  
  
  json = loadJSONObject("relations2.json");
  ArrayList<String> substrings = new ArrayList<String>();
  for(Object k : json.keys()){
    String[] currName = split(k.toString(), "/");
    String currNameSub = currName[currName.length-1];
    JSONArray children = json.getJSONArray(k.toString());
    //println(children);
    
    String currChild = "";
    for(int i = 0; i < children.size(); i++){
      //println(children.size());
      currChild = children.get(i).toString();
      //println(currChild);
      String[] currChildArr = split(currChild.toString(), "/");
      //println(currChildArr);
      //for(int f=0; f<currChildArr.length; f++){
        
      //}
      currChild = currChildArr[currChildArr.length-1];
      //println(currChild);
      
      if(!substrings.contains(currChild)){
        substrings.add(currChild);
      }
      //println(substrings.size());
      
      
    }
    //println(substrings);
    
    nodes.add(new Node(currNameSub, substrings));
    substrings = new ArrayList<String>();
    //println(json.getJSONArray(k.toString()));
  }
  
  //println(nodes.get(2).children);
}


void draw(){
  background(255);
  frameRate(30);
  for(int i = 0; i < nodes.size(); i++){
    for (int j = 0; j < nodes.size(); j++) {
        if (nodes.get(i).children.contains(nodes.get(j).name) && nodes.get(i) != nodes.get(j)) {
          nodes.get(i).paintRelation(nodes.get(j));
        }
      }
    if (keyIsPressed) {
      nodes.get(i).pos.add(direction);
    }
    if (mouseIsPressed) {
        nodes.get(i).moveNode();
      }
      nodes.get(i).show();
  }
}

void mousePressed() {
  mouseIsPressed = true;
}


void mouseReleased() {
  mouseIsPressed = false;
}

void keyPressed(){
  
  if (keyCode == UP) {
    direction.add(0, directionSpeed);
    keyIsPressed = true;
  } else if (keyCode == DOWN) {
    direction.sub(0, directionSpeed);
    keyIsPressed = true;
  } else if (keyCode == RIGHT) {
    direction.add(-directionSpeed, 0);
    keyIsPressed = true;
  } else if (keyCode == LEFT) {
    direction.sub(-directionSpeed, 0);
    keyIsPressed = true;
  }
  
}

void keyReleased() {
  direction.mult(0);
  keyIsPressed = false;
}