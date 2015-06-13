CANVAS_WIDTH = 400;
CANVAS_HEIGHT = 400;
NUM_ROWS = 10;
NUM_COLUMNS = 10;
TILE_WIDTH = CANVAS_WIDTH / NUM_ROWS;
TILE_HEIGHT = CANVAS_HEIGHT / NUM_COLUMNS;

LineDrawer = function(context) {
  this.draw = function(xx, yy, numWalls, isVertical, offset) {
    context.moveTo(xx, yy);
    var func = function(curCall) {
      drawWall(xx, yy, offset * curCall, isVertical)
    }
    times(numWalls, func);
  }

  function drawWall(xx, yy, newVal, isVertical) {
    (isVertical) ? yy = newVal : xx = newVal;
    context.lineTo(xx, yy);
  }
}

VerticalDrawer = function(context) {
  var lineDrawer = new LineDrawer(context);
  
  this.draw = function() {
    drawMultipleLines(NUM_ROWS + 1, TILE_WIDTH);
  }

  function drawMultipleLines(numLines, offset) {
    for (var curLine = 0; curLine < numLines; curLine++)
      drawLine(offset * curLine);
  }

  function drawLine(startingX) {
    lineDrawer.draw(startingX, 0, NUM_ROWS + 1, true, TILE_HEIGHT);
  }
}

HorizontalDrawer = function(context) {
  var lineDrawer = new LineDrawer(context);
  
  this.draw = function() {
    drawMultipleLines(NUM_COLUMNS + 1, TILE_HEIGHT);
  }

  function drawMultipleLines(numLines, offset) {
    for (var curLine = 0; curLine < numLines; curLine++)
      drawLine(offset * curLine);
  }

  function drawLine(startingY) {
    lineDrawer.draw(0, startingY, NUM_COLUMNS + 1, false, TILE_WIDTH);
  }
}

Drawer = function(context) {
  this.drawGrid = function() {
    drawVerticalLines();
    drawHorizontalLines();
    context.stroke();
  }

  function drawVerticalLines() {
    new VerticalDrawer(context).draw();
  }

  function drawHorizontalLines() {
    new HorizontalDrawer(context).draw();
  }
}

function times(numCalls, func) {
  for (var curCall = 0; curCall < numCalls; curCall++)
    func(curCall);
}

Point = function(x, y) {
  var x = x;
  var y = y;

  function getX() {
    return x;
  }

  function getY() {
    return y;
  }

  this.toString = function() {
    return "Point ".concat("x: ", x, ", y: ", y);
  }

}

MazeCreator = function() {
  var maze = [];
  var startingPoint;

  this.create = function() {
    createColumnArrays();
    createStartingPoint();
    alert(startingPoint.toString());
    return maze;
  }

  function createColumnArrays() {
    for(var i = 0; i < NUM_COLUMNS; i++)
        maze.push([]);
  }

  function createStartingPoint() {
    startingPoint = new Point(4, 9);
  }

}

Main = function() {

  this.doIt = function() {
    var context = retrieveCanvasContext();
    fillBackground(context);
    var maze = createMaze();
    alert(maze);
    new Drawer(context).drawGrid();
  }

  function createMaze() {
    return new MazeCreator().create();
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

Tests = function() {
  this.runTests = function() {
    testMazeCreation();
  }

  function testMazeCreation() {
    var maze = new MazeCreator();
    assertEquals(10, maze.create().length);
  }

  function assertEquals(expected, actual, message) {
    message = message || "Assertion Failed: ".concat(
      "expected = ", expected,
      ", actual = ", actual,
      ".");
    if(expected !== actual)
      fail(message);
  }

  function fail(message) {
    throw new Error(message);
  }

}

new Main().doIt();
new Tests().runTests();
