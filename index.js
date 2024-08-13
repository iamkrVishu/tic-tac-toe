const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameActive = true;

// Define the winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Handle cell click
cells.forEach((cell) => {
  cell.addEventListener('click', () => {
    if (gameActive && !cell.textContent) {
      cell.textContent = currentPlayer;

      if (checkWin()) {
        gameActive = false;
        document.querySelector('.message').textContent = `Player ${currentPlayer} wins!`;
        highlightWinningRow();
        return;
      }

      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  });
});

// Check for a winning combination
function checkWin() {
  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    );
  });
}

// Highlight the winning row and reset the game
function highlightWinningRow() {
    winningCombinations.forEach(combination => {
      const [a, b, c] = combination;
      if (
        cells[a].textContent &&
        cells[a].textContent === cells[b].textContent &&
        cells[a].textContent === cells[c].textContent
      ) {
        cells[a].classList.add('winning-cell');
        cells[b].classList.add('winning-cell');
        cells[c].classList.add('winning-cell');
  
        setTimeout(() => {
          resetGame();
        }, 2000); // Wait for 2 seconds before resetting the game
      }
    });
  }
  
  // Reset the game
  function resetGame() {
    cells.forEach((cell) => {
      cell.textContent = '';
      cell.classList.remove('winning-cell');
    });
    currentPlayer = 'X';
    gameActive = true;
    document.querySelector('.message').textContent = '';
  }

// Check for a winning combination or a tie
function checkWin() {
    const isTie = [...cells].every((cell) => cell.textContent !== '');
    
    if (isTie) {
      document.querySelector('.message').textContent = "It's a tie!";
      cells.forEach((cell) => {
        cell.classList.add('tie-animation');
      });
      setTimeout(() => {
        resetGame();
      }, 2000); // Wait for 2 seconds before resetting the game
      return false;
    }
  
    return winningCombinations.some(combination => {
      const [a, b, c] = combination;
      return (
        cells[a].textContent &&
        cells[a].textContent === cells[b].textContent &&
        cells[a].textContent === cells[c].textContent
      );
    });
  }
      