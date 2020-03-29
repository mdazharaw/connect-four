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




singlePlayerBtn.addEventListener("click", function singleButtonPress(event) {
    clickSound.play();
    console.log("Single Player Mode Selected");
    hideButtons();
    turnIndicator();
    drawBoard();
    document.getElementById("gameBoard").style.display = "grid";
})

multiPlayerBtn.addEventListener("click", function multiButtonPress(event) {
    clickSound.play();
    console.log("Multiplayer Mode Selected");
    hideButtons();
    turnIndicator();
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

function turnIndicator() {
    var turnIndicator = document.createElement("h2");
    turnIndicator.display = "block";
    turnIndicator.style.marginTop = "10px";
    turnIndicator.style.marginBottom = "10px";
    turnIndicator.innerHTML = "Red goes first";
    turnIndicator.style.color = "red";
    turnIndicator.id = "turnIndicator";
    document.getElementById("container").insertBefore(turnIndicator, document.getElementById("gameBoard"));
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
    disc.className = "disc";
    disc.id = id;
    disc.onclick = function () {
        // console.log(this.id);
        hoverSound.play();
        changeColour(this.id);
        swapTurn();
        this.onclick = false;
        this.onmouseover = false;
        this.onmouseleave = false;
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

function mapTile(id,value) {
    var split1 = parseInt(id.substr(0, 1));
    var split2 = parseInt(id.substr(1, 1));
    boardArray[split1][split2] = value;
}

function swapTurn(){
    var turnId = document.getElementById("turnIndicator");
    if (turn%2==1){
        turnId.style.color = "yellow";
        turnId.innerText="Yellow's Turn";
        colour = "yellow";

    } else if (turn % 2 == 0) {
        turnId.style.color = "red";
        turnId.innerText = "Red's Turn";
        colour = "red";
    }
    turn++;
}

function changeColour(id){
    var disc = document.getElementById(id);
    if (colour == "yellow"){
        disc.style.backgroundColor = "yellow";
        mapTile(id, "🟡");

    } else if (colour == "red") {
        disc.style.backgroundColor = "red";
        mapTile(id, "🔴");
    }
}

function highlight(id) {
    var disc = document.getElementById(id);
    if (colour == "yellow") {
        disc.style.backgroundColor = "rgb(255, 255, 50, 0.8)";

    } else if (colour == "red") {
        disc.style.backgroundColor = "rgb(255, 50, 50, 0.8)";
    }
}
function dehighlight(id) {
    var disc = document.getElementById(id);
    disc.style.backgroundColor = "rgb(190, 204, 204";
}

function drop(id){
    var tileArr = document.getElementsByName("0")
}
function getColumn(id){
    var column = id.substr(1,1);
    var tileArr = document.getElementsByClassName("disc");
    tileArr = Array.from(tileArr);
    var colArr = [];
    for (disc in tileArr) {
        var discId = disc.id;
        if (discId.substr(1,1) == column){
            colArr.push(disc);
        }
        console.log(colArr[colArr.lastIndexOf]);
        return (colArr[colArr.lastIndexOf]);
    
    };


}
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