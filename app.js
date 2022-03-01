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
    }
}

let playerName = prompt('What is your name?', '')
playerName ?? "Challenger"
// 