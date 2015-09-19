define(function(require) {
  times = require("lib/kris/times.js");
  argsToArray = require("lib/kris/argsToArray.js");
  getFunctionArray = require("lib/kris/getFunctionArray.js");
  randomIntBetween = require("lib/kris/randomIntBetween.js");
  
  Point = require("./Point");
  Maze = require("./Maze");
  Assertions = require("./Assertions");
  TestRunner = require("./TestRunner");
  Results = require("./results");
  TestResultsPrinter = require("./TestResultsPrinter");
  MazeTests = require("./MazeTests");
  PointTests = require("./PointTests");

  Main = function() {
    this.doIt = function() {
      var context = retrieveCanvasContext();
      var maze = new Maze();
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
  new TestRunner().runTests(PointTests, MazeTests);
});