class QuadTree{
    constructor(startX, startY, width, height){
        this.startX = startX;
        this.startY = startY;
        this.width = width;
        this.height = height;
        this.points = [];
        this.children = [];
    }

    addPoint(point){
        if(this.contains(point)){
            if (this.points.length < treeLimit){
                this.points.push(point);
            }
            else{
                if(this.children.length === 0){
                    this.splitSelf();
                }
                for(let child of this.children){
                    child.addPoint(point);
                }
            }
        }
    }

    contains(point){
        return this.startX <= point.x && point.x <= this.startX + this.width &&
               this.startY <= point.y && point.y <= this.startY + this.height;
    }

    splitSelf(){
        this.children.push(new QuadTree(this.startX, this.startY, this.width/2, this.height/2)); //Left top
        this.children.push(new QuadTree(this.startX, this.startY + this.height/2, this.width/2, this.height/2)); //Left bottom
        this.children.push(new QuadTree(this.startX + this.width / 2, this.startY, this.width/2, this.height/2)); //Right top
        this.children.push(new QuadTree(this.startX + this.width / 2, this.startY + this.height/2, this.width/2, this.height/2)); //Right bottom
    }

    show(){
        for(let child of this.children){
            child.show();
        }
        push();
        noFill();
        stroke(255, 255, 255, 100);
        strokeWeight(1);
        rect(this.startX, this.startY, this.width, this.height);
        pop();
    }


}