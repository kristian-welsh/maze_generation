define(function(require) {
  times = require("lib/kris/times.js");
  
  function FakeEdgeDrawer() {
    this.setVWallCallback = function(){}
    this.setHWallCallback = function(){}
    
    this.pointsProcessed = [];
    
    this.process = function(point) {
     this.pointsProcessed.push(point);
    }
  }
  
  return function(assert) {
    var fakeEdgeDrawer;
    
    function setUp() {
      fakeEdgeDrawer = new FakeEdgeDrawer();
    }
    
    this.testMazeEdgesAllTopWithStart00UsingEdger = function() {
      setUp();
      var maze = newMazeWithStart(0, 0);
      times(10, assertTopCellProcessed);
    }
    
    function assertTopCellProcessed(cellX) {
      assert.pointEquals(new Point(cellX, 0), fakeEdgeDrawer.pointsProcessed[cellX]);
    }

    function newMazeWithStart(x, y) {
      var maze = createMaze();
      maze.create(new Point(x, y));
      return maze;
    }

    function createMaze(randomFunction, edgeDrawer) {
      randomFunction = randomFunction || fakeRandomFunction;
      edgeDrawer = edgeDrawer || fakeEdgeDrawer;
      return new Maze(randomFunction, edgeDrawer);
    }
    
    function fakeRandomFunction() {
      return 0;
    }
  }
});