CANVAS_WIDTH = 400;
CANVAS_HEIGHT = 400;
NUM_ROWS = 10;
NUM_COLUMNS = 10;
TILE_WIDTH = CANVAS_WIDTH / NUM_ROWS;
TILE_HEIGHT = CANVAS_HEIGHT / NUM_COLUMNS;

function times(numCalls, func) {
  for (var curCall = 0; curCall < numCalls; curCall++)
    func(curCall);
}

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

  this.add = function(pointToAdd) {
    if(arguments.length === 1)
      return new Point(arguments[0].getX() + this.getX(), arguments[0].getY() + this.getY());
    else if(arguments.length === 2)
      return new Point(arguments[0] + this.getX(), arguments[1] + this.getY());
    throw new Error("unexpected arguments in Point::add");
  }

  this.toString = function() {
    return "Point ".concat("x: ", x, ", y: ", y);
  }

}

// 0 = unvisited
// 1 = visited
// 2 = path to dead end
Maze = function() {
  var maze = [];
  var hWalls = [];
  var vWalls = [];
  var startingPoint;
  var mazeEdgeDrawer = new MazeEdgeDrawer(addVWallAt, addHWallAt)

  this.create = function(start) {
    createRowArrays();
    makeAllMazeUnvisited();
    startingPoint = start;
    generate();
  }

  function createRowArrays() {
    times(NUM_ROWS, function() {
      maze.push([]);
    });
  }

  function makeAllMazeUnvisited() { 
    times(NUM_ROWS, function(i) {
      makeAllColumnsUnvisited(maze[i]);
    });
  }

  function makeAllColumnsUnvisited(row) {
    times(NUM_COLUMNS, function() {
      row.push(0);
    });
  }

  function generate() {
    var currentPoint = startingPoint;
    do {
      process(currentPoint);
      currentPoint = currentPoint.add(1, 0);
    } while (currentPoint.getX() < 10)
    //process(currentPoint);
  }
  
  function process(cell) {
    setCellVisited(cell);
    mazeEdgeDrawer.process(cell);
  }

  function setCellVisited(currentPoint) {
    maze[currentPoint.getY()][currentPoint.getX()] = 1;
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

MazeEdgeDrawer = function(addVWallAt, addHWallAt) {
  this.process = function(currentPoint) {
    placeVWallIfAtMazeEdge(currentPoint);
    placeHWallIfAtMazeEdge(currentPoint);
  }
  
  function placeVWallIfAtMazeEdge(currentPoint) {
    if(currentPoint.getX() == 0)
      addVWallAt(currentPoint);
    if(currentPoint.getX() == 9)
      addVWallAt(new Point(currentPoint.getX() + 1, currentPoint.getY()));
  }
  
  function placeHWallIfAtMazeEdge(currentPoint) {
    if(currentPoint.getY() == 0)
      addHWallAt(currentPoint);
    if(currentPoint.getY() == 9)
      addHWallAt(new Point(currentPoint.getX(), currentPoint.getY() + 1));
  }
}

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

// In future i would like to seperate each class's tests into 1 class each inheriting from tests.
// I  would also like to test MazeEdgeDrawer seperately from MazeCreator.
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
      testRandomBetween,
      testMazeCreatesAllTopWallsWhenStartedAt00
    ]);
    runTestsFromList();
    printResults();
  }
  
  function createMaze(randomFunction = null) {
    randomFunction = randomFunction || function() {
      return 0;
    }
    return new Maze(randomFunction);
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

  function testRandomBetween() {
    for(var i = 0; i < 100; i++)
      assertRandomBetweenWithinBounds(-i, i);
  }
  
  function testMazeCreatesAllTopWallsWhenStartedAt00() {
    var maze = createMaze();
    
    var startPoint = new Point(0, 0);
    maze.create(startPoint);
    times(10, function(i) {
      assertPointEquals(new Point(i, 0), maze.getHWalls()[i]);
    });
  }

  function assertRandomBetweenWithinBounds(lower, upper) {
    var random = randomIntBetween(lower, upper);
    assertTrue(lower <= random && random <= upper);
  }

  function assertCreatesNoWalls(startPoint) {
    var maze = createMaze()
    maze.create(startPoint);
    assertEquals(0, maze.getVWalls().length);
    assertEquals(0, maze.getHWalls().length);
  }

  function assertCreatesVWall(startPoint, wallLocation) {
    assertCreatesWall(startPoint, wallLocation, "getVWalls");
  }

  function assertCreatesHWall(startPoint, wallLocation) {
    assertCreatesWall(startPoint, wallLocation, "getHWalls");
  }
  
  // WARNING: REFLECTION
  function assertCreatesWall(startPoint, wallLocation, wallRetriver) {
    var maze = createMaze();
    maze.create(startPoint);
    assertPointEquals(wallLocation, maze[wallRetriver]()[0]);
  }
  
  function assertPointEquals(expected, actual, message) {
    assertNotNull(actual);
    assertEquals(expected.getX(), actual.getX(), message);
    assertEquals(expected.getY(), actual.getY(), message);
  }

  function assertEquals(expected, actual, message) {
    //if no message was passed in, create one from parameters.
    message = message || "Assertion Failed: ".concat(
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
