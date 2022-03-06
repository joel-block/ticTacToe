"use strict";

// Page Setup
let board = document.querySelector(".top");
let grid1 = document.querySelector(".grid.grid1"); /* One Player Board */
let grid2 = document.querySelector(".grid.grid2"); /* Two Player Board */
let grid3 = document.querySelector(".grid.grid3"); /* Dummy Board */

// Heading
let h1 = document.createElement("h1");
h1.classList.add("header");
board.appendChild(h1);

let buttonContainer = document.createElement("div");
buttonContainer.classList.add("button-container");
board.appendChild(buttonContainer);

let buttonOnePlayer = document.createElement("button");
buttonOnePlayer.classList.add("one-player");
buttonContainer.appendChild(buttonOnePlayer);
buttonOnePlayer.innerText = "One Player";

let buttonTwoPlayer = document.createElement("button");
buttonTwoPlayer.classList.add("two-player");
buttonContainer.appendChild(buttonTwoPlayer);
buttonTwoPlayer.innerText = "Two Players";

let buttonAgain = document.createElement("button");
buttonAgain.classList.add("start");
buttonContainer.appendChild(buttonAgain);
buttonAgain.innerText = "Go again?";

let buttonClear = document.createElement("button");
buttonClear.classList.add("clear");
buttonContainer.appendChild(buttonClear);
buttonClear.innerText = "Clear Board";

let h2 = document.createElement("h2");
board.appendChild(h2);
h2.innerText = ". . . . . .";

// Grid for One-Player Mode
for (let i = 0; i < 3; i++) {
  for (let k = 0; k < 3; k++) {
    let space = document.createElement("span");
    space.classList.add("space", "space1", "row" + i, "col" + k);
    grid1.appendChild(space);
  }
}

let space1 = document.querySelector(".space1");
let spaces1 = document.querySelectorAll(".space1");

// Grid for Two-Player Mode
for (let i = 0; i < 3; i++) {
  for (let k = 0; k < 3; k++) {
    let space = document.createElement("span");
    space.classList.add("space", "space2", "row" + i, "col" + k);
    grid2.appendChild(space);
  }
}

let space2 = document.querySelector(".space2");
let spaces2 = document.querySelectorAll(".space2");

// Empty Grid to display outside of gameplay
for (let i = 0; i < 3; i++) {
  for (let k = 0; k < 3; k++) {
    let space = document.createElement("span");
    space.classList.add("space");
    grid3.appendChild(space);
  }
}

// Define Player One's Name
let playerName = ""

// Define Player Two's Name before prompt
let player2Name = ""

// Game state
const gameState = {
  pieces: ["X", "O"],
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  gameStatus: `Let's play some Tic-Tac-Toe!`,
  renderBoard: function (spaceClass) {
    for (let i = 0; i < gameState.board.length; i++){
      for (let k = 0; k < gameState.board[i].length; k++){
        let space = document.querySelector('.' + spaceClass + '.row' + i + '.col' + k);
        space.innerText = gameState.board[i][k];
      }
    }
  },
  move: function (piece, row, col) {
    if (gameState.board[row][col] === null) {
      gameState.board[row][col] = piece;
    }
  },
  compMove: function (piece) {
    // Random Move
    let row = Math.floor(Math.random() * 3);
    let col = Math.floor(Math.random() * 3);
    if (gameState.board[0].indexOf(null) === -1 &&
        gameState.board[1].indexOf(null) === -1 &&
        gameState.board[2].indexOf(null) === -1 ) {
          return;
        }
    if (gameState.board[row][col] === null) {
      gameState.board[row][col] = piece;
    } else {
      gameState.compMove(piece)
    }
  },
  clear: function () {
    gameState.board = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    for (let i = 0; i < spaces1.length; i++) {
      spaces1[i].innerText = "";
    }
    for (let i = 0; i < spaces2.length; i++) {
      spaces2[i].innerText = "";
    }
  },
  /* Board positions with index of spaces[i]:
  [0], [1], [2]
  [3], [4], [5]
  [6], [7], [8] */
  winCombos: [
    // rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonals
    [0, 4, 8],
    [2, 4, 6]
  ]
};



// Helper functions
function checkCol(event) {
  let col;
  if (event.target.matches(".col0")) {
    col = 0;
  }
  if (event.target.matches(".col1")) {
    col = 1;
  }
  if (event.target.matches(".col2")) {
    col = 2;
  }
  return col;
}

function checkRow(event) {
  let row;
  if (event.target.matches(".row0")) {
    row = 0;
  }
  if (event.target.matches(".row1")) {
    row = 1;
  }
  if (event.target.matches(".row2")) {
    row = 2;
  }
  return row;
}


function checkWin() {
  let flatBoard = gameState.board.flat();
  for (let i = 0; i < gameState.winCombos.length; i++){
    let idx1 = gameState.winCombos[i][0];
    let idx2 = gameState.winCombos[i][1];
    let idx3 = gameState.winCombos[i][2];
    let spaceA = flatBoard[idx1];
    let spaceB = flatBoard[idx2];
    let spaceC = flatBoard[idx3];
    if (spaceA !== null &&
        spaceA === spaceB &&
        spaceB === spaceC){
      return true;
    }
  }
  return false;
}

function checkDraw() {
  if (!checkWin() &&
      gameState.board[0].indexOf(null) === -1 &&
      gameState.board[1].indexOf(null) === -1 &&
      gameState.board[2].indexOf(null) === -1 ) {
        gameState.gameStatus = "It's a draw!";
        h1.innerText = gameState.gameStatus;
        h2.innerText = "Let's go another round!";
        alert("It's a draw!");
        return true;
      }
}

function randomPlayer() {
  let x = Math.floor(Math.random() * 2) == 0;
  if (x) {
    return gameState.pieces[0];
  } else {
    return gameState.pieces[1];
  }
}

function switchPlayer() {
  if (currentPlayer === gameState.pieces[0]){
    currentPlayer = gameState.pieces[1];
  } else {
    currentPlayer = gameState.pieces[0];
  }
}

let currentPlayer = randomPlayer();
h1.innerText = gameState.gameStatus;

// Event Listeners

// One Player button
buttonOnePlayer.addEventListener("click", function () {
  grid3.style.display = "none";
    // Set Player 1's name
    if (playerName === "" || playerName === "Challenger") {
      playerName = prompt('What is your name?', 'Challenger');
    }
    if (playerName === "") {
      playerName = "Challenger";
    }
    
  gameState.gameStatus = "Challenge accepted!";
  h1.innerText = gameState.gameStatus;
  h2.innerText = `${playerName} controls the ${currentPlayer}'s.`;
  this.style.display = "none";
  buttonTwoPlayer.style.display = "none";
  buttonClear.style.display = "flex";
  grid1.style.display = "flex";
});

// One Player Game Mode
grid1.addEventListener("click", function (event) {
  // Player move
  let row = checkRow(event);
  let col = checkCol(event);
  // Prevent misclick on occupied space
  let targetSpace = document.querySelector(`.space.space1.row${row}.col${col}`);
  if (targetSpace.innerText === "") {
    gameState.move(currentPlayer, row, col);
    gameState.renderBoard('space1');
    // Check for win
    if (checkWin()){
      gameState.gameStatus = `${playerName.toUpperCase()} WINS!!!`;
      h1.innerText = gameState.gameStatus;
      h2.innerText = "Let's go another round!";
      alert(`${playerName.toUpperCase()} WINS!!!`);
      return;
    };
    // Check for draw
    if (checkDraw()) {
      return;
    };
    switchPlayer();
    h2.innerText = `Computer controls the ${currentPlayer}'s.`
    // Computer's turn
    setTimeout( () => {
      gameState.compMove(currentPlayer);
      gameState.renderBoard('space1');
      // Check for computer win
      if (checkWin()){
        gameState.gameStatus = `Aw, you lost =(`;
        h1.innerText = gameState.gameStatus;
        h2.innerText = "Let's go another round!";
        alert(`Computer wins!`);
        return;
      };
      // Check for draw
      if (checkDraw()) {
        return;
      };
      switchPlayer();
      h2.innerText = `${playerName} controls the ${currentPlayer}'s.`;
    }, 1500);
  }
  return;
});

// Two Player button
buttonTwoPlayer.addEventListener("click", function () {
  grid3.style.display = "none";
  // Set Player 1's name
  if (playerName === "" || playerName === "Challenger") {
    playerName = prompt("What is Player 1's name?", 'Challenger');
  }
  if (playerName === "") {
    playerName = "Challenger";
  }

  // Set Player 2's name
  if (player2Name === "" || player2Name === "Opponent") {
    player2Name = prompt(`What is Player 2's name?`, 'Opponent');
  }
  if (player2Name === "") {
    player2Name = "Opponent";
  }

  gameState.gameStatus = "Let the game begin!";
  h1.innerText = gameState.gameStatus;
  h2.innerText = `It is ${playerName}'s turn!`;
  this.style.display = "none";
  buttonOnePlayer.style.display = "none";
  buttonClear.style.display = "flex";
  grid2.style.display = "flex";
});

// Two Player Game Mode
grid2.addEventListener("click", function (event) {
  // Player move
  let row = checkRow(event);
  let col = checkCol(event);
  // Prevent misclick on occupied space
  let targetSpace = document.querySelector(`.space.space2.row${row}.col${col}`);
  if (targetSpace.innerText === "") {
    gameState.move(currentPlayer, row, col);
    gameState.renderBoard('space2');
    // Check for win
    if (checkWin()){
      gameState.gameStatus = `${currentPlayer}'S WIN!!!`;
      h1.innerText = gameState.gameStatus;
      h2.innerText = "Let's go another round!";
      alert(`${currentPlayer}'S WIN!!!`)
      return;
      };
    // Check for draw
    if (checkDraw()) {
      return;
    };
    switchPlayer();
    if (h2.innerText === `It is ${playerName}'s turn!`) {
      h2.innerText = `It is ${player2Name}'s turn!`;
    } else {
      h2.innerText = `It is ${playerName}'s turn!`;
    }
  }
  return;
});

// Clear Board button
buttonClear.addEventListener("click", function () {
  gameState.gameStatus = `Wanna play another round, ${playerName}?`;
  h1.innerText = gameState.gameStatus;
  h2.innerText = "Let's play some more!";
  gameState.clear();
  this.style.display = "none";
  buttonAgain.style.display = "flex";
  currentPlayer = randomPlayer();
  grid1.style.display = "none";
  grid2.style.display = "none";
  grid3.style.display = "flex";
});

// Play again button
buttonAgain.addEventListener("click", function () {
  buttonOnePlayer.style.display = "flex";
  buttonTwoPlayer.style.display = "flex";
  this.style.display = "none";
});
