
var userClickPattern = [];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var started = false;

var level = 0;

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


function nextSequence ()
{
  userClickPattern = [];
  level++;

  $("#level-title").text("level " +level);
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

$(".btn").click(function()
{
  var userChosenColour = $(this).attr("id");

  userClickPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickPattern.length-1);
} );


function playSound(name)
{
  var audio = new Audio( name + ".mp3");
  audio.play();
}


function animatePress(currentColour)
{
  $("#" + currentColour).addClass("pressed");

  setTimeout(function(){$("#" + currentColour).removeClass("pressed")}, 100);
}


function checkAnswer(currentLevel)
{
  if(gamePattern[currentLevel] === userClickPattern[currentLevel]){


    if(userClickPattern.length === gamePattern.length){
      setTimeout(function (){
        nextSequence();}, 1000);
      }
    }
    else {
      playSound("wrong");

      $("body").addClass("game-over").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
      setTimeout(function(){$("body").removeClass("game-over").fadeIn(100).fadeOut(100).fadeIn(100);}, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart.");

      startOver();
    }

  }

  function startOver()
  {
    level = 0;
    gamePattern = [];
    started = false;
  }
