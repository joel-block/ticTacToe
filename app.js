"use strict";

let playerName = prompt('What is your name?', '');
if (playerName === ""){
    playerName = "challenger";
}

// Game state
const gameState = {
    players: ['x', 'o'],
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
        return this.board;
    }
}


let board = document.querySelector('#board');
let grid = document.querySelector('.grid')

// Heading
let button = document.createElement('button');
button.classList.add('start');
board.prepend(button);
button.innerText = 'Begin';

let h1 = document.createElement('h1');
h1.classList.add('header');
board.prepend(h1);
h1.innerText = gameState.gameStatus;


// Grid

