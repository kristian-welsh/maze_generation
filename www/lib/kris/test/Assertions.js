define(function(require) {
  fail = require("lib/kris/fail.js");
  return function() {
    this.createsNoWalls = function(startPoint) {
      var maze = createMaze()
      maze.create(startPoint);
      equals(0, maze.getVWalls().length);
      equals(0, maze.getHWalls().length);
    }

    this.createsVWall = function(wallLocation, maze) {
      this.createsWall(wallLocation, "getVWalls", maze);
    }

    this.createsHWall = function(wallLocation, maze) {
      this.createsWall(wallLocation, "getHWalls", maze);
    }
    
    // WARNING: REFLECTION
    this.createsWall = function(wallLocation, wallRetriver, maze) {
      this.pointEquals(wallLocation, maze[wallRetriver]()[0]);
    }
    
    this.pointEquals = function(expected, actual, message) {
      this.notNull(actual);
      this.equals(expected.getX(), actual.getX(), message);
      this.equals(expected.getY(), actual.getY(), message);
    }

    this.equals = function(expected, actual, message) {
      //if no message was passed in, create one from parameters.
      message = message || "Assertion Failed: ".concat(
        "expected = ", expected,
        ", actual = ", actual,
        ". ", message);
      if(expected !== actual)
        fail(message);
    }

    this.notNull = function(actual, message) {
      message = "Assertion Failed: ".concat(
        "Expected argument to not be null. ", message);
      if(!actual)
        fail(message);
    }

    this.true = function(condition, message) {
      message = "Assertion Failed: ".concat(
        "Expected argument to be true. ", message);
      if(!condition)
        fail(message);
    }
  }
});