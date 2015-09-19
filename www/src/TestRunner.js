define(function(require) {
  // I  would like to test MazeEdgeDrawer seperately from MazeCreator.
  TestRunner = function() {
    var tests = [];
    var assert = new Assertions();
    var results = new Results();

    this.runTests = function() {
      argsToArray(arguments).map(addTestClass);
      runTestsFromList();
      printResults();
    }
    
    function addTestClass(testClass) {
      addTestSuite(new testClass(assert));
    }
    
    // WARNING: REFLECTION - Assumes all public methods are tests.
    function addTestSuite(suiteInstance) {
      getFunctionArray(suiteInstance).map(addTest);
    }

    function addTests() {
      argsToArray(arguments).map(addTest);
    }

    function addTest(test) {
      tests.push(test);
    }

    function runTestsFromList() {
      for(var i = 0; i < tests.length; i++)
        run(tests[i]);
    }

    function run(test) {
      try {
        test();
        results.logPass();
      } catch(error) {
        processTestError(error);
      }
    }

    function processTestError(error) {
      isFailure(error) ? results.logFailure(error) : results.logError(error);
    }

    function isFailure(error) {
      return error.toString().slice(0, 24) == "Error: Assertion Failed:";
    }

    function printResults() {
      results.printResults(tests);
    }
  }
  return TestRunner;
});