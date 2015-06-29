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

  this.getX = function() {
    return x;
  }

  this.getY = function() {
    return y;
  }

  this.toString = function() {
    return "Point ".concat("x: ", x, ", y: ", y);
  }

}

// 0 = unvisited
// 1 = visited
// 2 = dead end
Maze = function() {
  var maze = [];
  var hWalls = [];
  var vWalls = [];
  var startingPoint;

  this.create = function(start) {
    createRowArrays();
    makeAllMazeUnvisited();
    startingPoint = start;
    generate();
  }

  function createRowArrays() {
    for(var i = 0; i < NUM_ROWS; i++)
        maze.push([]);
  }

  function makeAllMazeUnvisited() {
    for(var i = 0; i < NUM_ROWS; i++)
      makeAllRowsUnvisited(maze[i]);
  }

  function makeAllRowsUnvisited(rows) {
    for(var i = 0; i < 10; i++)
      rows.push(0);
  }

  function generate() {
    var currentPoint = startingPoint;
    maze[currentPoint.getY()][currentPoint.getX()] = 1;
    drawWallIfAtMazeEdge(currentPoint);
  }

  function drawWallIfAtMazeEdge(currentPoint) {
    if(currentPoint.getX() == 0)
      addVWallAt(currentPoint);
    if(currentPoint.getX() == 9)
      addVWallAt(new Point(currentPoint.getX() + 1, currentPoint.getY()));

    if(currentPoint.getY() == 0)
      addHWallAt(currentPoint);
    if(currentPoint.getY() == 9)
      addHWallAt(new Point(currentPoint.getX(), currentPoint.getY() + 1));
  }

  function addVWallAt(currentPoint) {
    vWalls.push(currentPoint);
  }

  function addHWallAt(currentPoint) {
    hWalls.push(currentPoint);
  }

  this.report = function() {
    reportMaze();
    reportWalls();
  }

  function reportMaze() {
    alert("" + 
      maze[0].join(" ") + "\n" +
      maze[1].join(" ") + "\n" +
      maze[2].join(" ") + "\n" +
      maze[3].join(" ") + "\n" +
      maze[4].join(" ") + "\n" +
      maze[5].join(" ") + "\n" +
      maze[6].join(" ") + "\n" +
      maze[7].join(" ") + "\n" +
      maze[8].join(" ") + "\n" +
      maze[9].join(" "));
  }

  function reportWalls() {
    alert("" + 
      "H walls\n\n" + 
      hWalls.join("\n") +
      "\n\n" +
      "V walls\n\n" +
      vWalls.join("\n"));
  }

  this.getHWalls = function() {
    return hWalls;
  }

  this.getVWalls = function() {
    return vWalls;
  }

}

Main = function() {

  this.doIt = function() {
    var context = retrieveCanvasContext();
    fillBackground(context);
    new Maze().create(new Point(4, 9));
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

}

Tests = function() {
  var tests = [];
  var results = [];
  var errors = [];
  var failures = [];
  var output = "";

  this.runTests = function() {
    add(testPointX);
    add(testPointY);
    add(testPointToString);
    add(testMazeStartingPointCreatesEdgeWall);
    runTestsFromList();
    printResults();
  }

  function testPointX() {
    var point = new Point(5, 0);
    assertEquals(5, point.getX());
  }

  function testPointY() {
    var point = new Point(0, 8);
    assertEquals(8, point.getY());
  }

  function testPointToString() {
    var point = new Point(3, 5);
    assertEquals("Point x: 3, y: 5", point.toString());
  }

  function testMazeStartingPointCreatesEdgeWall() {
    assertCreatesHWall(new Point(4, 9), new Point(4, 10));
    assertCreatesHWall(new Point(4, 0), new Point(4, 0));
    assertCreatesVWall(new Point(9, 4), new Point(10, 4));
    assertCreatesVWall(new Point(0, 4), new Point(0, 4));
  }

  function assertCreatesVWall(startPoint, wallLocation) {
    var maze = new Maze();
    maze.create(startPoint);
    assertPointEquals(wallLocation, maze.getVWalls()[0]);
  }

  function assertCreatesHWall(startPoint, wallLocation) {
    var maze = new Maze();
    maze.create(startPoint);
    assertPointEquals(wallLocation, maze.getHWalls()[0]);
  }

  function assertPointEquals(expected, actual, message) {
    assertEquals(expected.getX(), actual.getX(), message);
    assertEquals(expected.getY(), actual.getY(), message);
  }

  function assertEquals(expected, actual, message) {
    message = "Assertion Failed: ".concat(
      "expected = ", expected,
      ", actual = ", actual,
      ". ", message);
    if(expected !== actual)
      fail(message);
  }

  function fail(message) {
    throw new Error(message);
  }

  function add(test) {
    tests.push(test);
  }

  function runTestsFromList() {
    for(var i = 0; i < tests.length; i++)
      run(tests[i]);
  }

  function run(test) {
    try {
      test();
      logPass();
    } catch(error) {
      processTestError(error);
    }
  }

  function processTestError(error) {
    isFailure(error) ? logFailure(error) : logError(error);
  }

  function logPass() {
    results.push(".");
  }

  function isFailure(error) {
    return error.toString().slice(0, 24) == "Error: Assertion Failed:";
  }

  function logFailure(failure) {
    results.push("F");
    failures.push(failure);
  }

  function logError(error) {
    results.push("E");
    errors.push(error);
  }

  function printResults() {
    var celebration = "WE DID IT CAP'N!! WE SHIPPED IT!!!";
    var printer = new TestResultsPrinter(results, tests, errors, failures, celebration);
    printer.printResults();
  }

}

TestResultsPrinter = function(results, tests, errors, failures, celebration) {
  var output = "";

  this.printResults = function() {
    logResults();
    logStatistics();
    logCelebrationIfNoErrors();
    logErrors();
    logFailures();
    printLog();
  }

  function logResults() {
    log(results.join(" "));
  }

  function logStatistics() {
    log(numTests() + " tests run, " + numErrors() + " errors, " + numFailures() + " failures.");
  }

  function logCelebrationIfNoErrors() {
    if(numErrors() == 0)
      log(celebration);
  }

  function numTests() {
    return tests.length;
  }

  function numFailures() {
    return failures.length;
  }

  function numErrors() {
    return errors.length;
  }

  function logErrors() {
    forEach(errors, logStack);
  }

  function logFailures() {
    forEach(failures, logStack);
  }

  function logStack(error) {
    logNewline();
    log(error.stack);
  }

  function logNewline() {
    //logging inserts new line. So to log just a new line, log an empty string.
    log("");
  }

  function log(item) {
    output += item + "\n";
  }

  function printLog() {
    console.log(output);
  }

}

function forEach(array, callback) {
  for(var i = 0; i < array.length; i++)
    callback(array[i]);
}

new Main().doIt();
new Tests().runTests();
