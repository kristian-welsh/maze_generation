define(function(require) {
  return function() {
    this.intInBounds = function(lowest, highest) {
      return Math.round(lowest + Math.random() * (highest - lowest));
    }
    
    this.randomElement = function(array) {
      return array[this.intInBounds(0, array.length - 1)];
    }
  }
});