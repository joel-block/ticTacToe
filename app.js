"use strict";

let playerName = "" /* prompt('What is your name?', ''); */
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
        if (gameState.board[row][col] === null){
            gameState.board[row][col] = piece;
        }
    },
    clear: function() {
        gameState.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
    }
}
// Helper functions
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

let currentPlayer = '';
function randomPlayer() {
    let x = Math.floor(Math.random() * 2) == 0;
    if (x) {
        return gameState.player1;
    } else {
        return gameState.player2;
    }
}

currentPlayer = randomPlayer()
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
h2.innerText = '. . . . . .';

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
let spaces = document.querySelectorAll('.space')


// Event Listeners

button1.addEventListener('click', function() {
    gameState.gameStatus = "Challenge Accepted!";
    h1.innerText = gameState.gameStatus;
    h2.innerText = `You control the ${currentPlayer}s`;
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
    currentPlayer = randomPlayer();
    for (let i = 0; i < spaces.length; i++){
        spaces[i].innerText = null;
    }
})

grid.addEventListener('click', function(event){
    let row = checkRow(event);
    let col = checkCol(event);
    gameState.move(currentPlayer, row, col);
    event.target.innerText = gameState.board[row][col];
})
