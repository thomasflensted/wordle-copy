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

### One specific edge case is not handled properly by the word checking algorithm

Example: If the word to be guessed is CLAMP and the user guesses ALARM, the first A will turn orange and the second A will turn green, making it look like the word includes to A's. The simple solution would be to create two seperate loops: One to check for greens and another to check for oranges and greys. This would however mean the greens would animate on before orange and grey, but this could be solved by storing the values in an array and then animating them on thereafter. I do, however, think there is a better algorithmic solution thta I haven't been able to comoe up with yet. 