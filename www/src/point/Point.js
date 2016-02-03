define(function(require) {
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
    
    this.equals = function(pointToCompare) {
      return x === pointToCompare.getX() && y === pointToCompare.getY();
    }

    this.toString = function() {
      return "Point ".concat("x: ", x, ", y: ", y);
    }
  }
  return Point;
});