# Wordle Replicate

## Description
This is a replicate of the New York Times' game Wordle that I created to practice my programming skills. I built it using HTML, CSS and vanilla JavaScript. I haven't used any frameworks or libraries. 

## Next Steps

### Rebuild with a database of words

Currently, the word is randomly picked from a very short array written directly into the wordle.js file. I have a txt file with the ~3000 most common English 5-letter words. I want to populate a SQL database with those words, so the the word can be picked from that list. I want to keep track of which words the user have already played, so the words don't repeat themselves during a session.

### Make mobile friendly

Right now, the game does not look good on mobile.

## Issues

### Backspace does not work when clicking directly on the backspace icon inside the button

I think this is because the event listener has been added to the button, but not to the i element inside the button. Solution: Add event listener to the i element and make it simulate a click on its parent element, the button.

### Event listeners are still active behind game over screen

The user can still use backspace, letters and enter after a game has finished. All event listeners have to be disabled at game over.