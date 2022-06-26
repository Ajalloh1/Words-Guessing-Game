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