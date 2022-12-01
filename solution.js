var words;
var currentWord;
var guessedLetters;
var lives;
var correctLetters;
var numLettersMatched;
var guessInput;
var guessButton;
var restart;
var output;
var availableLetters;
var man;

function setup() {
    availableLetters = "abcdefghijklmnopqrstuvwxyz";
    lives = 5;
    words = ["cat", "dog", "cow", "goat", "deer"];
    currentWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = ""
    correctLetters = ""
    numLettersMatched = 0
    output = document.getElementById("output");
    man = document.getElementById("man");
    guessInput = document.getElementById("letter");
    man.innerHTML = 'You have ' + lives + ' lives remaining';
    output.innerHTML = '';
    document.getElementById("letter").value = '';

    letters = document.getElementById("letters");
    letters.innerHTML = '<li class="current-word">Current word:</li>';

    var letter;
    for (var i = 0; i < currentWord.length; i++) {
        letter = '<li class="letter letter' + currentWord.charAt(i).toUpperCase() + '">' + currentWord.charAt(i).toUpperCase() + '</li>';
        letters.insertAdjacentHTML('beforeend', letter);
    }
    console.log(currentWord)
}

// when to run set up
window.onload = setup()
document.getElementById("restart").onclick = setup;
guessInput.onclick = function () {
    this.value = '';
};

document.getElementById('hangman').onsubmit = function (e) {
    // prevent default
    if (e.preventDefault) e.preventDefault();
    output.innerHTML = '';
    guess = guessInput.value;
    if (guess) {
        console.log(guess)
        //check if valid character
        if (availableLetters.indexOf(guess) == -1) {
            output.innerHTML = "Please enter a valid letter from A-Z"
        }
        //check if already inputted
        else if ((guessedLetters.indexOf(guess) > -1) || (correctLetters.indexOf(guess) > -1)) {
            output.innerHTML = guess.toUpperCase() + " has already been guessed"
        }
        //if correct
        else if (currentWord.indexOf(guess) > -1) {
            //add classes to the list elements
            var lettersToShow;
            lettersToShow = document.querySelectorAll(".letter" + guess.toUpperCase());
            for (var i = 0; i < lettersToShow.length; i++) {
                lettersToShow[i].classList.add("correct");
            }
            //count how many times the element appears correctly in word. This deals with doubles
            for (var j = 0; j < currentWord.length; j++) {
                if (currentWord.charAt(j) == guess) {
                    numLettersMatched += 1;
                }
            }
            correctLetters += guess;
            if (numLettersMatched === currentWord.length) {
                output.innerHTML = "You win"
                man.innerHTML = ''
            }
        }
        else {
            guessedLetters += guess;
            lives--;
            if (lives == 0) {
                output.innerHTML = "GameOver"
                man.innerHTML = ''
            } else {
                man.innerHTML = 'You have ' + lives + ' lives remaining';
            }

        }

    }
}