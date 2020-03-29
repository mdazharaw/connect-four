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
function start(){
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

function drawBoard(){
    var gameBoard = document.getElementById("gameBoard");
    i = 0;
    while (i<49){
        var tile = document.createElement("div");
        tile.className = "tile";
        var disc = document.createElement("div");
        disc.className = "disc";
        disc.id = i;
        disc.onclick = function () {
            hoverSound.play();
        }
        tile.appendChild(disc);
        gameBoard.appendChild(tile);
        i++ ;
    }
    
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