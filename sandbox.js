// pattern to be  followed
let gamePattern = [];

//user clicked pattern
let userPattern = [];

let first = true;

const gameColor =  ['red' , 'green' , 'blue' , 'yellow'];

let height  = $("colors").attr("height");

$(".btn").click(function(){
    let userColor = $(this).attr("id");
    userPattern.push(userColor);
    $("#" + userColor).addClass("pressed");
    setTimeout(function(){
        $("#" + userColor).removeClass("pressed");
    } , 100);
    checkPattern(userPattern.length);
})

function newSequence(){
    let colorNum = Math.floor(4*Math.random());
    let newColor = gameColor[colorNum];
    gamePattern.push(newColor);
    let level = gamePattern.length;
    $("h1").text(`LEVEL ${level}`);

    ///animate
    $("#" + newColor).fadeTo(100 , 0.33).fadeTo(100 , 1);

    //audio play
    playSound(newColor);
    userPattern = [];
}


function playSound(name){
    let audio = new Audio("sounds/" + name +".mp3");
    audio.play();
}

function userAnimation(currentColor){
    $("#" + currentColor).classList.add("pressed");
    setTimeout(function(){
        $("#" + currentColor).classList.remove("pressed");
    } , 300);
}

$(document).keypress(function(){
        if(first){
            newSequence();
            first = false;
        }
    }
)


function checkPattern(userIndex){
    if(gamePattern[userIndex - 1] !== userPattern[userIndex - 1]){
        $("body").css("backgroundColor" , "red");
        playSound("wrong");
        setTimeout(initial , 100);
    }
    else {
        playSound(gamePattern[userIndex-1]);
        if(userIndex === gamePattern.length) {
            setTimeout(newSequence , 300);
        }        
    }
}

function initial(){
    $("h1").text("Game Over , Press Any Key to Restart");
    userPattern = [];
    gamePattern = [];
    first = true;
    $("body").css("backgroundColor" , "#628395");
}
