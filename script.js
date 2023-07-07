// import sound files from freecodecamp
const greenSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
const redSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
const blueSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
const yellowSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

// Game Setup
const startBtn = document.getElementById('start-btn');
const redBtn = document.getElementById('red-btn');
const blueBtn = document.getElementById('blue-btn');
const yellowBtn = document.getElementById('yellow-btn');
const greenBtn = document.getElementById('green-btn');
let playing = false;
let computerSequence = [1, 3, 0, 2];
let currentCount = 0;
let longestSequence = 0;
let userSequenceLength = 0;


// function to start game
function startPlaying(){
    playing = true;
    computerTurn();
}

// function to randomly pick next colour for computer sequence
function pickRandom(){
    const choice = Math.floor(Math.random() * 4)
    computerSequence.push(choice);
}

// function for computer's turn
function computerTurn(){
    if(playing){
        pickRandom()
        for(let i=0; i<computerSequence.length; i++){
            setTimeout(() => playSequence(computerSequence, i), 1+i*800);
        }
    }
}

// function to play computer sequence
function playSequence(sequence, i){
    if (sequence[i] === 0) {
        redBtn.focus()
        redSound.play()
        setTimeout(() => redBtn.blur(), 800);
    }
    if (sequence[i] === 1) {
        blueBtn.focus();
        blueSound.play()
        setTimeout(() => blueBtn.blur(), 800);
    }
    if (sequence[i] === 2) {
        yellowBtn.focus();
        yellowSound.play()
        setTimeout(() => yellowBtn.blur(), 800);
    }
    if (sequence[i] === 3) {
        greenBtn.focus();
        greenSound.play()
        setTimeout(() => greenBtn.blur(), 800);
    } 
}

// function to return current user sequence length
function currentSequenceLength(computerSequence){
    return computerSequence.length;
}

// function to return longest user sequence in this session
function countLongestSequence(computerSequence){
    if(computerSequence.length > longestSequence){
        longestSequence++;
    }
    return longestSequence;
}






