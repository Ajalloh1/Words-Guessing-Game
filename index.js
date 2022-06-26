// refrence elements on html page 
var choicesContent = document.querySelector("#choices-menu");
var startMenu = document.getElementById('start-menu');
var questionHeading = document.getElementById('heading1');
var gameClock = document.getElementById('game-clock');
var enterInitialsMenu = document.getElementById('enter-initials-menu');
var enterInitialsBtn = document.getElementById('submit-intials-btn');
var scoresMenu = document.getElementById('scores-menu');
var backToStartLink = document.getElementById('back-to-start-link');
var viewHighScoresLink = document.getElementById('high-scores-link');

// multiple choice questions and answer. logic//
var questions = [
    {
      title: "which is a JS data type?",
      choices: ["tags", "undefined", "window", "objects"],
      answer: "objects"
    },
    {
      title: "An examle of an oject data type is ____.",
      choices: ["tags", "string", "'number'", "Boolean"],
      answer: "Boolean"
    },
    {
      title: "Math.random() returns ____.",
      choices: ["a number between 1 and 9", "a number between 0 and 9", "a number between 0 and 1", "a number between 0 and 99"],
      answer: "a number between 0 and 1"
    }, 
    {
      title: "The appendChild() method places a node as the ____ child.",
      choices: ["first", "last place you left off", "random", "last"],
      answer: "last"
    }, 
    {
      title: "The first index of an array is ____.",
      choices: ["0", "1", "6", "custom"],
      answer: "0"
    }, 
    {
      title: "Javascript was created by ____.",
      choices: ["Jeffrey Javascript", "Brendan Eich", "Who F. Cares Jr.", "Ned Flanders"],
      answer: "Brendan Eich"
    }, 
    {
      title: "What is not an example of an HTML event?",
      choices: ["User hitting a key", "User clicking a mouse", "Web page loading", "Java scripts is easy"],
      answer: "Java scripts is easy"
    }, 
    {
      title: "What tag selects all elements with a href?",
      choices: ["<script>", "<p>", "var", "[href]"],
      answer: "[href]"
    }, 
    {
      title: "Which selects current html elements ______ ",
      choices: ["null", "that", "this", "all of the above"],
      answer: "this"
    }, 
    {
      title: "'Jalloh' can be considered _____ in Javascript",
      choices: ["a string", "a number", "a boolean value", "a shit opinion"],
      answer: "a string"
    }
  ];
  //.default time at start of game.//
var questionNumber = 0;

// Variable containing question array data
// referred to in the functions
var numberOfQuestions = questions.length;
var questionChoices = questions[questionNumber].choices;

// 15 seconds for each question to determine total game time
var gameTimer = numberOfQuestions * 15;

var finalScore;
var highScores = [];

// Check to see if there is an existing array of 
// high scores in the localStorage
renderHighScores()

function renderHighScores() {
    var savedHighScores = localStorage.getItem("high scores");
    
    if (savedHighScores === null) {
        return;
    }
    var objectScores = JSON.parse(savedHighScores);
    // console.log("Saved High Scores: " + savedHighScores);
    highScores = objectScores;
    
}

// Function for when user clicks the start button
function startQuiz() {

    // console.log("Question Number: " + questionNumber);

    // Hide the default start menu
    startMenu.setAttribute("style", "display: none;");
    scoresMenu.setAttribute("style", "display: none;");
    choicesContent.setAttribute("style", "display: block");
    enterInitialsMenu.setAttribute("style", "display: none;");
    choicesContent.innerHTML = " ";
    viewHighScoresLink.setAttribute("style", "display: none;");

    // Start countdown clock
    countdownClock();

    // Place first question in h1 and create buttons
    // of the multiple choice answers below
    questionHeading.textContent = questions[questionNumber].title;
    listChoices();

}

function listChoices() {
    // Loop through the available choices in
    // the given question array index
    for (var i = 0; i < questionChoices.length; i++) {
        // Create, build, and place the available choices
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("class", "btn btn-dark btn-sm d-block my-2 choice-btn");
        choiceBtn.setAttribute("id", "choice-" + i );
        choiceBtn.textContent = questions[questionNumber].choices[i];
        choicesContent.appendChild(choiceBtn);

    }
}

// Notify user that chosen answer is correct.//
function correctAnswer() {
    var correctNotify = document.createElement("div");
    correctNotify.setAttribute("class", "border-top mt-3 pt-3")
    correctNotify.setAttribute("style", "font-size: 12px; color: green; font-weight: bold;");
    correctNotify.textContent = "You got the answer right!";
    choicesContent.appendChild(correctNotify);
}

// alert user that choisen answer is wrong
function incorrectAnswer() {
    var incorrectNotify = document.createElement("div");
    incorrectNotify.setAttribute("class", "border-top mt-3 pt-3");incorrectNotify.setAttribute("style", "font-size: 12px; color: red; font-weight: bold;");
    incorrectNotify.textContent = "You got the answer wrong!";
    choicesContent.appendChild(incorrectNotify);
}

// The timer that counts down when the game is started
function countdownClock() {
    var timerInterval = setInterval(function() {
        // Display time and decrease by second
        gameClock.textContent = gameTimer;
        gameTimer--;

        // Once the timer hits zero, game is ended
        if (gameTimer <= 0) {
            clearInterval(timerInterval);
            gameClock.textContent = "0";
            choicesContent.innerHTML = " ";
            questionNumber = 0;
            choicesContent.setAttribute("display", "none");
            startMenu.setAttribute("style", "display: block;");
            questionHeading.textContent = "Your score is: " +  gameTimer;
            gameTimer = numberOfQuestions * 15;
        } 
        // Freeze clock if user runs through all the questions and end game
        else if (questionNumber === 10) {
            clearInterval(timerInterval);
            // Reset stats so user can start a new game
            questionNumber = 0;
            gameTimer = numberOfQuestions * 15;
        }

    }, 1000);
} 


// Add event to the button choices and see if what the 
// user clicks matches the answer in the questions array
document.addEventListener("click", function(event) {
    if (event.target.matches('.choice-btn')) {
        // console.log(event.target.textContent);
        event.stopPropagation();
        event.preventDefault();
        // Condition if user selects correct answer
        if (event.target.textContent === questions[questionNumber].answer) {
            
            

            // Move on to the next question
            questionNumber = questionNumber + 1;
            // Add time to the clock
            gameTimer += 5;

            if (questionNumber <= (numberOfQuestions - 1)) {
                questionHeading.textContent = questions[questionNumber].title;
                    // Run function to clear buttons
                    // and list new choices
                choicesContent.innerHTML = " ";
                listChoices();
                // Inform user that they got the right answer
                correctAnswer();
                // console.log("Question Number: " + questionNumber);
            } else {
                // End of game so clear any trace of choices
                choicesContent.innerHTML = " ";
                // Inform user that they got the right answer
                correctAnswer();
                // Bring up input for user to enter in their high score
                enterInitialsMenu.setAttribute("style", "display: block;");
                // Allow user to restart quiz
                startMenu.setAttribute("style", "display: block;");
                viewHighScoresLink.setAttribute("style", "display: inline;");
                // Display the user's final score
                questionHeading.textContent = "Your score is: " +  gameTimer;
                // User's final score is equal to the time left in the game
                finalScore = gameTimer;
            }

            
        } 
        // Condition if user selects wrong answer
        else if (event.target.textContent !== questions[questionNumber].answer) {
            
            // Move on to the next question
            questionNumber = questionNumber + 1;
            // Remove time from the clock
            gameTimer -= 15;

            if (questionNumber <= (numberOfQuestions - 1)) {
                questionHeading.textContent = questions[questionNumber].title;
                    // Run function to clear buttons
                    // and list new choices
                choicesContent.innerHTML = " ";
                listChoices();
                // Inform user that they got the wrong answer
                incorrectAnswer();
            } else {
                // End of game so clear any trace of choices
                choicesContent.innerHTML = " ";
                // Inform user that they got the wrong answer
                incorrectAnswer();
                // Bring up input for user to enter in their high score
                enterInitialsMenu.setAttribute("style", "display: block;");
                // Allow user to restart quiz
                startMenu.setAttribute("style", "display: block;");
                viewHighScoresLink.setAttribute("style", "display: inline;");
                // Display the user's final score
                questionHeading.textContent = "Your score is: " +  gameTimer;
                // User's final score is equal to the time left in the game
                finalScore = gameTimer;
            }
            
            
        }
    }
});

function enterInitials(event) {
    event.preventDefault();
    // Take the value the user enters into the input after game ends
    var userInitials = document.getElementById('initials-input').value;
    
    // Object containing the user initials and final score
    var userScores = {
        initials: userInitials,
        score: finalScore
    };

    // Push the above object into the high scores array
    highScores.push(userScores);
    // console.log(highScores);

    // Convert the object into a string
    var highScoresString = JSON.stringify(highScores);

    // Store the string into the user's local storage
    window.localStorage.setItem("high scores", highScoresString);

    // Inform user their score is now entered
    questionHeading.textContent = "You have entered your score. Play again?";
    enterInitialsMenu.setAttribute("style", "display: none;");
    choicesContent.innerHTML = " ";

}