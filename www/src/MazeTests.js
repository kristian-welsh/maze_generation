define(function(require) {
  times = require("lib/kris/times.js");
  
  MazeTests = function(assert) {
    this.testMazeStartingPointAtTopCreatesTopEdgeWall = function() {
      assert.createsHWall(new Point(0, 0), newMazeWithStart(0, 0));
      assert.createsHWall(new Point(9, 0), newMazeWithStart(9, 0));
    }

    this.testMazeStartingPointAtBottomCreatesBottomEdgeWall = function() {
      assert.createsHWall(new Point(0, 10), newMazeWithStart(0, 9));
      assert.createsHWall(new Point(9, 10), newMazeWithStart(9, 9));
    }

    this.testMazeStartingPointAtLeftCreatesLeftEdgeWall = function() {
      assert.createsVWall(new Point(0, 0), newMazeWithStart(0, 0));
      assert.createsVWall(new Point(0, 9), newMazeWithStart(0, 9));
    }

    this.testMazeStartingPointAtRightCreatesRightEdgeWall = function() {
      assert.createsVWall(new Point(10, 0), newMazeWithStart(9, 0));
      assert.createsVWall(new Point(10, 9), newMazeWithStart(9, 9));
    }

    this.testMazeCreatesAllTopWallsWhenStartedAt00 = function() {
      var maze = createMaze();
      
      var startPoint = new Point(0, 0);
      maze.create(startPoint);
      times(10, function(i) {
        assert.pointEquals(new Point(i, 0), maze.getHWalls()[i]);
      });
    }

    function newMazeWithStart(x, y) {
      var maze = createMaze();
      var startingPoint = new Point(x, y);
      maze.create(startingPoint)
      return maze;
    }

    function createMaze(randomFunction) {
      randomFunction = randomFunction || function() {
        return 0;
      }
      return new Maze(randomFunction);
    }
  }
  return MazeTests;
});