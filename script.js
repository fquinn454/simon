// import sound files (downloaded from freecodecamp originally)
const greenSound = new Audio('./sounds/greenSound.mp3');
const redSound = new Audio('./sounds/redSound.mp3');
const blueSound = new Audio('./sounds/blueSound.mp3');
const yellowSound = new Audio('./sounds/yellowSound.mp3');
const errorSound = new Audio('./sounds/error.wav');

// Game Setup and state variables
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


// Run at end of game to display game-over screen 
function changeDisplayGameOver(){
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('game-over').style.display = 'flex';
}

// Run at start of game to remove game-over screen
function changeDisplayGameStart(){
    document.getElementById('game-container').style.display = 'flex';
    document.getElementById('game-over').style.display = 'none';
}

// Called when start button pressed to reset state variables and start game
function startNewGame(){
    simonTurn = true;
    playing = true;
    computerSequence = [];
    positionInComputerSequence = 0;
    currentCount = 0;
    changeDisplayGameStart();
    playGame();
}

// Called throughout to play the game
function playGame(){
    // if still playing game
    if(playing){
        // computer's turn
        if(simonTurn){
            computerTurn()
        }
        if(!simonTurn){
            // Wait for user input as buttonClicked(event)
        }
        
    }
    if(!playing){
        changeDisplayGameOver();
    }
}

/*
Game tracks users longest correct sequence in this session
If current correct sequence length is greater than saved longest sequence
Update longest sequence
*/
function checkCount(){
    if(currentCount > longestSequence){
        longestSequence = currentCount;
    }
}

// Called when user has got next item in computerSequence correct
function userCorrect(){
    positionInComputerSequence++;
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

// Called when user gets next item in computerSequence incorrect
function userIncorrect(){
    errorSound.play();
    playing = false;
    playGame()
}

// function to pass button clicked info to playGame() when !simonTurn
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

// Randomly pick next colour for computer sequence
function pickRandom(){
    const choice = Math.floor(Math.random() * 4)
    computerSequence.push(choice);
}

// Called when Simon takes its turn
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

// Light up colored button, play its sound and turn its light off again when clicked
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

// Called to play the computer's sequence by flasing button lights
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

// Adds a short delay before starting playSequence(), avoids sound overlap buzzing
function playDelayedSequence(sequence, i){
    setTimeout(() => playSequence(sequence, i), 800);
}



