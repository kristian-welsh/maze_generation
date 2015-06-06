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
    for (var currentColumn = 0; currentColumn <= NUM_COLUMNS; currentColumn++)
      drawVerticalLine(currentColumn);
  }

  function drawVerticalLine(currentColumn) {
    var x = TILE_WIDTH * currentColumn;
    context.moveTo(x, 0);
    for (var currentRow = 0; currentRow <= NUM_ROWS; currentRow++)
      context.lineTo(x, TILE_HEIGHT * currentRow);
  }

  function drawHorizontalLines() {
    for (var i = 0; i <= NUM_ROWS; i++)
      drawHorizontalLine(i);
  }

  function drawHorizontalLine(i) {
    context.moveTo(0, TILE_WIDTH * i);
    for (var j = 0; j <= NUM_COLUMNS; j++)
      context.lineTo(TILE_WIDTH * j, TILE_WIDTH * i);
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
