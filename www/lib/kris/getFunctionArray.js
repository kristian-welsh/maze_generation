define(function(require) {
  function getFunctionArray(object) {
    var properties = Object.getOwnPropertyNames(object);
    var functions = properties.filter(function(p) {
      return typeof object[p] === 'function';
    });
    
    var results = [];
    functions.map(function(f) {
      results.push(object[f]);
    });
    return results;
  }
  return getFunctionArray;
});