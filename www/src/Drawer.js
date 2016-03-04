define(function (require) {
  return function(context) {
    this.drawHWallAt = function(point) {
      context.moveTo(EDGE_PADDING + point.getX() * TILE_WIDTH, EDGE_PADDING + point.getY() * TILE_HEIGHT);
      context.lineTo(EDGE_PADDING + (point.getX() + 1) * TILE_WIDTH, EDGE_PADDING + point.getY() * TILE_HEIGHT);
    }

    this.drawVWallAt = function(point) {
      context.moveTo(EDGE_PADDING + point.getX() * TILE_WIDTH, EDGE_PADDING + point.getY() * TILE_HEIGHT);
      context.lineTo(EDGE_PADDING + point.getX() * TILE_WIDTH, EDGE_PADDING + (point.getY() + 1) * TILE_HEIGHT);
    }
  }
});
