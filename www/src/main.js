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

  Main = function() {
    this.doIt = function() {
      var context = retrieveCanvasContext();
      var drawer = new Drawer(context);
      var maze = new Maze(new Random(), new MazeEdgeDrawer(), drawer);
      context.beginPath();
      maze.create(new Point(0, 0));
      maze.report();
      fillBackground(context);
      context.stroke();
      
    }

    function retrieveCanvasContext() {
      var canvas = document.getElementById("myCanvas");
      return canvas.getContext("2d");
    }

    function fillBackground(context) {
      context.fillStyle = "#DDDDDD";
      context.fillRect(0, 0, 400, 400);
    }
  }

  new Main().doIt();
  new TestRunner().runTests(PointTests, MazeTests, MazeEdgeDrawerTest);
});
