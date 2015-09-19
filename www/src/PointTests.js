define(function(require) {
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
  return PointTests;
});