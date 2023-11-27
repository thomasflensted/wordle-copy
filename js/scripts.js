// display about dialogue
document.getElementById("about-btn").addEventListener("click", displayAboutDialogue);

// load new game when previous game is finished
document.getElementById("try-again").addEventListener("click", () => {
    location.reload();
});

const backspace = document.getElementById("backspace-icon");
backspace.addEventListener("click", () => {
    backspace.parentElement.click();
})

function displayAboutDialogue() {

    document.getElementById("about-bg").style.display = "block";
    document.getElementById("close-btn").addEventListener("click", () => {
        document.getElementById("about-bg").style.display = "none";
    })
}