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
  drawVertical();
  context.stroke();
}

function drawVertical() {
  for (var i = 0; i <= 10; i++) {
    context.moveTo(40 * i, 0);
    for (var j = 0; j <= 10; j++) {
      context.lineTo(40 * i, 40 * j);
    }
  }
}
