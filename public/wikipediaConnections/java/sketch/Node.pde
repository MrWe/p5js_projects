class Node{
  
  String name;
  ArrayList<String> children;
  int ellipseSize;
  PVector pos; 
  int area = 4;
  float scale = 1.0;
  
 Node(String name, ArrayList<String> children){
   this.name = name;
   this.children = children;
   this.ellipseSize = this.name.length()*8;
   this.pos = new PVector(parseInt(random(-width*area, width*area)), parseInt(random(-height*area, height*area)));
 } 
 
 
 void moveNode(){
    if(mouseover()){
        this.pos.x = mouseX;
        this.pos.y = mouseY;
      }
    }

  boolean mouseover(){
    return (dist(this.pos.x, this.pos.y, mouseX, mouseY) < this.ellipseSize/2);
  }
  
  void paintRelation(Node node){
    
      //console.log("Heisann");
      pushStyle();
      //strokeWeight(5);
      if (mouseover()) {
        stroke(0);
        strokeWeight(5);
      }
      line(this.pos.x, this.pos.y, node.pos.x, node.pos.y);
      popStyle();

  }
 
 void show(){
   pushStyle();
   fill(50, 150);
   if(mouseover()){
     fill(50, 200);
   }
   
   ellipse(this.pos.x, this.pos.y, this.ellipseSize*scale, this.ellipseSize*scale);
   
   popStyle();
   
   pushStyle();
   fill(255);
   textSize(12);
   text(this.name, this.pos.x - this.name.length() * 3.3, this.pos.y);
   popStyle();
 
 }
 
}