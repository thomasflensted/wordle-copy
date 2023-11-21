const WORDS = ["HELLO", "STARE", "BRACE", "DRIFT", "FLOSS", "CRASH", "BRIEF", "ALARM", "EQUAL"];
const WORD = WORDS[Math.floor(Math.random() * WORDS.length)];

const keyButtons = document.getElementsByClassName("key-tile");
var userWord = "";
var totalUserActions = 0;

document.body.addEventListener("keydown", function handleKeyDown(e) {

    const key = e.key.toUpperCase();

    if (keyIsLetter(key) && userWord.length < 5) {
        userWord += key;
        totalUserActions++;
        const currentBoardTile = getCurrentTile(totalUserActions);
        const letterButton = getCorrectLetterButton(key, keyButtons);
        animateButtonClick(letterButton);
        updateTile(currentBoardTile, key);
    }

    if (key == "BACKSPACE" && userWord.length > 0) {
        const currentBoardTile = getCurrentTile(totalUserActions);
        userWord = deleteLetterFromTileAndUpdateWord(currentBoardTile, userWord);
        totalUserActions--;
    }

    if (key == "ENTER") {
        if (userWord.length < 5) {
            displayNotEnoughWarning();
        } else {
            const currentTile = getCurrentTile(totalUserActions);
            const tileRow = currentTile.parentElement.children;
            const gameWon = paintTiles(tileRow, userWord, keyButtons);
            if (gameWon) {
                setTimeout(() => {
                    displayGameOverMessage("Yay! You guessed it!");
                }, 750);
            } else {
                if (totalUserActions == 25) {
                    setTimeout(() => {
                        displayGameOverMessage("Better luck next time!");
                    }, 750);
                } else {
                    userWord = "";
                }
            }
        }
    }
});

for (let i = 0; i < keyButtons.length; i++) {
    keyButtons[i].addEventListener("click", function handleMouseClick(e) {

        const key = e.target.innerHTML;

        if (e.target.id == "backspace") {
            if (userWord.length > 0) {
                const currentBoardTile = document.getElementById(userWord.length);
                userWord = deleteLetterFromTileAndUpdateWord(currentBoardTile, userWord);
                totalUserActions--;
            }
        } else if (userWord.length < 5) {
            userWord += key;
            totalUserActions++;
            const currentBoardTile = getCurrentTile(totalUserActions);
            const letterButton = getCorrectLetterButton(key, keyButtons);
            animateButtonClick(letterButton);
            updateTile(currentBoardTile, key);
        }
    })
}

function displayGameOverMessage(msg) {
    document.getElementById("game-over-message").innerHTML = msg;
    document.getElementById("game-over-screen").style.display = "block";
}

function paintTiles(tileRow, userWord, buttons) {

    var duplicateCheck = WORD;
    var includedLetters = "";
    for (let i = 0; i < userWord.length; i++) {
        setTimeout(() => {
            var currentLetter = userWord[i];
            if (currentLetter == WORD[i]) {
                tileRow[i].classList.add("letter-correct-spot");
                duplicateCheck = duplicateCheck.replace(currentLetter, "");
                includedLetters += currentLetter;
            } else if (WORD.includes(currentLetter) && duplicateCheck.includes(currentLetter)) {
                tileRow[i].classList.add("letter-not-correct-spot");
                duplicateCheck = duplicateCheck.replace(currentLetter, "");
                includedLetters += currentLetter;
            } else {
                tileRow[i].classList.add("letter-not-included");
                const keyButton = getCorrectLetterButton(currentLetter, buttons);
                if (!includedLetters.includes(currentLetter)) {
                    keyButton.classList.add("letter-not-included");
                }
            }
        }, i * 100);
    }

    if (WORD == userWord) return true;
    return false;

}

function displayNotEnoughWarning() {
    document.getElementsByClassName("not-enough-container")[0].style.display = "block";
    setTimeout(() => {
        document.getElementsByClassName("not-enough-container")[0].style.display = "none";
    }, 1500);
}

function deleteLetterFromTileAndUpdateWord(currentTile, word) {
    currentTile.innerHTML = "";
    animateButtonClick(currentTile);
    const backSpaceTile = document.getElementById("backspace");
    animateButtonClick(backSpaceTile);
    return word.substring(0, word.length - 1);
}

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