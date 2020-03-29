var singlePlayerBtn = document.getElementById("singlePlayer");
var multiPlayerBtn = document.getElementById("multiPlayer");
var easterEgg = document.getElementById("easterEgg");
var click = 4;
var hoverSound = new sound("audio/hover.mp3");
var clickSound = new sound("audio/click.mp3");
var boardArray = [];
hideButtons();
document.addEventListener("click", start);
document.addEventListener("keypress", start);
var turn = 1;
var firstPlayer = "🔴";
var secondPlayer = "🟡";
var colour = "red";
var startTimer = false;
var gameOver = false;
var winner = "";

singlePlayerBtn.addEventListener("click", function singleButtonPress(event) {
    clickSound.play();
    console.log("Single Player Mode Selected");
    hideButtons();
    showFunctions();
    drawBoard();
    document.getElementById("gameBoard").style.display = "grid";

})
multiPlayerBtn.addEventListener("click", function multiButtonPress(event) {
    clickSound.play();
    console.log("Multiplayer Mode Selected");
    hideButtons();
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

function removeElement(elementId) {
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}

function hideButtons() {
    var buttonDiv = document.getElementById("buttonDiv");
    buttonDiv.style.display = "none";
}

function showButtons() {
    document.removeEventListener("click", start);
    document.removeEventListener("keypress", start);
    var buttonDiv = document.getElementById("buttonDiv");
    buttonDiv.style.display = "flex";
}

function start() {
    clickSound.play();
    removeElement("toStart");
    showButtons();
}

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

function drawBoard() {
    var gameBoard = document.getElementById("gameBoard");
    var i = 1;
    var id = "";
    var row = 0;
    var col = 0;
    while (i <= 49) {
        id = row.toString().concat(col.toString());
        var tile = createTile(id);
        gameBoard.appendChild(tile);
        i++;
        col++;
        if (col == 7) {
            col = 0;
            row++;
            var rowArr = [null, null, null, null, null, null, null];
            boardArray.push(rowArr);
        }

    }

}

function createTile(id) {
    var tile = document.createElement("div");
    tile.className = "tile";
    var disc = document.createElement("div");
    disc.className = "disc empty";
    disc.id = id;
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

function mapTile(id, value) {
    var split1 = parseInt(id.substr(0, 1));
    var split2 = parseInt(id.substr(1, 1));
    boardArray[split1][split2] = value;
}

function swapTurn() {
    var turnId = document.getElementById("turnIndicator");
    if (turn % 2 == 1) {
        turnId.style.color = "yellow";
        turnId.innerText = "Yellow's Turn";
        colour = "yellow";

    } else if (turn % 2 == 0) {
        turnId.style.color = "red";
        turnId.innerText = "Red's Turn";
        colour = "red";
    }
    turn++;
    resetTimer();

}

function changeColour(id) {
    var disc = document.getElementById(id);
    if (colour == "yellow") {
        disc.style.backgroundColor = "yellow";
        mapTile(id, "🟡");

    } else if (colour == "red") {
        disc.style.backgroundColor = "red";
        mapTile(id, "🔴");
    }
}

function highlight(id) {
    var disc = getLastInColumn(id);
    if (colour == "yellow") {
        disc.style.backgroundColor = "rgb(255, 255, 50, 0.8)";

    } else if (colour == "red") {
        disc.style.backgroundColor = "rgb(255, 50, 50, 0.8)";
    }
}
function dehighlight(id) {
    var disc = getLastInColumn(id);
    disc.style.backgroundColor = "rgb(190, 204, 204";
}

function drop(id) {
    var disc = getLastInColumn(id);
    disc.className = "disc filled";
    changeColour(disc.id);
    disc.onclick = false;
    disc.onmouseover = false;
    disc.onmouseleave = false;

}
function getLastInColumn(id) {
    var column = id.substr(1, 1);
    var colArr = [];
    var lastNonFilledElement;
  
    
    var htmlTileArr = document.getElementsByClassName("disc");
    console.log(htmlTileArr);
    for (i = 0; i < htmlTileArr.length; i++) {
        var doc = htmlTileArr[i];
        var docId = doc.id;
        var colId = docId.substr(1,1);
        if (colId == column){
            if(doc.classList.contains("empty")){
                colArr.push(doc);
            }
            
        }
    }
    lastNonFilledElement = colArr[colArr.length-1];
    return lastNonFilledElement;
    };

function updateTimer() {
    if (startTimer) {
        var timer = document.getElementById("timer");
        var time = parseInt(timer.innerText);
        if (time > 0) {
            time -= 1;
            timer.innerText = time;
        } else if (time == 0) {
            swapTurn();

        }
    }
};

function resetTimer() {
    var timer = document.getElementById("timer");
    timer.innerText = 20;
}
setInterval(updateTimer, 1000);
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
