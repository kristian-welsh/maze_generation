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
    for (var curColumn = 0; curColumn <= NUM_COLUMNS; curColumn++)
      drawVerticalLine(TILE_WIDTH * curColumn);
  }

  function drawVerticalLine(x) {
    context.moveTo(x, 0);
    for (var curWall = 0; curWall <= NUM_ROWS; curWall++) {
      var y = TILE_HEIGHT * curWall;
      context.lineTo(x, y);
    }
  }

  function drawHorizontalLines() {
    for (var curRow = 0; curRow <= NUM_ROWS; curRow++)
      drawHorizontalLine(TILE_WIDTH * curRow);
  }

  function drawHorizontalLine(y) {
    context.moveTo(0, y);
    for (var curWall = 0; curWall <= NUM_COLUMNS; curWall++) {
      var x = TILE_WIDTH * curWall;
      context.lineTo(x, y);
    }
  }
}

doIt();

function doIt() {
  var context = retrieveCanvasContext();
  fillBackground(context);
  new Drawer(context).drawGrid();
}

function retrieveCanvasContext() {
  var canvas = document.getElementById("myCanvas");
  return canvas.getContext("2d");
}

function fillBackground(context) {
  context.fillStyle = "#DDDDDD";
  context.fillRect(0, 0, 400, 400);
}
