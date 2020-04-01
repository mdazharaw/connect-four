### Approach and Process
__What in my process and approach to this project would I do differently next time?__
* Possibly in future, core mechanics of an application should be dealt with first rather than styling.

__What in my process and approach to this project went well that I would repeat next time?__
* In my current approach, styling was done first as it was the least intensive activity. 
* I think it is ok to categorize activities by complexity and completing simpler tasks first such that small victories can build confidence when tackling bigger tasks.
* As such I might carry forward this approach next time.
--------------------------------------------------------------------------------------------------

### Code and Code Design
__What in my code and program design in the project would I do differently next time?__
* Probably I would try to reduce reliance on try catch instances, or if its required have proper exception handling.

```javascript
 if (win == false) {
            try {
                horizontalWin = checkMatch(boardArray[rowId][colId], boardArray[rowId][colId + 1], boardArray[rowId][colId + 2], boardArray[rowId][colId + 3]);

            } catch (error) { }
            try {
                verticalWin = checkMatch(boardArray[rowId][colId], boardArray[rowId + 1][colId], boardArray[rowId + 2][colId], boardArray[rowId + 3][colId]);

            } catch (error) { }
            try {
                rightDiagonalWin = checkMatch(boardArray[rowId][colId], boardArray[rowId + 1][colId + 1], boardArray[rowId + 2][colId + 2], boardArray[rowId + 3][colId + 3]);

            } catch (error) { }
            try {
                leftDiagonalWin = checkMatch(boardArray[rowId][colId], boardArray[rowId - 1][colId + 1], boardArray[rowId - 2][colId + 2], boardArray[rowId - 3][colId + 3]);

            } catch (error) { }
    return winner;
```
__What in my code and program design in the project went well? Is there anything I would do the same next time?__
* Categorisation of functions by usage
* Modularity of functions, eg creating multiple sub functions and calling them under a single function, making it easier to manipulate behaviour of function
```javascript

// Set of actions to be done by CPU during its turn
function cpuAction() {
    counterMeasure();
    alertModal();
    swapTurn();
}
```
--------------------------------------------------------------------------------------------------

### WDI Unit 1 Post Mortem

__What habits did I use during this unit that helped me?__
* Creating reusable function code blocks rather than repeated copy pasting.

__What habits did I have during this unit that I can improve on?__
* Improper exception handling that needs to be improved on.

__How is the overall level of the course during this unit? (instruction, course materials, etc.)__
* All in all unit was well paced and structured, allow for certain amount of challenge but not to an unreasonable degree.
