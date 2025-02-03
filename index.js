const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit");
const resetButton = document.getElementById("reset");
const messages = document.getElementsByClassName("message");
const tooHighMessage = document.getElementById("too-high");
const tooLowMessage = document.getElementById("too-low");
const maxGuessesMessage = document.getElementById("max-guesses");
const numberOfGuessesMessage = document.getElementById("number-of-guesses");
const correctMessage = document.getElementById("correct");

let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//checkGUESS function 
function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);
  attempts = attempts + 1;

  hideAllMessages();
  //Below 1 guesses
  if(guess < 1) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = 'Your guess cannot be less than 1.';
    return;
  }
  //Above 99 guesses
  if(guess > 99){
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = 'Your guess cannot exceed 99.';
    return;
  }
  //Correct guess
  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = "";
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    correctMessage.style.display = ""; 

    submitButton.disabled = true;
    guessInput.disabled = true;
  }
  //Incorrect guess
  if (guess !== targetNumber) {
    if (guess < targetNumber) {
      tooLowMessage.style.display = "";
    } else {
      tooHighMessage.style.display = ""; //bug 3 tooLowMessage was switched to tooHighMessage
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;

    numberOfGuessesMessage.style.display = "";
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
  }
  //bug 1 '===='
  if (attempts === maxNumberOfAttempts) {
    submitButton.disabled = true;
    guessInput.disabled = true;
    maxGuessesMessage.style.display = ""; //bug 4 adds maxGuessesMessage when max guess reached
  }

  guessInput.value = "";

  resetButton.style.display = "";
}

function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    //bug 5 <= changed to <
    messages[elementIndex].style.display = "none";
  }
}
//bug 2
function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  hideAllMessages(); //bug 7 clear messages BEFORE game resets
  // Reset number of attempts
  attempts = 0; //bug 5 maxNumberOfAttempts is const, switched to attempts

  // Enable the input and submit button
  submitButton.disabled = false; //bug 6 typo in .disabled
  guessInput.disabled = false;
  guessInput.value = ""; //bug 8 clears input upon reset
  resetButton.style.display = "none";
}

submitButton.addEventListener("click", checkGuess);
resetButton.addEventListener("click", setup);

setup();
