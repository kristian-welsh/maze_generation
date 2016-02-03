define(function (require) {
  return function(context) {
    WALL_LENGTH = 40;
    this.drawHWallAt = function(point) {
      context.moveTo(point.getX() * WALL_LENGTH, point.getY() * WALL_LENGTH);
      context.lineTo((point.getX() + 1) * WALL_LENGTH, point.getY() * WALL_LENGTH);
    }

    this.drawVWallAt = function(point) {
      context.moveTo(point.getX() * WALL_LENGTH, point.getY() * WALL_LENGTH);
      context.lineTo(point.getX() * WALL_LENGTH, (point.getY() + 1) * WALL_LENGTH);
    }
  }
});
