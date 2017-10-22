class Point {
  constructor(x,y,t, parent, s, num_parents, min_allowed_dist) {
    this.x = x;
    this.y = y;
    this.t = t;
    this.parent = parent;
    this.s = floor(s);
    this.num_parents = num_parents;
    this.min_allowed_dist = min_allowed_dist;
  }

  dist(x, y, other){
    if(other != null){
      var a = x - other.x;
      var b = y - other.y;
      return Math.sqrt( a*a + b*b );
    }
  }
}