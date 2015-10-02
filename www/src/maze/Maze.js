define(function(require) {
  times = require("lib/kris/times.js");
  MazeEdgeDrawer = require("./edge/MazeEdgeDrawer.js");
  Random = require("../random/Random");
  
  CANVAS_WIDTH = 400;
  CANVAS_HEIGHT = 400;
  NUM_ROWS = 10;
  NUM_COLUMNS = 10;
  TILE_WIDTH = CANVAS_WIDTH / NUM_ROWS;
  TILE_HEIGHT = CANVAS_HEIGHT / NUM_COLUMNS;
  
  // 0 = unvisited
  // 1 = visited
  // 2 = path to dead end
  Maze = function(randomGenerator, edgeDrawer) {
    var maze = [];
    var hWalls = [];
    var vWalls = [];
    var startingPoint;
    var mazeEdgeDrawer = edgeDrawer || new MazeEdgeDrawer();
    mazeEdgeDrawer.setVWallCallback(addVWallAt);
    mazeEdgeDrawer.setHWallCallback(addHWallAt);
    randomGenerator = randomGenerator || new Random();

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
      var direction = new Point(0, 0);
      var directionResults = [];
      for(i = 0; i < 55; i++) {
        var directions = getAllowedDirections(currentPoint)
        if(directions.length > 0) {
          direction = randomGenerator.randomElement(directions);
        }
        directionResults.push(direction);
        process(currentPoint);
        currentPoint = currentPoint.add(direction);
      }
      alert(directionResults);
    }
  
    function getAllowedDirections(currentPoint) {
      var returnMe = [];
      if(getCellAt(currentPoint.add(1, 0)) == 0) {
        returnMe.push(new Point(1, 0));
      }
      if(getCellAt(currentPoint.add(-1, 0)) == 0) {
        returnMe.push(new Point(-1, 0));
      }
      if(getCellAt(currentPoint.add(0, 1)) == 0) {
        returnMe.push(new Point(0, 1));
      }
      if(getCellAt(currentPoint.add(0, -1)) == 0) {
        returnMe.push(new Point(0, -1));
      }
      return returnMe;
    }
  
    function randomElement(array) {
      return array[randomFunction(0, array.length - 1)];
    }
  
    function shouldStopGenerating(currentPoint) {
      return currentPoint.getX() >= 10;
    }
    
    function process(cell) {
      setCellVisited(cell);
      mazeEdgeDrawer.process(cell);
    }

    function getCellAt(point) {
      if(point.getY() < 0 || point.getX() < 0 || point.getX() >= 10 || point.getY() >= 10)
        return -1;
      return maze[point.getY()][point.getX()];
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
  return Maze;
});