const WORDS = ["HELLO", "STARE", "BRACE", "DRIFT", "FLOSS", "CRASH", "BRIEF", "ALARM", "EQUAL", "ANVIL", "LEARN", "STAKE", "ZEBRA", "QUILT"];
const WORD = WORDS[Math.floor(Math.random() * WORDS.length)];
const ROW_LENGTH = 5;
const MAX_ACTIONS = 30;

const keyBoardButtons = document.getElementsByClassName("key-tile");
var userWord = "";
var totalUserActions = 0;

document.body.addEventListener("keydown", function handleKeyDown(e) {

    const letter = e.key.toUpperCase();

    // handle letter
    if (keyIsLetter(letter) && userWord.length < ROW_LENGTH) {
        totalUserActions++;
        userWord = handleLetter(userWord, letter, keyBoardButtons, totalUserActions);
    }

    // handle backspace
    if (letter == "BACKSPACE" && userWord.length > 0) {
        userWord = handleBackSpace(userWord, totalUserActions)
        totalUserActions--;
    }

    // handle enter
    if (letter == "ENTER") {
        if (userWord.length < ROW_LENGTH) {
            displayNotEnoughWarning();
        } else {
            const gameWon = handleEnter(userWord, totalUserActions)
            if (!gameWon && totalUserActions < MAX_ACTIONS) {
                userWord = "";
            } else {
                finishGame(gameWon);
                this.removeEventListener("keydown", handleKeyDown);
            }
        }
    }
});

for (let i = 0; i < keyBoardButtons.length; i++) {
    keyBoardButtons[i].addEventListener("click", function handleMouseClick(e) {

        const letter = e.target.innerHTML;

        if (keyIsLetter(letter) && userWord.length < ROW_LENGTH) {
            totalUserActions++;
            userWord = handleLetter(userWord, letter, keyBoardButtons, totalUserActions);
        }

        if (e.target.id == "backspace") {
            if (userWord.length > 0) {
                userWord = handleBackSpace(userWord, totalUserActions);
                totalUserActions--;
            }
        }

        if (letter == "ENTER") {
            if (userWord.length < ROW_LENGTH) {
                displayNotEnoughWarning();
            } else {
                const gameWon = handleEnter(userWord, totalUserActions)
                if (!gameWon && totalUserActions < MAX_ACTIONS) {
                    userWord = "";
                } else {
                    finishGame(gameWon);
                    this.removeEventListener("keydown", handleKeyDown);
                }
            }
        }

    })
}

function getTileColors(guess) {

    var duplicateCheck = WORD;
    var tileColorList = Array(ROW_LENGTH).fill(null);

    for (let i = 0; i < ROW_LENGTH; i++) {
        if (WORD[i] === guess[i]) {
            tileColorList[i] = "green";
            duplicateCheck = duplicateCheck.replace(WORD[i], "");
        }
    }

    for (let i = 0; i < ROW_LENGTH; i++) {
        if (tileColorList[i] == null) {
            if (duplicateCheck.includes(guess[i])) {
                duplicateCheck = duplicateCheck.replace(guess[i], "");
                tileColorList[i] = "orange";
            } else {
                tileColorList[i] = "gray";
            }
        }
    }
    return tileColorList;
}

function finishGame(gameWon) {
    if (gameWon) {
        setTimeout(() => {
            displayGameOverMessage("Yay! You guessed it!", "");
        }, 750);
    } else {
        setTimeout(() => {
            displayGameOverMessage("Better luck next time!", WORD);
        }, 750);
    }
}

function handleEnter(userWord, totalUserActions) {
    animateButtonClick(document.getElementById("enter"));
    const tileColors = getTileColors(userWord);
    const row = getCurrentRow(totalUserActions);
    paintTiles(tileColors, row, userWord);
    return userWord == WORD;

}

function handleLetter(userWord, letter, keyBoardButtons, totalUserActions) {
    userWord += letter; // append letter to word guessed by user
    const currentBoardTile = document.getElementById(totalUserActions); // all tiles have IDs numbered 1-25 in the HTML
    const keyboardButton = getCorrectLetterButton(letter, keyBoardButtons); // find the keyboard button corresponding to the letter clicked by user
    animateButtonClick(keyboardButton); // use the element found above to animate click
    updateBoardTile(currentBoardTile, letter); // update the board tile with the letter clicked
    return userWord;
}

function handleBackSpace(userWord, totalUserActions) {
    const currentBoardTile = document.getElementById(totalUserActions);
    userWord = deleteLetterFromTileAndUpdateWord(currentBoardTile, userWord);
    return userWord;
}

function displayGameOverMessage(msg, word) {

    document.getElementById("game-over-message").innerHTML = word ? msg + "<br>The word was " + word + "." : msg;
    document.getElementById("game-over-screen").style.display = "block";
}

function paintTiles(tileColors, tileRow, word) {

    var indcludedLetters = "";
    for (let i = 0; i < ROW_LENGTH; i++) {
        if (tileColors[i] != "gray") indcludedLetters += word[i];
        setTimeout(() => {
            tileRow[i].classList.add(tileColors[i]);
            if (tileColors[i] == "gray" && !indcludedLetters.includes(word[i])) {
                const letterButton = getCorrectLetterButton(tileRow[i].innerHTML, keyBoardButtons);
                letterButton.classList.add("gray");
            }
        }, i * 100);
    }

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

function getCurrentRow(totalUserActions) {
    return document.getElementById(totalUserActions).parentElement.children;
}

function updateBoardTile(tile, val) {
    tile.innerHTML = val;
    animateButtonClick(tile);
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