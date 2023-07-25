//* Select Unordered List Item Guessed Letters here *//
const guessedLettersElement = document.querySelector(".guessed-letters");
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
const guessedLetters = [];

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
  //Empty message paragraph
  message.innerText = "";
  //What was entered in the input
  const guess = letterInput.value;
  const goodGuess = validateInput(guess);

  if (goodGuess) {
    makeGuess(guess);
  }
  letterInput.value = "";
});

//* Add function to validate player's input *//

const validateInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    //Is the input empty?
    message.innerText = "Please enter a letter A-Z.";
  } else if (input.length > 1) {
    //Did you input more than one letter?
    message.innerText= "Please enter only one letter at a time.";
  } else if (!input.match(acceptedLetter)) {
    //Did you type a number, special character, or something other than a letter A-Z?
    message.innerText = "Please enter only a letter A to Z.";
  } else {
    //Finally only a single letter!
    return input;
  }
};
//* Message if an already played letter is guessed.*//
const makeGuess = function (guess) {
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    message.innerText = "You already guessed, that letter. Try again.";
  } else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
    showGuessedLetters();
    updateWordInProgress(guessedLetters);
  }
};
//*Update page with guessed letters.*//

const showGuessedLetters = function () {
  //clear the list
  guessedLettersElement.innerHTML = "";
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
  }
};

const updateWordInProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealWord = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push("●");
    }
  }
  //console.log(revealWord);
  wordInProgress.innerText = revealWord.join("");
  checkIfWin();
};

const checkIfWin = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word. Congrats!</p>`;
  }
};





