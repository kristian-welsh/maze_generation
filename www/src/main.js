define(function(require) {
  argsToArray = require("lib/kris/argsToArray.js");
  getFunctionArray = require("lib/kris/getFunctionArray.js");
  
  Point = require("./point/Point");
  Maze = require("./maze/Maze");
  
  TestRunner = require("kris/test/TestRunner");

  MazeTests = require("./maze/MazeTests");
  PointTests = require("./point/PointTests");
  MazeEdgeDrawerTest = require("./maze/edge/MazeEdgeDrawerTest.js");
  
  Random = require("./random/Random");

  Drawer = require("./Drawer");
  
  EDGE_PADDING = 10;
  CANVAS_WIDTH = 500;
  CANVAS_HEIGHT = 500;
  NUM_ROWS = 250;
  NUM_COLUMNS = 250;
  TILE_WIDTH = CANVAS_WIDTH / NUM_ROWS;
  TILE_HEIGHT = CANVAS_HEIGHT / NUM_COLUMNS;
  WALL_DEPTH = 1;

  Main = function() {
    this.doIt = function() {
      var context = retrieveCanvasContext();
      var drawer = new Drawer(context);
      var maze = new Maze(new Random(), new MazeEdgeDrawer(), drawer);
      context.beginPath();
      fillBackground(context);
      context.lineWidth = WALL_DEPTH;
      maze.create(new Point(0, 0));
      context.stroke();
    }

    function retrieveCanvasContext() {
      var canvas = document.getElementById("myCanvas");
      return canvas.getContext("2d");
    }

    function fillBackground(context) {
      context.fillStyle = "#DDDDDD";
      context.fillRect(EDGE_PADDING, EDGE_PADDING, EDGE_PADDING + CANVAS_WIDTH - TILE_WIDTH, EDGE_PADDING + CANVAS_HEIGHT - TILE_HEIGHT);
    }
  }

  new Main().doIt();
  new TestRunner().runTests(PointTests, MazeTests, MazeEdgeDrawerTest);
});
