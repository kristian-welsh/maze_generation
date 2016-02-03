Tests
=====

Medium Priority
---------------
Test MazeEdgeDrawer seperately from Maze.
Change test system so that a new instance is created for each test run

Low Priority
------------
Use plural detection for logStatistics.
find a way to get rid of all the "this."s in the Assertions class
change "10 tests run, 2 failed, 1 error" to "10 tests run\n 7 passed, 2 failed, 1 error"

Refactoring
===========

Medium Priority
---------------
Typecheck all parameters and throw custom errors.

Low Priority
------------
Redistribute the require lines to their correct files.

Features
========

Bugs
====

High Priority
-------------
When a pathing jumps to a new tile, it closes the passage to the neighbour tile, leading to unreachable areas.

Low Priority
------------
Success message is printed even though i had a failing test.
