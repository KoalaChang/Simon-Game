var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];
var level = 0;

function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100); //flash animation
    level ++;
    $("h1").text("level " + level);
}



$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name){
    var colorSounds = new Audio("./sounds/" + name + ".mp3");
    colorSounds.play();
}

function animatePress(currentColor){
    var currentColorId = "#" +currentColor;
    $(currentColorId).addClass("pressed");
    setTimeout(function(){
        $(currentColorId).removeClass("pressed")
    }, 100);
}

$(document).keydown(function(){
    if (gamePattern.length === 0){
        nextSequence();
    }
})

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence()
            }, 1000);
        }
    }else {
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200);
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
}