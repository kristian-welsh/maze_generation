define(function(require) {
  MazeEdgeDrawer = function(addVWallAt, addHWallAt) {
    this.process = function(currentPoint) {
      placeVWallIfAtMazeEdge(currentPoint);
      placeHWallIfAtMazeEdge(currentPoint);
    }
    
    function placeVWallIfAtMazeEdge(currentPoint) {
      if(currentPoint.getX() == 0)
        addVWallAt(currentPoint);
      if(currentPoint.getX() == 9)
        addVWallAt(new Point(currentPoint.getX() + 1, currentPoint.getY()));
    }
    
    function placeHWallIfAtMazeEdge(currentPoint) {
      if(currentPoint.getY() == 0)
        addHWallAt(currentPoint);
      if(currentPoint.getY() == 9)
        addHWallAt(new Point(currentPoint.getX(), currentPoint.getY() + 1));
    }
  }
  return MazeEdgeDrawer;
});