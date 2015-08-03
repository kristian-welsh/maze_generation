CANVAS_WIDTH = 400;
CANVAS_HEIGHT = 400;
NUM_ROWS = 10;
NUM_COLUMNS = 10;
TILE_WIDTH = CANVAS_WIDTH / NUM_ROWS;
TILE_HEIGHT = CANVAS_HEIGHT / NUM_COLUMNS;

Point = function(x, y) {
  var x = x;
  var y = y;

  this.plus = function (addX, addY) {
    return new Point(x + addX, y + addY);
  }

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
    var vWallPos = new MazeEdger().edgeVFor(currentPoint);
    if(vWallPos)
      addVWallAt(vWallPos);

    var hWallPos = new MazeEdger().edgeHFor(currentPoint);
    if(hWallPos)
      addHWallAt(hWallPos);
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

MazeEdger = function () {
  
  //When given a point it will return a point to draw a horizontal wall at (or null if no wall needed).
  this.edgeHFor = function (pointToCheck) {
    if(pointToCheck.getY() == 0)
      return pointToCheck;
    if(pointToCheck.getY() == 9)
      return pointToCheck.plus(0, 1);
  }

  this.edgeVFor = function (pointToCheck) {
    if(pointToCheck.getX() == 0)
      return pointToCheck;
    if(pointToCheck.getX() == 9)
      return pointToCheck.plus(1, 0);
  }

}

Main = function() {

  this.doIt = function() {
    var context = retrieveCanvasContext();
    fillBackground(context);
    new Maze().create(new Point(4, 9));
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
  var results = new Results();

  this.runTests = function() {
    addTestsToList([
      testPointX,
      testPointY,
      testPointToString,
      testMazeStartingPointAtTopCreatesTopEdgeWall,
      testMazeStartingPointAtBottomCreatesBottomEdgeWall,
      testMazeStartingPointAtLeftCreatesLeftEdgeWall,
      testMazeStartingPointAtRightCreatesRightEdgeWall,
      testMazeStartingPointInMiddleDoesNotCreateEdgeWall,
      testRandomBetween
    ]);
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

  function testMazeStartingPointAtTopCreatesTopEdgeWall() {
    assertCreatesHWall(new Point(0, 0), new Point(0, 0));
    assertCreatesHWall(new Point(9, 0), new Point(9, 0));
  }

  function testMazeStartingPointAtBottomCreatesBottomEdgeWall() {
    assertCreatesHWall(new Point(0, 9), new Point(0, 10));
    assertCreatesHWall(new Point(9, 9), new Point(9, 10));
  }

  function testMazeStartingPointAtLeftCreatesLeftEdgeWall() {
    assertCreatesVWall(new Point(0, 0), new Point(0, 0));
    assertCreatesVWall(new Point(0, 9), new Point(0, 9));
  }

  function testMazeStartingPointAtRightCreatesRightEdgeWall() {
    assertCreatesVWall(new Point(9, 0), new Point(10, 0));
    assertCreatesVWall(new Point(9, 9), new Point(10, 9));
  }

  function testMazeStartingPointInMiddleDoesNotCreateEdgeWall() {
    assertCreatesNoWalls(new Point(1, 1));
    assertCreatesNoWalls(new Point(8, 8));
  }

  function testRandomBetween() {
    for(var i = 0; i < 100; i++)
      assertRandomBetweenWithinBounds(-i, i);
  }

  function assertRandomBetweenWithinBounds(lower, upper) {
    var random = randomIntBetween(lower, upper);
    assertTrue(lower <= random && random <= upper);
  }

  function assertCreatesNoWalls(startPoint) {
    var maze = new Maze();
    maze.create(startPoint);
    assertEquals(0, maze.getVWalls().length);
    assertEquals(0, maze.getHWalls().length);
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
    assertNotNull(actual);
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

  function assertNotNull(actual, message) {
    message = "Assertion Failed: ".concat(
      "Expected argument to not be null. ", message);
    if(!actual)
      fail(message);
  }

  function assertTrue(condition, message) {
    message = "Assertion Failed: ".concat(
      "Expected argument to be true. ", message);
    if(!condition)
      fail(message);
  }

  function fail(message) {
    throw new Error(message);
  }

  function addTestsToList(tests) {
    tests.map(addTest);
  }

  function addTest(test) {
    tests.push(test);
  }

  function runTestsFromList() {
    for(var i = 0; i < tests.length; i++)
      run(tests[i]);
  }

  function run(test) {
    try {
      test();
      results.logPass();
    } catch(error) {
      processTestError(error);
    }
  }

  function processTestError(error) {
    isFailure(error) ? results.logFailure(error) : results.logError(error);
  }

  function isFailure(error) {
    return error.toString().slice(0, 24) == "Error: Assertion Failed:";
  }

  function printResults() {
    results.printResults(tests);
  }

}

Results = function () {
  var results = [];
  var errors = [];
  var failures = [];

  this.logPass = function() {
    results.push(".");
  }

  this.logFailure = function(failure) {
    results.push("F");
    failures.push(failure);
  }

  this.logError = function(error) {
    results.push("E");
    errors.push(error);
  }

  this.printResults = function(tests) {
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
    errors.map(logStack);
  }

  function logFailures() {
    failures.map(logStack);
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

// returns any int between and including the arguments.
function randomIntBetween(lowerBound, upperBound) {
  return Math.round(Math.random() * (upperBound - lowerBound)) + lowerBound;
}

new Main().doIt();
new Tests().runTests();
