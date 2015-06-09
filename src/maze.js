CANVAS_WIDTH = 400;
CANVAS_HEIGHT = 400;
NUM_ROWS = 10;
NUM_COLUMNS = 10;
TILE_WIDTH = CANVAS_WIDTH / NUM_ROWS;
TILE_HEIGHT = CANVAS_HEIGHT / NUM_COLUMNS;

Drawer = function(context) {

  this.drawGrid = function() {
    drawVerticalLines();
    drawHorizontalLines();
    context.stroke();
  }

  function drawVerticalLines() {
    drawMultipleLines(drawVerticalLine, NUM_COLUMNS + 1, TILE_HEIGHT);
  }

  function drawHorizontalLines() {
    drawMultipleLines(drawHorizontalLine, NUM_ROWS + 1, TILE_WIDTH);
  }

  function drawMultipleLines(lineDrawingFunction, numLines, offset) {
    for (var curLine = 0; curLine < numLines; curLine++)
      lineDrawingFunction(offset * curLine);
  }

  function drawVerticalLine(x) {
    drawVLine(x, 0, TILE_HEIGHT);
  }

  function drawHorizontalLine(y) {
    drawHLine(0, y, TILE_WIDTH);
  }

  function drawVLine(xx, yy, offset) {
    generalWallDrawing(xx, yy, NUM_ROWS + 1, drawVWall, offset);
  }

  function drawHLine(xx, yy, offset) {
    generalWallDrawing(xx, yy, NUM_COLUMNS + 1, drawHWall, offset);
  }

  function drawVWall(curCall, offset, xx, yy) {
    alert("y: ".concat(yy, ", x: ", xx, ", val: ", offset * curCall));
    yy = offset * curCall;
    context.lineTo(xx, yy);
  }

  function drawHWall(curCall, offset, xx, yy) {
    xx = offset * curCall;
    context.lineTo(xx, yy);
  }

  function generalWallDrawing(xx, yy, numWalls, wallDrawer, offset) {
    context.moveTo(xx, yy);
    var func = function(curCall) {
      wallDrawer(curCall, offset, xx, yy);
    }
    times(numWalls, func);
  }

  function times(numCalls, func) {
    for (var curCall = 0; curCall < numCalls; curCall++)
      func(curCall);
  }

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

new Main().doIt();

