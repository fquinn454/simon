// import sound files from freecodecamp
const greenSound = new Audio('./sounds/greenSound.mp3');
const redSound = new Audio('./sounds/redSound.mp3');
const blueSound = new Audio('./sounds/blueSound.mp3');
const yellowSound = new Audio('./sounds/yellowSound.mp3');
const errorSound = new Audio('./sounds/error.wav');

// Game Setup
const startBtn = document.getElementById('start-btn');
const redBtn = document.getElementById('red-btn');
const blueBtn = document.getElementById('blue-btn');
const yellowBtn = document.getElementById('yellow-btn');
const greenBtn = document.getElementById('green-btn');
let simonTurn = true;
let playing = true;
let computerSequence = [];
let positionInComputerSequence = 0;
let currentCount = 0;
let longestSequence = 0;

function startNewGame(){
    simonTurn = true;
    playing = true;
    computerSequence = [];
    positionInComputerSequence = 0;
    currentCount = 0;
    playGame();
}

// function to start game
function playGame(){
    // if still playing game
    if(playing){
        // computer's turn
        if(simonTurn){
            console.log('simon turn')
            computerTurn()
        }
        // Wait for user input as buttonClicked(event)

    }
    if(!playing){
        console.log("Game Over");
    }
}

// function check if currentCount > Longest Sequence
function checkCount(){
    if(currentCount > longestSequence){
        longestSequence = currentCount;
    }
}

function userCorrect(){
    positionInComputerSequence++;
    console.log(positionInComputerSequence)
    // user has entered the entire computerSequence correctly
    if(positionInComputerSequence+1 > computerSequence.length){
        positionInComputerSequence = 0;
        currentCount++
        checkCount()
        // Simon's Turn
        simonTurn = true;
        playGame()
    }
    else{
        // increase current count and check largest sequence, wait for next user buttonClicked(event)
        currentCount++
        checkCount()
        playGame()
    }
}

// User gives incorrect button in computerSequence
function userIncorrect(){
    errorSound.play();
    playing = false;
    playGame()
}

// function to pass on button clicked info to player's turn
function buttonClicked(event){
    let btn = event.target.id;
    if(btn === 'red-btn'){
        clickRedButton(); 
        if(computerSequence[positionInComputerSequence] === 0){
            userCorrect();
        }
        else{
            userIncorrect()
        }
    }

    if(btn === 'blue-btn'){
        clickBlueButton(); 
        if(computerSequence[positionInComputerSequence] === 1){
            userCorrect();
        }
        else{
            userIncorrect()
        }
    }

    if(btn === 'yellow-btn'){
        clickYellowButton(); 
        if(computerSequence[positionInComputerSequence] === 2){
            userCorrect();
        }
        else{
            userIncorrect()
        }
    }

    if(btn === 'green-btn'){
        clickGreenButton(); 
        if(computerSequence[positionInComputerSequence] === 3){
            userCorrect();
        }
        else{
            userIncorrect()
        }
    }

    if(btn === 'start-btn'){
        startNewGame();
    }
}


// function to randomly pick next colour for computer sequence
function pickRandom(){
    const choice = Math.floor(Math.random() * 4)
    computerSequence.push(choice);
    console.log(computerSequence)
}

// function for computer's turn
function computerTurn(){
    // add a random number 0-4 to the computerSequence
    pickRandom()
    // play the computerSequence
    for(let i=0; i<computerSequence.length; i++){
        setTimeout(() => playDelayedSequence(computerSequence, i), 1+i*800);
    }
    // Now Player's Turn
    simonTurn = false;
    // Run playGame() for player's turn
    playGame();
    
}

// light button, play sound, blur button
function clickRedButton(){
    redBtn.focus()
    redSound.play()
    setTimeout(() => redBtn.blur(), 700);
}

function clickBlueButton(){
    blueBtn.focus();
    blueSound.play()
    setTimeout(() => blueBtn.blur(), 700);
}

function clickYellowButton(){
    yellowBtn.focus();
    yellowSound.play()
    setTimeout(() => yellowBtn.blur(), 700);
}

function clickGreenButton(){
    greenBtn.focus();
    greenSound.play()
    setTimeout(() => greenBtn.blur(), 700);
}

// function to play computer sequence
function playSequence(sequence, i){
    if (sequence[i] === 0) {
        clickRedButton();
    }
    if (sequence[i] === 1) {
        clickBlueButton();
    }
    if (sequence[i] === 2) {
        clickYellowButton();
    }
    if (sequence[i] === 3) {
        clickGreenButton();
    } 
}

function playDelayedSequence(sequence, i){
    setTimeout(() => playSequence(sequence, i), 800);
}



