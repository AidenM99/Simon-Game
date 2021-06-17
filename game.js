var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

var highScore = [];

$(document).keypress(function() {

  if (!started) {

    $("h1").text("Level " + level);

    nextSequence();

    started = true;
  }
});


function nextSequence() {

  userClickedPattern = [];
  level++;
  highScore.push(level);
  $("h1").text("Level " + level);

  var trueHighScore = Math.max.apply(Math, highScore);
  $("h3").text("High Score: " + trueHighScore);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

$(".btn").on("click", function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}


function animatePress(press) {
  var animate = $("#" + press).addClass("pressed");
  setTimeout(function() {
    $("#" + press).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Success!");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").html("Game over! <br> Press any Key to Restart");
    console.log("Failure!");
    startOver();
    $(document).keypress(function() {
      $("body").removeClass("game-over");
    });
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
