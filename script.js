// Global Variables:
var boardArray = []; // Representation of game board
var turn = false; // Toggles turns back and forth
var redPlayerArray = []; // Keeps track of all red players discs
var yellowPlayerArray = []; // Keeps track of all yellow players discs
var colour = "red"; // Starting player colour
var startTimer = false; // Timer status, initially disabled
var winner = ""; // Stores the winning disc type
var winningArray = [] // Stores the set of winning discs
var boardSize = 6; // default board size

// Creating sound objects
var hoverSound = new sound("audio/hover.mp3");
var clickSound = new sound("audio/click.mp3");
var winSound = new sound("audio/win.mp3");

// Initial click and key listeners for starting the game
document.addEventListener("click", start);
document.addEventListener("keypress", start);


//Starting Actions:
hideOptions(); // Option buttons and forms hidden at start
setInterval(updateTimer, 1000); // Create timer to tick every second

//Setting event listeners
var singlePlayerBtn = document.getElementById("singlePlayer");
var multiPlayerBtn = document.getElementById("multiPlayer");
var easterEgg = document.getElementById("easterEgg"); //😏
var click = 4;

singlePlayerBtn.addEventListener("click", function singleButtonPress(event) {
    clickSound.play();
    console.log("Single Player Mode Selected");
    hideOptions();
    showFunctions();
    drawBoard();
    document.getElementById("gameBoard").style.display = "grid";

})
multiPlayerBtn.addEventListener("click", function multiButtonPress(event) {
    clickSound.play();
    console.log("Multiplayer Mode Selected");
    hideOptions();
    showFunctions();
    drawBoard();
    document.getElementById("gameBoard").style.display = "grid";
})

singlePlayerBtn.addEventListener("mouseover", function singleButtonPress(event) {
    hoverSound.play();
})

multiPlayerBtn.addEventListener("mouseover", function multiButtonPress(event) {
    hoverSound.play();
})

easterEgg.addEventListener("click", function (event) {
    if (click >= 1) {
        alert(click);
        click -= 1;
    }
    if (click == 0) {
        console.log("Easter Egg!")
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank")
        click -= 1;
        console.clear();
    }

})


// Helper functions:

// Shortcut function to remove element from parent
function removeElement(elementId) {
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}

// Hides option elements
function hideOptions() {
    var buttonDiv = document.getElementById("buttonDiv");
    buttonDiv.style.display = "none";
    var sizeSelector = document.getElementById("sizeSelector");
    sizeSelector.style.display = "none";
}

// Shows option elements
function showOptions() {
    document.removeEventListener("click", start);
    document.removeEventListener("keypress", start);
    var sizeSelector = document.getElementById("sizeSelector");
    sizeSelector.style.display = "flex";
    var buttonDiv = document.getElementById("buttonDiv");
    buttonDiv.style.display = "flex";
}

// Starts game upon first interaction with page
function start() {
    clickSound.play();
    removeElement("toStart");
    showOptions();
}

// Functions such as restart button, turn indicator and timer shown once game is started
function showFunctions() {

    var restart = document.createElement("h2");
    restart.style.marginTop = "0px";
    restart.style.marginBottom = "20px";
    restart.innerHTML = "🔄";
    restart.style.color = "black";
    restart.id = "restart";
    restart.onclick = function () {
        location.reload();
    };
    document.getElementById("functionals").appendChild(restart);


    var turnIndicator = document.createElement("h2");
    turnIndicator.style.marginTop = "0px";
    turnIndicator.style.marginBottom = "20px";
    turnIndicator.innerHTML = "Red goes first";
    turnIndicator.style.color = "red";
    turnIndicator.id = "turnIndicator";
    document.getElementById("functionals").appendChild(turnIndicator);

    var timerBox = document.createElement("div")
    timerBox.style.width = "35px";
    var timer = document.createElement("h2");
    timer.style.marginTop = "0px";
    timer.style.marginBottom = "20px";
    timer.innerText = 20;
    timer.style.color = "black";
    timer.id = "timer";
    timerBox.appendChild(timer);
    document.getElementById("functionals").appendChild(timerBox);

    setTimeout(function () {
        startTimer = true;
    }, 500);

}

// Gets board size from the selector
function getSize(input) {
    var temp = parseInt(input);
    if (temp != NaN) {
        boardSize = temp;
        console.log(`Board size set to ${boardSize - 1} by ${boardSize}`);
    }

    var style = document.getElementById('gridStyle');
    var autoTemplate = "";
    for (i = 0; i < boardSize; i++) {
        autoTemplate += " auto"
    }
    style.innerHTML = `
  #gameBoard {
  grid-template-columns:${autoTemplate};
  }`;

}

// Updates timer countdown and carries out action on timeout
function updateTimer() {
    if (startTimer) {
        var timer = document.getElementById("timer");
        var time = parseInt(timer.innerText);
        if (time > 0) {
            time -= 1;
            timer.innerText = time;
        } else if (time == 0) {
            alert("Times Up! Next player's turn...");
            swapTurn();

        }
    }
};

// Resets timer countdown to 20
function resetTimer() {
    var timer = document.getElementById("timer");
    timer.innerText = 20;
}

// For creation of sound objects
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}

// Takes in a id in string and outputs row and column attributes in array[int]
function splitId(id) {
    id = id.toString();
    var row = parseInt(id.substr(0, 1));
    var col = parseInt(id.substr(1, 1));
    var array = [row, col];
    return array;
}

// Used for manipulating the ids
function idCalc(id, addRow, addCol) {
    var idArr = splitId(id);
    addRow = parseInt(addRow);
    addCol = parseInt(addCol);
    var row = idArr[0] + addRow;
    var col = idArr[1] + addCol;
    row = row.toString();
    col = col.toString();
    var returnId = row + col;
    return returnId;
}

// Game board creation functions:

// Builds game board based on size of board selected
function drawBoard() {
    var gameBoard = document.getElementById("gameBoard");
    var i = 1;
    var id = "";
    var row = 0;
    var col = 0;
    // Appends a tile to the board via loops, segmented by row and column, id is also assigned to the discs
    while (i <= (boardSize * (boardSize - 1))) {
        id = row.toString().concat(col.toString());
        var tile = createTile(id);
        gameBoard.appendChild(tile);
        i++;
        col++;
        if (col == boardSize) {
            col = 0;
            row++;
            var rowArr = new Array(boardSize).fill(null);
            boardArray.push(rowArr); // Filling up of board array representation
        }

    } return boardArray;

}

//Creates a tile with an empty disc
function createTile(id) {
    var tile = document.createElement("div");
    tile.className = "tile";
    var disc = document.createElement("div");
    disc.className = "disc empty";
    disc.id = id;
    // Designates click and hover behaviour of discs
    disc.onclick = function () {
        // console.log(this.id);
        hoverSound.play();
        drop(this.id);
        swapTurn();
    }
    disc.onmouseover = function () {
        // console.log(this.id);
        highlight(this.id);
    }
    disc.onmouseleave = function () {
        // console.log(this.id);
        dehighlight(this.id);
    }
    tile.appendChild(disc);
    return tile;
}
// Changes colour of disc depending on current player upon hover
function highlight(id) {
    var dropPoint = document.getElementById(id);
    var disc = getLastInColumn(id);
    if (colour == "yellow") {
        disc.style.backgroundColor = "rgb(255, 255, 50,0.7)";
        dropPoint.style.backgroundColor = "rgb(190, 204, 204,0.9)";
    } else if (colour == "red") {
        disc.style.backgroundColor = "rgb(255, 50, 50,0.7)";
        dropPoint.style.backgroundColor = "rgb(190, 204, 204,0.9)";;

    }
}
// Changes colour back to default when not selected
function dehighlight(id) {
    var disc = getLastInColumn(id);
    disc.style.backgroundColor = "rgb(190, 204, 204";
    var dropPoint = document.getElementById(id);
    dropPoint.style.backgroundColor = "rgb(190, 204, 204";

}

// Game play related functions:

// Toggles player turn if winner not found
function swapTurn() {
    var turnId = document.getElementById("turnIndicator");
    if (winner == "") {
        if (turn == false) {
            turnId.style.color = "yellow";
            turnId.innerText = "Yellow's Turn";
            colour = "yellow";
            turn = true;
        } else if (turn == true) {
            turnId.style.color = "red";
            turnId.innerText = "Red's Turn";
            colour = "red";
            turn = false;
        }
        // console.log(turn);
        setTimeout(resetTimer(), 500);
    }
    else if (winner == "🔴") {
        turnId.style.color = "red";
        turnId.innerText = "Red Player Wins!";
        startTimer = false;
        var timer = document.getElementById("timer");
        timer.innerText = "🎉";
        disableRemaining();
        winSound.play();

    }
    else if (winner == "🟡") {
        turnId.style.color = "yellow";
        turnId.innerText = "Yellow Player Wins!";
        startTimer = false;
        var timer = document.getElementById("timer");
        timer.innerText = "🎉";
        disableRemaining();
        winSound.play();

    };


}
// Maps value of played disc into board array
function mapTile(id, value) {
    var split1 = parseInt(id.substr(0, 1));
    var split2 = parseInt(id.substr(1, 1));
    boardArray[split1][split2] = value;
}
// Places a disc at a given id location
function placeDisc(id) {
    var disc = document.getElementById(id);
    if (colour == "yellow") {
        disc.style.backgroundColor = "yellow";
        mapTile(id, "🟡");
        yellowPlayerArray.push(parseInt(id));
        winner = checkWinner();
    } else if (colour == "red") {
        disc.style.backgroundColor = "red";
        mapTile(id, "🔴");
        redPlayerArray.push(parseInt(id));
        winner = checkWinner();
    }
}
// Gets the last empty disc slot in a column
function getLastInColumn(id) {
    var column = id.substr(1, 1);
    var colArr = [];
    var lastNonFilledElement;


    var htmlTileArr = document.getElementsByClassName("disc");
    // console.log(htmlTileArr);
    for (i = 0; i < htmlTileArr.length; i++) {
        var doc = htmlTileArr[i];
        var docId = doc.id;
        var colId = docId.substr(1, 1);
        if (colId == column) {
            if (doc.classList.contains("empty")) {
                colArr.push(doc);
            }

        }
    }
    lastNonFilledElement = colArr[colArr.length - 1];
    return lastNonFilledElement;
};
// Places a disc at the last empty slot in a column
function drop(id) {
    var disc = getLastInColumn(id);
    disc.className = "disc filled";
    placeDisc(disc.id);
    disc.onclick = false;
    disc.onmouseover = false;
    disc.onmouseleave = false;
    // winner = checkWinner(boardArray);
    // console.log(boardArray);


}
// Returns info object of disc by id
function getDiscInfo(docId) {
    docId = docId.toString();
    var rowId = docId.substr(0, 1);
    var colId = docId.substr(1, 1);
    rowId = parseInt(rowId);
    colId = parseInt(colId);
    discId = docId;
    var value = boardArray[rowId][colId];
    var discInfo = {
        row: rowId,
        column: colId,
        colour: value,
        disc: discId,
    }
    return discInfo;
}

// Game Ending / Winning Functions

// Once winner is found, disables remaining discs event listeners
function disableRemaining() {
    var htmlTileArr = document.getElementsByClassName("empty");
    // console.log(htmlTileArr);
    for (i = 0; i < htmlTileArr.length; i++) {
        var disc = htmlTileArr[i];
        disc.onclick = false;
        disc.onmouseover = false;
        disc.onmouseleave = false;
    }
}
// Compares the value of 4 elements, ignoring nulls and undefined
function checkMatch(a, b, c, d) {
    winningArray = [];
    var array = [a, b, c, d];
    if (array.includes(null) || array.includes(undefined)) {
        return false;
    }
    else {
        // console.log(array);
        return ((a != null) && (a == b) && (a == c) && (a == d));
    }
}
// Compares each filled tile with their adjacent tiles to check for winning sets, try catch used to ignore index out of bound errors
function checkWinner() {
    var win = false;
    var horizontalWin, verticalWin, rightDiagonalWin, leftDiagonalWin = false;
    var filledDiscArr = document.getElementsByClassName("filled");
    var discInfoArr = [];
    for (i = 0; i < filledDiscArr.length; i++) {
        var disc = filledDiscArr[i];
        var discId = disc.id;
        var discInfo = getDiscInfo(discId);
        discInfoArr.push(discInfo);
    }
    discInfoArr.reverse(); // traverse array from the bottom up
    // for (var rowId = 0; rowId <= boardSize; rowId++) {
    // for (var colId = 0; colId<= boardSize; colId++) {
    for (id in discInfoArr) {
        var rowId = discInfoArr[id].row;
        var colId = discInfoArr[id].column;
        var colour = discInfoArr[id].colour;
        var discId = discInfoArr[id].disc;


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

            finally {
                if (horizontalWin || verticalWin || rightDiagonalWin || leftDiagonalWin) {
                    win = true;
                    winner = colour;
                    if (horizontalWin) {
                        winningArray = [discId, idCalc(discId, 0, 1), idCalc(discId, 0, 2), idCalc(discId, 0, 3)]
                    }
                    else if (verticalWin) {
                        winningArray = [discId, idCalc(discId, 1, 0), idCalc(discId, 2, 0), idCalc(discId, 3, 0)]
                    }
                    else if (rightDiagonalWin) {
                        winningArray = [discId, idCalc(discId, 1, 1), idCalc(discId, 2, 2), idCalc(discId, 3, 3)]
                    }
                    else if (leftDiagonalWin) {
                        winningArray = [discId, idCalc(discId, -1, 1), idCalc(discId, -2, 2), idCalc(discId, -3, 3)]
                    }
                    highlightWinner(winningArray);
                    console.log(winningArray);
                    // console.log(winner);
                    return winner;
                }
            }
        }
    }
    return winner;

}
// Takes the winning array and applies a class property that allows for blinking of winning tiles
function highlightWinner(winningArray) {

    for (id in winningArray) {
        var winningDisc = document.getElementById(winningArray[id]);
        if (winner == "🔴") {
            winningDisc.className += " red winner";
        } else if (winner == "🟡")
            winningDisc.className += " yellow winner";
    }
}