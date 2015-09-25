define(function(require) {
  argsToArray = require("lib/kris/argsToArray.js");
  getFunctionArray = require("lib/kris/getFunctionArray.js");
  
  Point = require("./Point");
  Maze = require("./Maze");
  
  TestRunner = require("kris/test/TestRunner");

  MazeTests = require("./MazeTests");
  PointTests = require("./PointTests");
  MazeEdgeDrawerTest = require("./MazeEdgeDrawerTest.js");

  Main = function() {
    this.doIt = function() {
      var context = retrieveCanvasContext();
      var maze = new Maze(null, new MazeEdgeDrawer());
      maze.create(new Point(0, 0));
      maze.report();
      fillBackground(context);
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
