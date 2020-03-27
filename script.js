var singlePlayerBtn = document.getElementById("singlePlayer");
var multiPlayerBtn = document.getElementById("multiPlayer");
var easterEgg = document.getElementById("easterEgg");
var click = 4;

singlePlayerBtn.addEventListener("click", function singleButtonPress(event) {
    console.log("Single Player Mode Selected")
    hideButtons()
})
multiPlayerBtn.addEventListener("click", function multiButtonPress(event) {
    console.log("Multiplayer Mode Selected")
    hideButtons()
})

easterEgg.addEventListener("click", function easterEgg(event) {
    if (click >= 1) {
        alert(click)
        click -= 1;
    }
    if (click == 0) {
        console.log("Easter Egg!")
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank")
        click -=1;
        console.clear();
    }

})

function hideButtons() {
    var buttonDiv = document.getElementById("buttonDiv")
    buttonDiv.style.display = "none";
}
