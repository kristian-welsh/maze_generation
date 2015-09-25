define(function(require) {
  Results = function () {
    var results = [];
    var errors = [];
    var failures = [];

    this.logPass = function() {
      results.push(".");
    }

    this.logFailure = function(failure) {
      results.push("F");
      failures.push(failure);
    }

    this.logError = function(error) {
      results.push("E");
      errors.push(error);
    }

    this.printResults = function(tests) {
      var celebration = "WE DID IT CAP'N!! WE SHIPPED IT!!!";
      var printer = new TestResultsPrinter(results, tests, errors, failures, celebration);
      printer.printResults();
    }
  }
  return Results;
});