define(function(require) {
  // returns any int between and including the arguments.
  function randomIntBetween(lowerBound, upperBound) {
    return Math.round(Math.random() * (upperBound - lowerBound)) + lowerBound;
  }
  return randomIntBetween;
});