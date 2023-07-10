// create audio objects from sound files (downloaded from freecodecamp originally)
const greenSound = new Audio('./sounds/greenSound.mp3');
const redSound = new Audio('./sounds/redSound.mp3');
const blueSound = new Audio('./sounds/blueSound.mp3');
const yellowSound = new Audio('./sounds/yellowSound.mp3');
const errorSound = new Audio('./sounds/error.wav');
const winSound = new Audio('./sounds/ta-da.mp3');
const messages = ['Nice!', 'Great!', 'Fantastic!', 'Awesome!', 'Respect!'];

// create button variables for user later
const startBtn = document.getElementById('start-btn');
const redBtn = document.getElementById('red-btn');
const blueBtn = document.getElementById('blue-btn');
const yellowBtn = document.getElementById('yellow-btn');
const greenBtn = document.getElementById('green-btn');
const gameBtns = [startBtn, redBtn, blueBtn, yellowBtn, greenBtn]
const count = document.getElementById('count');
const longestCount = document.getElementById('longest-count');
const level = document.getElementById('level');
const message = document.getElementById('message');

// Set initial variables
let gameOver = false;
let levelNum = 1;
let simonTurn = true;
let playing = true;
let computerSequence = [];
let positionInComputerSequence = 0;
let currentCount = 0;
let longestSequence = 0;
updateCount();
updateLongest();
updateLevel();


// Run at end of game to display game-over screen 
function changeDisplayGameOver(){
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('message-container').style.display = 'flex';
    document.getElementById('game-over-message').style.display = 'block';
    message.style.display = 'none';
}

// Run when user completes level
function changeDisplayLevelComplete(){
    document.getElementById('game-over-message').style.display = 'none';
    document.getElementById('game-container').style.display = 'none';  
    document.getElementById('message-container').style.display = 'flex';
    message.style.display = 'block';
    message.innerHTML = messages[levelNum - 1];

}

// Run at start of game to remove game-over screen
function changeDisplayGameStart(){
    document.getElementById('game-container').style.display = 'flex';
    document.getElementById('message-container').style.display = 'none';
}

// Called to update score boards

// Length of current correct sequence
function updateCount(){
    count.innerHTML = currentCount;
}
// Length of longest correct sequence
function updateLongest(){
    longestCount.innerHTML = longestSequence;
}

// Level number
function updateLevel(){
    level.innerHTML = levelNum;
}


// Called when start button pressed to reset initial variables and start game
function startNewGame(){
    gameOver = false;
    simonTurn = true;
    playing = true;
    computerSequence = [];
    positionInComputerSequence = 0;
    currentCount = 0;
    updateCount();
    updateLongest();
    updateLevel();
    changeDisplayGameStart();
    playGame();
}

// Called throughout to play the game
function playGame(){
    // if still playing game, no user mistakes in sequence
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
        // user mistake entering sequence
        if(gameOver){
            changeDisplayGameOver();  
        }
        // level complete
        if(!gameOver){
            changeDisplayLevelComplete();
            if(levelNum < 5){
                console.log(levelNum);
                levelNum++;
            }
           
        }
    }
}

// Returns true if level complete
function levelComplete(){
    if(levelNum === 1){
        if(positionInComputerSequence-1 === 7){
            return true;
        }
    }
    if(levelNum === 2){
        if(positionInComputerSequence-1 === 11){
            return true;
        }
    }
    if(levelNum === 3){
        if(positionInComputerSequence-1 === 17){
            return true;
        }
    }
    if(levelNum === 4){
        if(positionInComputerSequence-1 === 23){
            return true;
        }
    }
    if(levelNum === 5){
        if(positionInComputerSequence-1 === 30){
            return true;
        }
    }
    
    return false;
    
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
        if(levelComplete()){
            playing = false;

        }
        positionInComputerSequence = 0;
        currentCount++
        checkCount()
        // Simon's Turn
        simonTurn = true;
        updateCount();
        updateLongest();
        playGame()
    }
    else{
        // increase current count and check largest sequence, wait for next user buttonClicked(event)
        checkCount()
        playGame()
    }
}

// Called when user gets next item in computerSequence incorrect
function userIncorrect(){
    errorSound.play();
    playing = false;
    gameOver = true;
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
