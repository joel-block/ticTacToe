"use strict";
// Game state
const gameState = {
    players: ['x', 'o'],
    board: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ],
    gameStatus: 'Will you challenge me?',
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

// 

// let playerName = prompt('What is your name?', '');
// playerName ?? "Challenger";

let board = document.querySelector('#board');

let h1 = document.createElement('h1');
h1.classList.add('header');
board.appendChild(h1);
h1.innerText = gameState.gameStatus;

let button = document.createElement('button');
button.classList.add('start');
board.appendChild(button);
button.innerText = 'Begin';


// let grid = document.createElement('table');
// board.appendChild(grid);