define(function(require) {
  function argsToArray(args) {
    return Array.prototype.slice.call(args);
  }
  return argsToArray;
});