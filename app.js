"use strict";

let playerName = 'Joel' /* prompt('What is your name?', ''); */
if (playerName === ""){
    playerName = "challenger";
}

// Game state
const gameState = {
    players: ['X', 'O'],
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
        return this.board;
    },
    clear: function() {
        this.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
    }
}

let board = document.querySelector('.top');
let grid = document.querySelector('.grid')

// Heading
let h1 = document.createElement('h1');
h1.classList.add('header');
board.appendChild(h1);
h1.innerText = gameState.gameStatus;

let button = document.createElement('button');
button.classList.add('start');
board.appendChild(button);
button.innerText = 'Begin';

let h2 = document.createElement('h2');
board.appendChild(h2);

// Grid

for (let i = 0; i < gameState.board.length; i++) {
    for (let k = 0; k < gameState.board[i].length; k++) {
        let space = document.createElement('span');
        space.classList.add('space');
        grid.appendChild(space);
        space.innerText = gameState.board[i][k];
    }
}


// Event Listeners

button.addEventListener('click', function() {
    if (button.innerText === "Clear Board") {
        button.innerText = 'Begin';
        gameState.gameStatus = `Wanna play another round, ${playerName}?`;
        h2.innerText = '';
        gameState.clear();
        for (let i = 0; i < gameState.board.length; i++) {
            for (let k = 0; k < gameState.board[i].length; k++) {
                space.innerText = gameState.board[i][k];
            }
        }
    }
    button.innerText = "Clear Board";
    gameState.gameStatus = "Challenge Accepted!";
    h1.innerText = gameState.gameStatus;
    h2.innerText = `You control the ${gameState.players[0]}s`
})