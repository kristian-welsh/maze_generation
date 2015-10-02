define(function(require) {
  MazeEdgeDrawer = require("./MazeEdgeDrawer");
  
  return function(assert) {
    var vWalls;
    var hWalls;
    var drawer;
    
    // Not called by runner like in most testing frameworks, so ake sure to call it before all tests.
    function setUp() {
      vWalls = [];
      hWalls = [];
      drawer = new MazeEdgeDrawer();
      drawer.setVWallCallback(vWallCallback);
      drawer.setHWallCallback(hWallCallback);
    }
    
    function vWallCallback(foundPoint) {
      vWalls.push(foundPoint);
    }
    
    function hWallCallback(foundPoint) {
      hWalls.push(foundPoint);
    }
    
    this.testDrawsTopEdges = function() {
      setUp();
      generalCase(new Point(0, 0), new Point(0, 0), hWalls);
      generalCase(new Point(9, 0), new Point(9, 0), hWalls);
    }
    
    this.testDrawsBottomEdges = function() {
      setUp();
      generalCase(new Point(0, 9), new Point(0, 10), hWalls);
      generalCase(new Point(9, 9), new Point(9, 10), hWalls);
    }
    
    this.testDrawsLeftEdges = function() {
      setUp();
      generalCase(new Point(0, 0), new Point(0, 0), vWalls);
      generalCase(new Point(0, 9), new Point(0, 9), vWalls);
    }
    
    this.testDrawsRightEdges = function() {
      setUp();
      generalCase(new Point(9, 0), new Point(10, 0), vWalls);
      generalCase(new Point(9, 9), new Point(10, 9), vWalls);
    }
    
    function generalCase(creationPoint, expectedWallPoint, expectedWallLocation) {
      drawer.process(creationPoint);
      assert.pointEquals(expectedWallPoint, top(expectedWallLocation));
    }
    
    function top(array) {
      return array[array.length - 1];
    }
  }
});
