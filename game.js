buttonColours = ["red","blue", "green", "yellow"];
userClickedPattern = []; 
gamePattern = [];
var level = 0;
started = false;

//start the game 
if (level == 0){
    $("body").keypress(nextSequence)

}

//Click colours 
$(".btn").click(function(){
    var userChosenColour = this.id;
    userClickedPattern.push(this.id)
    console.log(userClickedPattern);
    //animation 
    animatePress(userChosenColour);
    // sounds
    playSound(userChosenColour);
    console.log(userClickedPattern.indexOf(userChosenColour));
    checkAnswer(userClickedPattern.indexOf(userChosenColour));

});




// next Sequence
function nextSequence() {
    if (started == false){
        started = true;
    }
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#level-title").text("level "+level);
    animatePress(randomChosenColour)
    playSound(randomChosenColour);
    console.log(gamePattern)
    level = level + 1;

  }


// Sound
  function playSound(color){
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
  }


// animation 
function animatePress(currentColour){
    //$("#" + currentColour).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#"+currentColour).addClass("pressed").delay(100).queue(function(next){
        $(this).removeClass("pressed");
        next();
    });
}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        console.log("ez clap")
    }
    else{
        console.log("end game")
        
            userClickedPattern = []
            $("body").addClass("game-over").delay(200).queue(function(next){
                $(this).removeClass("game-over");
                next();
                
            })
            $("#level-title").text("Game Over, Press Any Key to Restart")
            startOver();
    }
    if (level == userClickedPattern.length){
        if (started == true){
            userClickedPattern = []
            setTimeout(nextSequence , 1000);
        }
        
    }
}

function startOver(){
    level = 0 
    gamePattern = []
    started = false;
}