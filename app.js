"use strict";

let playerName = prompt('What is your name?', '');
if (playerName === ""){
    playerName = "challenger";
}

// Game state
const gameState = {
    player1: 'X',
    player2: 'O',
    board: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ],
    gameStatus: `Would you like to play a game, ${playerName}?`,
    gameHistory: {
        wins: 0,
        losses: 0
    },
    move: function(piece, row, col) {
        if (this.board[row][col] === null){
            this.board[row][col] = piece;
        }
        gameState.board = this.board;
    },
    clear: function() {
        this.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        gameState.board = this.board;
    }
}

let currentPlayer = gameState.player1
let board = document.querySelector('.top');
let grid = document.querySelector('.grid')

// Heading
let h1 = document.createElement('h1');
h1.classList.add('header');
board.appendChild(h1);
h1.innerText = gameState.gameStatus;

let button1 = document.createElement('button');
button1.classList.add('start');
board.appendChild(button1);
button1.innerText = 'Begin';

let button2 = document.createElement('button');
button2.classList.add('clear');
board.appendChild(button2);
button2.innerText = 'Clear Board';

let h2 = document.createElement('h2');
board.appendChild(h2);
h2.innerText = '__________';

// Grid

for (let i = 0; i < gameState.board.length; i++) {
    for (let k = 0; k < gameState.board[i].length; k++) {
        let space = document.createElement('span');
        space.classList.add('space', 'row' + i, 'col' + k);
        grid.appendChild(space);
        space.innerText = gameState.board[i][k];
    }
}

let space = document.querySelector('.space')

function spaceClicked(event) {
    console.log('clicked')
}


// Event Listeners

button1.addEventListener('click', function() {
    gameState.gameStatus = "Challenge Accepted!";
    h1.innerText = gameState.gameStatus;
    h2.innerText = `You control the ${gameState.player1}s`;
    this.style.display = 'none';
    button2.style.display = 'flex';
})

button2.addEventListener('click', function() {
    gameState.gameStatus = `Wanna play another round, ${playerName}?`;
    h1.innerText = gameState.gameStatus;
    h2.innerText = "Let's play some more!"
    gameState.clear();
    this.style.display = 'none';
    button1.style.display = 'flex';
})

grid.addEventListener('click', function(event){
    let row = checkRow(event);
    let col = checkCol(event);
    gameState.move(currentPlayer, row, col);
    fillSpace(event);
    // console.log(gameState.board);
})

function checkCol(event) {
    let c;
    if (event.target.matches('.col0')) {
        c = 0;
    }
    if (event.target.matches('.col1')) {
        c = 1;
    }
    if (event.target.matches('.col2')) {
        c = 2;
    }
    return c;
}

function checkRow(event) {
    let r;
    if (event.target.matches('.row0')) {
        r = 0;
    }
    if (event.target.matches('.row1')) {
        r = 1;
    }
    if (event.target.matches('.row2')) {
        r = 2;
    }
    return r;
}

function fillSpace(event) {
    for (let i = 0; i < gameState.board.length; i++) {
        for (let k = 0; k < gameState.board[i].length; k++) {
            event.target.innerText = gameState.board[i][k];
            console.log('click')
            console.log(event.target.innerText, i, k)
        }
    }
}