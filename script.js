// Import elements
const board = document.querySelector("#board");
const cells = document.querySelectorAll("td");
const restartButton = document.querySelector("#restart");

const modal = document.querySelector("#modal");
const message = document.querySelector("#message");
const close = document.querySelector("#close");
const modalRestartButton = document.querySelector("#modal-restart");

// Initial variables
let turn = "X";
let gameOver = false;

// Loop through all the cells and add a click event listener to each one
for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", function () {
    // If the cell is empty and the game is not over yet
    if (this.textContent === "" && !gameOver) {
      // Add the player's symbol to the cell
      this.textContent = turn;
      // Check if the player has won
      if (checkWin(turn)) {
        // If true, show a modal with the winning message
        message.textContent = `${turn} wins!`;
        modal.style.display = "block";
        gameOver = true;
        return;
      }
      // If the game is not over yet, switch to the other player's turn
      if (turn === "X") {
        turn = "O";
      } else {
        turn = "X";
      }
    }
  });
}

// Add listeners to the restart button, modal restart button, and modal close button
restartButton.addEventListener("click", function () {
  // Reset the board and variables, and hide the modal
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = "";
  }
  turn = "X";
  gameOver = false;
  modal.style.display = "none";
});

modalRestartButton.addEventListener("click", function () {
  // Reset the board and variables, and hide the modal
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = "";
  }
  turn = "X";
  gameOver = false;
  modal.style.display = "none";
});

close.addEventListener("click", function () {
  // Hide the modal when the close button is clicked
  modal.style.display = "none";
});

window.addEventListener("click", function (event) {
  // Hide the modal when the user clicks anywhere outside of it
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// check all possible winning combinations
function checkWin(player) {
  return (
    checkRow(0, player) ||
    checkRow(1, player) ||
    checkRow(2, player) ||
    checkCol(0, player) ||
    checkCol(1, player) ||
    checkCol(2, player) ||
    checkDiag(player)
  );
}

function checkRow(row, player) {
  // if all cells in row are the same symbol as the player's symbol
  for (let i = 0; i < 3; i++) {
    if (cells[row * 3 + i].textContent !== player) {
      return false;
    }
  }
  return true;
}

function checkCol(col, player) {
  // if all cells in column are the same symbol as the player's symbol
  for (let i = 0; i < 3; i++) {
    if (cells[col + i * 3].textContent !== player) {
      return false;
    }
  }
  return true;
}

// Check if the player has three in a row diagonally
function checkDiag(player) {
  return (
    // Check the top-left to bottom-right diagonal
    (cells[0].textContent === player &&
      cells[4].textContent === player &&
      cells[8].textContent === player) ||
    // Check the top-right to bottom-left diagonal
    (cells[2].textContent === player &&
      cells[4].textContent === player &&
      cells[6].textContent === player)
  );
}