const WORDS = ["HELLO", "STARE", "BRACE", "DRIFT", "FLOSS", "CRASH", "BRIEF", "ALARM", "EQUAL"];
const WORD = WORDS[Math.floor(Math.random() * WORDS.length)];

document.addEventListener("DOMContentLoaded", () => {

    const tiles = document.getElementsByClassName("tile");
    const firstTiles = [1, 6, 11, 16, 21];

    for (let i = 0; i < tiles.length; i++) {
        tiles[i].addEventListener("keydown", (e) => {

            if (keyIsLetter(e.key)) {

                if (endOfRow(tiles[i].id)) {
                    tiles[i].value = e.key.toUpperCase();
                } else {
                    tiles[i].value = e.key.toUpperCase();
                    moveToNextTile(tiles[i + 1]);
                }
            }

            if (!keyIsLetter(e.key)) {
                if (keyIsBackspace(e.key)) {
                    if (firstTiles.includes(parseInt(tiles[i].id))) {
                        tiles[i].focus();
                    } else {
                        moveToPreviousTile(tiles, i);
                    }
                } else if (!keyIsEnter(e.key)) {
                    resetTile(tiles[i])
                }
            }

            if (keyIsEnter(e.key)) {
                if (isLastTileAndhasValue(tiles, i)) {

                    const row = getRow(tiles, i);
                    const userWord = row.map(tile => tile.value).join("");
                    const gameFinished = paintTiles(userWord, row, i + 1);
                    disableRow(row);

                    if (gameFinished) {
                        if (userWord == WORD) {
                            var remainingRows = document.getElementsByClassName("tile");
                            remainingRows = [...remainingRows].filter(tile => parseInt(tile.id) > i + 1);
                            disableRow(remainingRows);
                            updateResult(true);
                        } else {
                            updateResult(false);
                        }
                    }

                } else {
                    alertRowNotFilledOut()
                }
            }
        })
    }

    const reloadBtn = document.getElementById("btn");
    reloadBtn.addEventListener("click", () => {
        location.reload();
    })

});

function disableRow(row) {
    for (let i = 0; i < row.length; i++) {
        row[i].disabled = true;
    }
}

function updateResult(won) {
    const resultHeading = document.getElementById("result");
    if (won) {
        resultHeading.innerHTML = "You got it!";
        resultHeading.classList.add("correct-result");
    } else {
        resultHeading.innerHTML = "Better luck next time!";
        resultHeading.classList.add("wrong-result");
    }
}

function paintTiles(userWord, row, lastTileID) {

    let duplicateWord = WORD;
    let correctTiles = 0;
    for (let i = 0; i < userWord.length; i++) {
        if (userWord[i] == WORD[i]) {
            row[i].classList.add("letter-correct-spot");
            duplicateWord = duplicateWord.replace(userWord[i], "");
            correctTiles++;
        } else if (WORD.includes(userWord[i]) && duplicateWord.includes(userWord[i])) {
            row[i].classList.add("letter-not-correct-spot");
            duplicateWord = duplicateWord.replace(userWord[i], "");
        } else {
            row[i].classList.add("letter-not-included");
        }
    }

    const nextTile = document.getElementById(lastTileID + 1);
    if (nextTile != null) {
        nextTile.disabled = false;
        nextTile.focus();
    } else {
        row[row.length - 1].disabled = true;
    }

    return correctTiles == 5 || lastTileID == 25;

}

function gameWon(row) {
    for (let i = 0; i < row.length; i++) {
        row[i].classList.add("letter-correct-spot");
        row[i].disabled = true;
    }
    const result = document.getElementById("result");
    result.classList.add("correct-result");
    result.innerHTML = "You got it!"
}

function alertRowNotFilledOut() {
    const notEnough = document.getElementsByClassName("not-enough-container")[0];
    notEnough.style.display = "block";
    setTimeout(() => {
        notEnough.style.display = "none";
    }, 1500);
}

function getRow(tiles, i) {
    return [...tiles].filter(tile => parseInt(tile.id) <= i + 1 && parseInt(tile.id) > i - 4);
}

function isPartOfCurrentRow(tile, i) {
    return parseInt(tile.id) <= i + 1 && parseInt(tile.id) > i - 5;
}

function isLastTileAndhasValue(tiles, idx) {
    return parseInt(tiles[idx].id) % 5 == 0 && tiles[idx].value != "";
}

function keyIsEnter(key) {
    return key == "Enter";
}

function resetTile(tile) {
    var delay = 5;
    timeout = setTimeout(function () {
        tile.value = "";
    }, delay);
}

function endOfRow(id) {
    return parseInt(id) % 5 == 0;
}

function moveToNextTile(nextTile) {
    var delay = 50;
    timeout = setTimeout(function () {
        nextTile.disabled = false;
        nextTile.focus();
    }, delay);
}

function moveToPreviousTile(tiles, idx) {
    if (idx == 0) return;
    if (tiles[idx].value == "") {
        tiles[idx].disabled = true;
        tiles[idx - 1].focus();
        tiles[idx - 1].setSelectionRange(tiles[idx - 1].value.length, tiles[idx - 1].value.length);
    } else {
        tiles[idx].value = "";
        tiles[idx].focus();
    }
}

function keyIsBackspace(key) {
    return (key == "Backspace");
}

function keyIsLetter(key) {
    const regex = /^[a-zA-Z]+$/;
    const res = key.match(regex);
    if (res == null) return false;
    return res[0].length == 1;
}