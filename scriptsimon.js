let gameSeq = [];
let userSeq = [];

let btns = ["yellow" , "red" , "purple" , "green"];
let started = false;
let level = 0 ;


let highestScore = localStorage.getItem('highestScore') || 0;


let h2 = document.querySelector("h2");


let scoreDisplay = document.createElement('h3');
scoreDisplay.innerText = `Highest Score: ${highestScore}`;
document.body.appendChild(scoreDisplay);


document.addEventListener("keypress" , function() {
    if (started == false){
        console.log("game is started");
        started =  true;
        levelUp();
    }
});

function gameflash (btn){
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    } , 250);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    } , 250);
}

function levelUp() {
    userSeq=[];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random()* 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameflash(randBtn);
}

function checkAns(idx) {
    //console.log("curr level : " , level);
   // let idx = level-1;

if(userSeq[idx] === gameSeq[idx]){
    if(userSeq.length == gameSeq.length){
        setTimeout(levelUp , 1000);
    }
    //console.log("same value");
}else {
    h2.innerHTML = `Game Over!your score was <b>${level}</b> <br> Press any key to start`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function() {
        document.querySelector("body").style.backgroundColor = "white";
    } , 150);

    updateHighestScore();


    reset();
}
}

function btnPress() {
    //console.log(this);
    let btn = this;
    userflash(btn);

    userColor = btn.getAttribute("id"); // to get which color button is pressedd through id html
    userSeq.push(userColor);
    //console.log(userColor);

    checkAns(userSeq.length-1);
}


function updateHighestScore() {
    if (level > highestScore) {
        highestScore = level;
        localStorage.setItem('highestScore', highestScore);
        scoreDisplay.innerText = `Highest Score: ${highestScore}`;
    }
}



let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click" , btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

// Changes Made:
// Added a variable highestScore to store the highest score.
// Used localStorage to persist the highest score between sessions.
// Created an h3 element to display the highest score and appended it to the document body.
// Updated the highest score if the current level exceeds it when the game is over.
// Displayed the highest score on the screen.
// With these changes, your Simon Says game will now keep track of and display the highest score.