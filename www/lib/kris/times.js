define(function(require) {
  function times(numCalls, func) {
    for (var curCall = 0; curCall < numCalls; curCall++)
      func(curCall);
  }
  return times;
});