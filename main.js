let player1, player2;
let player1Score = 0;
let player2Score = 0;
let currentPlayer = 1;

let board = Array(7).fill(null).map(() => Array(6).fill(0));

// info from player
function startGame() {
    player1 = prompt("Enter the name of the first player:");
    player2 = prompt("Enter the name of the second player:");
    document.getElementById("playOne").innerText = player1 " =";
    document.getElementById("playTwo").innerText = player2 " =";
    document.getElementById("score1").innerText = player1Score;
    document.getElementById("score2").innerText = player2Score;
}

 
function placeDisc(colIndex) {
    for (let row = 5; row >= 0; row--) {
        if (board[colIndex][row] === 0) {
            board[colIndex][row] = currentPlayer;
            updateBoardUI(colIndex, row);
            if (checkWinner(colIndex, row)) {
                if (currentPlayer === 1) {
                    player1Score++;
                    document.getElementById("score1").innerText = player1Score;
                    alert(`${player1} wins!`);
                } else {
                    player2Score++;
                    document.getElementById("score2").innerText = player2Score;
                    alert(`${player2} wins!`);
                }
            }
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            return;
        }
    }
}


function updateBoardUI(col, row) {
    let cell = document.getElementById(`c${col + 1}Col${row + 1}`);
    cell.style.backgroundColor = currentPlayer === 1 ? "red" : "yellow";
}

// who win
function checkWinner(col, row) {
    return checkDirection(col, row, 1, 0) ||  
            checkDirection(col, row, 0, 1) ||  
            checkDirection(col, row, 1, 1) ||  
            checkDirection(col, row, 1, -1);
}


function checkDirection(col, row, colStep, rowStep) {
    let count = 1;
    count += countDiscs(col, row, colStep, rowStep);
    count += countDiscs(col, row, -colStep, -rowStep);
    return count >= 4;
}

function countDiscs(col, row, colStep, rowStep) {
    let count = 0;
    let player = board[col][row];

    for (let i = 1; i < 4; i++) {
        let newCol = col + colStep * i;
        let newRow = row + rowStep * i;

        if (newCol < 0 || newCol >= 7 || newRow < 0 || newRow >= 6 || board[newCol][newRow] !== player) {
            break;
        }
        count++;
    }
    return count;
}

document.querySelectorAll('.col').forEach((colElement, index) => {
    colElement.addEventListener('click', () => {
        placeDisc(index);
    });
});

// play again
function resetGame() {
    board = Array(7).fill(null).map(() => Array(6).fill(0));
    document.querySelectorAll('.col p').forEach(cell => {
        cell.style.backgroundColor = "";
    });
    currentPlayer = 1;
    player1Score = 0;
    player2Score = 0;
    document.getElementById("score1").innerText = player1Score;
    document.getElementById("score2").innerText = player2Score;
}

document.getElementById('playAgainBtn').addEventListener('click', resetGame);


startGame();
