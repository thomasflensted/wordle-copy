const WORDS = ["HELLO", "STARE", "BRACE", "DRIFT", "FLOSS", "CRASH", "BRIEF", "ALARM", "EQUAL"];
const WORD = WORDS[Math.floor(Math.random() * WORDS.length)];

document.addEventListener("DOMContentLoaded", () => {

    const keyButtons = document.getElementsByClassName("key-tile");
    let clicks = 0;
    let userWord = "";

    for (let i = 0; i < keyButtons.length; i++) {
        keyButtons[i].addEventListener("click", (e) => {
            clicks++;
            const currentTile = getCurrentTile(clicks);
            const key = e.target.innerHTML;
            userWord += key;
            animateButtonClick(keyButtons[i]);
            updateTile(currentTile, key);
        })
    }

    document.body.addEventListener("keydown", (e) => {
        const key = e.key.toUpperCase();

        if (keyIsLetter(key)) {
            userWord += key;
            clicks++;
            const currentTile = getCurrentTile(clicks);
            const letterButton = getCorrectLetterButton(key, keyButtons);
            animateButtonClick(letterButton);
            updateTile(currentTile, key);
        }

        if (key == "BACKSPACE" && clicks > 0) {
            const currentTile = document.getElementById(clicks);
            currentTile.innerHTML = "";
            animateButtonClick(currentTile)
            userWord = userWord.substring(0, userWord.length - 1);
            clicks--;
        }
    })

});

function getCurrentTile(num) {
    return document.getElementById(num);
}

function getCurrentRow(num) {
    const rowID = document.getElementById(num).parentElement.id;
    return parseInt(rowID.charAt(rowID.length - 1));
}

function animateBoardTile(tile) {
    tile.classList.add("clicked");
    setTimeout(() => {
        tile.classList.remove("clicked");
    }, 100);
}

function updateTile(tile, val) {
    tile.innerHTML = val;
    animateBoardTile(tile);
}

function animateButtonClick(button) {
    button.classList.add("clicked");
    setTimeout(() => {
        button.classList.remove("clicked");
    }, 100);
}

function getCorrectLetterButton(key, buttons) {
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].innerHTML == key) {
            return buttons[i];
        }
    }
}

function keyIsLetter(key) {
    const regex = /^[a-z]+$/i;
    const matches = key.match(regex);
    return matches != null && matches[0].length == 1;
}