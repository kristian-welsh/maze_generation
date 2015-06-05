TILE_WIDTH = 40;

doIt();

function doIt() {
  setupCanvas();
  drawGrid();
}

function setupCanvas() {
  canvas = document.getElementById("myCanvas");
  context = canvas.getContext("2d");
  context.fillStyle = "#DDDDDD";
  context.fillRect(0, 0, 400, 400);
}

function drawGrid() {
  drawVerticalLines();
  drawHorizontalLines();
  context.stroke();
}

function drawVerticalLines() {
  for (var i = 0; i <= 10; i++)
    drawVerticalLine(i);
}

function drawVerticalLine(i) {
  context.moveTo(TILE_WIDTH * i, 0);
  for (var j = 0; j <= 10; j++)
    context.lineTo(TILE_WIDTH * i, TILE_WIDTH * j);
}

function drawHorizontalLines() {
  for (var i = 0; i <= 10; i++)
    drawHorizontalLine(i);
}

function drawHorizontalLine(i) {
  context.moveTo(0, TILE_WIDTH * i);
  for (var j = 0; j <= 10; j++)
    context.lineTo(TILE_WIDTH * j, TILE_WIDTH * i);
}
