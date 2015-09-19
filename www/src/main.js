define(function(require) {
  CANVAS_WIDTH = 400;
  CANVAS_HEIGHT = 400;
  NUM_ROWS = 10;
  NUM_COLUMNS = 10;
  TILE_WIDTH = CANVAS_WIDTH / NUM_ROWS;
  TILE_HEIGHT = CANVAS_HEIGHT / NUM_COLUMNS;

  function fail(message) {
   throw new Error(message);
  }

  function times(numCalls, func) {
    for (var curCall = 0; curCall < numCalls; curCall++)
      func(curCall);
  }

  function argsToArray(args) {
    return Array.prototype.slice.call(args);
  }

  function getFunctionArray(object) {
    var properties = Object.getOwnPropertyNames(object);
    var functions = properties.filter(function(p) {
      return typeof object[p] === 'function';
    });
    
    var results = [];
    functions.map(function(f) {
      results.push(object[f]);
    });
    return results;
  }

  // returns any int between and including the arguments.
  function randomIntBetween(lowerBound, upperBound) {
    return Math.round(Math.random() * (upperBound - lowerBound)) + lowerBound;
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
  Maze = function(randomFunction) {
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
    var assert = new Assertions();
    var results = new Results();

    this.runTests = function() {
      addTestSuites(
        new PointTests(assert),
        new MazeTests(assert)
      );
      runTestsFromList();
      printResults();
    }
    
    function addTestSuites() {
      argsToArray(arguments).map(addTestSuite);
    }
    
    // WARNING: REFLECTION - Assumes all public methods are tests.
    function addTestSuite(suiteInstance) {
      getFunctionArray(suiteInstance).map(addTest);
    }

    function addTests() {
      argsToArray(arguments).map(addTest);
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

  PointTests = function(assert) {
    this.testPointX = function() {
      var point = new Point(5, 0);
      assert.equals(5, point.getX());
    }

    this.testPointY = function() {
      var point = new Point(0, 8);
      assert.equals(8, point.getY());
    }

    this.testPointToString = function() {
      var point = new Point(3, 5);
      assert.equals("Point x: 3, y: 5", point.toString());
    }
  }

  MazeTests = function(assert) {
    this.testMazeStartingPointAtTopCreatesTopEdgeWall = function() {
      assert.createsHWall(new Point(0, 0), newMazeWithStart(0, 0));
      assert.createsHWall(new Point(9, 0), newMazeWithStart(9, 0));
    }

    this.testMazeStartingPointAtBottomCreatesBottomEdgeWall = function() {
      assert.createsHWall(new Point(0, 10), newMazeWithStart(0, 9));
      assert.createsHWall(new Point(9, 10), newMazeWithStart(9, 9));
    }

    this.testMazeStartingPointAtLeftCreatesLeftEdgeWall = function() {
      assert.createsVWall(new Point(0, 0), newMazeWithStart(0, 0));
      assert.createsVWall(new Point(0, 9), newMazeWithStart(0, 9));
    }

    this.testMazeStartingPointAtRightCreatesRightEdgeWall = function() {
      assert.createsVWall(new Point(10, 0), newMazeWithStart(9, 0));
      assert.createsVWall(new Point(10, 9), newMazeWithStart(9, 9));
    }

    this.testMazeCreatesAllTopWallsWhenStartedAt00 = function() {
      var maze = createMaze();
      
      var startPoint = new Point(0, 0);
      maze.create(startPoint);
      times(10, function(i) {
        assert.pointEquals(new Point(i, 0), maze.getHWalls()[i]);
      });
    }

    function newMazeWithStart(x, y) {
      var maze = createMaze();
      var startingPoint = new Point(x, y);
      maze.create(startingPoint)
      return maze;
    }

    function createMaze(randomFunction) {
      randomFunction = randomFunction || function() {
        return 0;
      }
      return new Maze(randomFunction);
    }
  }

  Assertions = function() {
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

  new Main().doIt();
  new Tests().runTests();
});