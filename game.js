
let buttonColors=["red","blue","green","yellow"];
let gamePattern=[];
let userClickedPattern=[];
let level=0;
let started=false;



$(document).keydown(function() {
  if(!started){
    
    nextSequence();
    started=true;
  }
});

$(".btn").on("click",handler); 

function handler(){
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour)
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePressed(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
};



function nextSequence() {

    userClickedPattern=[];
    level++;
    $("h1").html("Level "+level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    

  }
  
function playSound(name){
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePressed(colorChosen){
  $("#"+colorChosen).addClass("pressed ")
  setTimeout(function() {
    $("#"+colorChosen).removeClass("pressed ")
  }, 100);
  
}

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
  }
  else{
    let audio2= new Audio("sounds/wrong.mp3");
    audio2.play();
    // we can also use the pre existing function playSound that we already have
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over")
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
