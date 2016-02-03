define(function(require) {
  times = require("lib/kris/times.js");
  MazeEdgeDrawer = require("./edge/MazeEdgeDrawer.js");
  MazeJoinDrawer = require("./join/MazeJoinDrawer.js");
  Random = require("../random/Random");
  Drawer = require ("../Drawer");
  
  CANVAS_WIDTH = 400;
  CANVAS_HEIGHT = 400;
  NUM_ROWS = 10;
  NUM_COLUMNS = 10;
  TILE_WIDTH = CANVAS_WIDTH / NUM_ROWS;
  TILE_HEIGHT = CANVAS_HEIGHT / NUM_COLUMNS;
  
  // 0 = unvisited
  // 1 = visited
  // Should seperate maze data object from wall placement functions
  Maze = function(randomGenerator, edgeDrawer, graphicDrawer, joinDrawer) {
    var maze = [];
    var hWalls = [];
    var vWalls = [];
    var jumps = [];
    var startingPoint;
    var graphicDrawer = graphicDrawer;
    var mazeEdgeDrawer = edgeDrawer || new MazeEdgeDrawer();
    var mazeJoinDrawer = joinDrawer || new MazeJoinDrawer();
    mazeEdgeDrawer.setVWallCallback(addVWallAt);
    mazeEdgeDrawer.setHWallCallback(addHWallAt);
    mazeJoinDrawer.setVWallCallback(addVWallAt);
    mazeJoinDrawer.setHWallCallback(addHWallAt);
    randomGenerator = randomGenerator || new Random();

    this.create = function(start) {
      createRowArrays();
      makeAllMazeUnvisited();
      startingPoint = start;
      generate();
      for(var i = 0; i < hWalls.length; i++) {
        graphicDrawer.drawHWallAt(hWalls[i]);
      }
      for(i = 0; i < vWalls.length; i++) {
        graphicDrawer.drawVWallAt(vWalls[i]);
      }
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
      var previousPoint = null;
      var currentPoint = startingPoint;
      var validDirections = [];
      var direction = new Point(0, 0);
      for(i = 0; i < maze.length * maze[0].length; i++) {
        process(currentPoint, previousPoint);
        validDirections = getAllowedDirections(currentPoint);
        direction = randomGenerator.randomElement(validDirections);
        previousPoint = currentPoint;
        currentPoint = (direction ? currentPoint.add(direction) : getUnprocesedCell(currentPoint));
      }
    }

    // inverse functions as wall detection
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

    function process(cell, prevCell) {
      setCellVisited(cell);
      mazeEdgeDrawer.process(cell);
      mazeJoinDrawer.process(cell, prevCell, maze)
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
    
    function getUnprocesedCell(currentPoint) {
      for(var y = 0; y < maze.length; y++) {
        for(var x = 0; x < maze[y].length; x++) {
          if(maze[y][x] === 0) {
            console.log("Start: x: " + currentPoint.getX() + ", y:" + currentPoint.getY()+ "\nNew Point: x: " + x + ", y: " + y + "\n");
            return new Point(x, y);
          }
        }
      }
    }

    this.report = function() {
      reportWalls();
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
