//* Select Unordered List Item Guessed Letters here *//
const guessedLetters = document.querySelector(".guessed-letters");
//* Select Button Here *//
const guessLetterButton = document.querySelector(".guess");
//* Select Text Input for player's guesses *//
const letterInput = document.querySelector(".letter");
//* Select paragraph where word in progress appears *//
const wordInProgress = document.querySelector(".word-in-progress");
//* Select paragraph where remaining guesses display *//
const remaining = document.querySelector(".remaining");
//* Select span inside paragraph where remaining guesses display *//
const remainingSpan = document.querySelector(".remaining span");
//* Select paragraph where messages will appear when player guesses a letter. *//
const message = document.querySelector(".message");
//* Select hidden button that will appear prompting players to play again. *//
const playAgainButton = document.querySelector(".play-again");

//* Global variable for starting word *//
const word = "magnolia";

//* Display symbols are placeholders for chosen word's letters. *//
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
      console.log(letter);
      placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
  };
  
  placeholder(word);

//* Add Event Listener for Button click *//

guessLetterButton.addEventListener("click", function (e) {
  e.preventDefault();
  const guess = letterInput.value;
  console.log(guess);
  letterInput.value = "";
});





