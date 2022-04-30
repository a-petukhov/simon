//Declaring buttons & pattern arrays (both computer and user defined)
const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameStarted = false;
let level = 0;

//Generating random integer within given range
function randomInt(min, max) {
  var randomNumber = Math.round(Math.random() * (max - min) + min);
  return randomNumber;
}

//Computer generates visual patern
function nextSequence() {
  let randomNumber = randomInt(0, 3);
  let randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  animateButton(randomChosenColour);
  playSound(randomChosenColour);
  $("h1").text("Level " + level);
  level++;
  userClickedPattern = [];
}

//Registering user inputs and pushing them to the user defined pattern array
$(".btn").on("click", function (e) {
  let userChosenColour = e.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

//Playing audio to the corresponding button
function playSound(name) {
  let currentSound = new Audio("sounds/" + name + ".mp3");
  currentSound.play();
}

//Animating button divs for computer
function animateButton(color) {
  $("#" + color).fadeTo(100, 0.3, function () {
    $(this).fadeTo(500, 1.0);
  });
}

//Animating button divs for user
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
    clearTimeout();
  }, 100);
}

//Starting the game
$(document).keydown(theGame);

//The game logic
function theGame() {
  gameHasStarted = true;
  setTimeout(() => {
    nextSequence();
  }, 1000);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    let wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
      clearTimeout();
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    $(document).on("keydown", startOver);
  }
}

//Restarting the game
function startOver() {
  gamePattern = [];
  gameStarted = false;
  level = 0;
}
