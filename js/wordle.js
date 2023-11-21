const WORDS = ["HELLO", "STARE", "BRACE", "DRIFT", "FLOSS", "CRASH", "BRIEF", "ALARM", "EQUAL"];
const WORD = WORDS[Math.floor(Math.random() * WORDS.length)];

const keyBoardButtons = document.getElementsByClassName("key-tile"); // all keyboard buttons
var userWord = ""; // letters clicked by user is appended to this string
var totalUserActions = 0; // this counter keeps track of the board tile the user is currently at

document.body.addEventListener("keydown", function handleKeyDown(e) {

    // extract and capitalise character from keydown event
    const letter = e.key.toUpperCase();

    // handle letter
    if (keyIsLetter(letter) && userWord.length < 5) {
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
        if (userWord.length < 5) {
            displayNotEnoughWarning();
        } else {
            const gameWon = handleEnter(totalUserActions, userWord, keyBoardButtons);
            const gameOver = finishGame(gameWon, totalUserActions, userWord);
            if (!gameOver) userWord = "";
        }
    }
});

for (let i = 0; i < keyBoardButtons.length; i++) {
    keyBoardButtons[i].addEventListener("click", function handleMouseClick(e) {

        const letter = e.target.innerHTML;

        if (keyIsLetter(letter) && userWord.length < 5) {
            totalUserActions++;
            userWord = handleLetter(userWord, letter, keyBoardButtons, totalUserActions);
        }

        if (letter == "ENTER") {
            if (userWord.length < 5) {
                displayNotEnoughWarning();
            } else {
                const gameWon = handleEnter(totalUserActions, userWord, keyBoardButtons);
                const gameOver = finishGame(gameWon, totalUserActions, userWord);
                if (!gameOver) userWord = "";
            }
        }

        if (e.target.id == "backspace") {
            if (userWord.length > 0) {
                userWord = handleBackSpace(userWord, totalUserActions);
                totalUserActions--;
            }
        }
    })
}

function finishGame(gameWon, totalUserActions) {
    if (gameWon) {
        setTimeout(() => {
            displayGameOverMessage("Yay! You guessed it!", "");
            return true;
        }, 750);
    } else {
        if (totalUserActions == 25) {
            setTimeout(() => {
                displayGameOverMessage("Better luck next time!", WORD);
                return true;
            }, 750);
        }
    }
    return false;
}

function handleEnter(totalUserActions, userWord, keyBoardButtons) {
    const currentTile = document.getElementById(totalUserActions); // all tiles have IDs numbered 1-25 in the HTML
    const enterTile = document.getElementById("enter");
    animateButtonClick(enterTile);
    const tileRow = currentTile.parentElement.children; // get all tiles in current row. parent is the row, so children are all tiles in the row
    const gameWon = paintTiles(tileRow, userWord, keyBoardButtons); // check userWord agaainst WORD and return true if they are the same, else return false
    return gameWon;
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

    return WORD == userWord;

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

function getCurrentRow(num) {
    const rowID = document.getElementById(num).parentElement.id;
    return parseInt(rowID.charAt(rowID.length - 1));
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