define(function(require) {
  times = require("lib/kris/times.js");
  MazeEdgeDrawer = require("./MazeEdgeDrawer.js");
  
  CANVAS_WIDTH = 400;
  CANVAS_HEIGHT = 400;
  NUM_ROWS = 10;
  NUM_COLUMNS = 10;
  TILE_WIDTH = CANVAS_WIDTH / NUM_ROWS;
  TILE_HEIGHT = CANVAS_HEIGHT / NUM_COLUMNS;
  
  // 0 = unvisited
  // 1 = visited
  // 2 = path to dead end
  Maze = function(randomFunction, edgeDrawer) {
    var maze = [];
    var hWalls = [];
    var vWalls = [];
    var startingPoint;
    var mazeEdgeDrawer = edgeDrawer || new MazeEdgeDrawer();
    mazeEdgeDrawer.setVWallCallback(addVWallAt);
    mazeEdgeDrawer.setHWallCallback(addHWallAt);

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
  return Maze;
});