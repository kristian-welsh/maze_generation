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
    
    this.process = function(currentPoint, previousPoint, maze) {
      placeVWallIfAtJoin(currentPoint, previousPoint, maze);
      placeHWallIfAtJoin(currentPoint, previousPoint, maze);
    }
    
    function placeVWallIfAtJoin(currentPoint, previousPoint, maze) {
      if(getCellAt(currentPoint.add(1, 0), maze) == 1 && !currentPoint.add(1, 0).equals(previousPoint)) {
        addVWallAt(currentPoint.add(1, 0));
      }
      if(getCellAt(currentPoint.add(-1, 0), maze) == 1 && !currentPoint.add(-1, 0).equals(previousPoint)) {
        addVWallAt(currentPoint);
      }
    }
    
    function placeHWallIfAtJoin(currentPoint, previousPoint, maze) {
      if(getCellAt(currentPoint.add(0, 1), maze) == 1 && !currentPoint.add(0, 1).equals(previousPoint)) {
        addHWallAt(currentPoint.add(0, 1));
      }
      if(getCellAt(currentPoint.add(0, -1), maze) == 1 && !currentPoint.add(0, -1).equals(previousPoint)) {
        addHWallAt(currentPoint);
      }
    }
    
    function getCellAt(point, maze) {
      if(point.getY() < 0 || point.getX() < 0 || point.getX() >= NUM_COLUMNS || point.getY() >= NUM_ROWS)
        return -1;
      return maze[point.getY()][point.getX()];
    }
  }
});
