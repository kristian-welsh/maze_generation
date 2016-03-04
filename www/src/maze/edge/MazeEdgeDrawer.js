define(function(require) {
  
  return function() {
    var addVWallAt;
    var addHWallAt;
    
    this.setVWallCallback = function(callback) {
      addVWallAt = callback;
    }
    
    this.setHWallCallback = function(callback) {
      addHWallAt = callback;
    }
    
    this.process = function(currentPoint) {
      placeVWallIfAtMazeEdge(currentPoint);
      placeHWallIfAtMazeEdge(currentPoint);
    }
    
    function placeVWallIfAtMazeEdge(currentPoint) {
      // leave entrance & exit
      if(currentPoint.getY() == Math.round(NUM_ROWS/2))
        return;
      // draw walls in all other places.
      if(currentPoint.getX() == 0)
        addVWallAt(currentPoint);
      if(currentPoint.getX() == NUM_ROWS - 1)
        addVWallAt(new Point(currentPoint.getX() + 1, currentPoint.getY()));
    }
    
    function placeHWallIfAtMazeEdge(currentPoint) {
      if(currentPoint.getY() == 0)
        addHWallAt(currentPoint);
      if(currentPoint.getY() == NUM_COLUMNS - 1)
        addHWallAt(new Point(currentPoint.getX(), currentPoint.getY() + 1));
    }
  }
});