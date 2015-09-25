define(function(require) {
  TestResultsPrinter = function(results, tests, errors, failures, celebration) {
    var output = "";

    this.printResults = function() {
      logResults();
      logStatistics();
      logCelebrationIfNoErrors();
      logErrors();
      logFailures();
      printLog();
    }

    function logResults() {
      log(results.join(" "));
    }

    function logStatistics() {
      log(numTests() + " tests run, " + numErrors() + " errors, " + numFailures() + " failures.");
    }

    function logCelebrationIfNoErrors() {
      if(numErrors() == 0)
        log(celebration);
    }

    function numTests() {
      return tests.length;
    }

    function numFailures() {
      return failures.length;
    }

    function numErrors() {
      return errors.length;
    }

    function logErrors() {
      errors.map(logStack);
    }

    function logFailures() {
      failures.map(logStack);
    }

    function logStack(error) {
      logNewline();
      log(error.stack);
    }

    function logNewline() {
      //logging inserts new line. So to log just a new line, log an empty string.
      log("");
    }

    function log(item) {
      output += item + "\n";
    }

    function printLog() {
      console.log(output);
    }
  }
  return TestResultsPrinter;
});