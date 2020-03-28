var singlePlayerBtn = document.getElementById("singlePlayer");
var multiPlayerBtn = document.getElementById("multiPlayer");
var easterEgg = document.getElementById("easterEgg");
var click = 4;
var hoverSound = new sound("audio/hover.mp3");
var clickSound = new sound("audio/click.mp3");
hideButtons();
document.addEventListener("click", start);
document.addEventListener("keypress", start);

singlePlayerBtn.addEventListener("click", function singleButtonPress(event) {
    clickSound.play();
    console.log("Single Player Mode Selected");
    hideButtons();
    drawBoard();
})
multiPlayerBtn.addEventListener("click", function multiButtonPress(event) {
    clickSound.play();
    console.log("Multiplayer Mode Selected");
    hideButtons();
    drawBoard();
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
function drawBoard() {
    var turnIndicator = document.createElement("h2");
    turnIndicator.display = "block";
    turnIndicator.innerHTML = "Red goes first";
    turnIndicator.style.color = "red";
    turnIndicator.id = "turnIndicator";
    document.getElementById("container").insertBefore(turnIndicator, document.getElementById("gameBoard"));



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