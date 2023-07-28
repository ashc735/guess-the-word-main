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
let word = "magnolia";

let guessedLetters = [];

let remainingGuesses = 8;

//*Add async function to pull data for more word options*//

const getWord = async function () {
  const response = await fetch (
    "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
  );
  const words = await response.text();
  const wordArray = words.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  placeholder(word);
};

//Play the game!
getWord();

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
    updateGuessesRemaining(guess);
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

const updateGuessesRemaining = function (guess) {
  const upperWord = word.toUpperCase();
  if (!upperWord.includes(guess)) {
    message.innerText = `Sorry, the word has no ${guess}.`;
    remainingGuesses -= 1;
  } else { 
    message.innerText = `Good guess! The word has the letter ${guess}.`; 
  }

  if (remainingGuesses === 0) {
    message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
    startOver();
  } else if (remainingGuesses === 1) {
    remainingSpan.innerText = `${remainingGuesses} guess`;
  } else {
    remainingSpan.innerText = `${remainingGuesses} guesses.`;
  }
};
const checkIfWin = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word. Congrats!</p>`;
  startOver();
  }
};
//* Hide the Guess button, remaining guess paragraph, and guessed letters.*//

const startOver = function () {
  guessLetterButton.classList.add("hide");
  remaining.classList.add("hide");
  guessedLettersElement.classList.add("hide");
  playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
  //reset all original values- grab new word
  message.classList.remove("win");
  guessedLetters = [];
  remainingGuesses = 8;
  remainingSpan.innerText = `${remainingGuesses} guesses`;
  guessedLettersElement.innerHTML = "";
  message.innerText = "";
  
  getWord();

  //show the right UI elements
  guessLetterButton.classList.remove("hide");
  playAgainButton.classList.add("hide");
  remaining.classList.remove("hide");
  guessedLettersElement.classList.remove("hide");
});



