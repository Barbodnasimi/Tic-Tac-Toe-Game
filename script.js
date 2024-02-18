const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const restartBtn = document.getElementById('restart-btn');
const turnPlayer = document.querySelector('#turn')
let currentPlayer = 'X';
turnPlayer.textContent = currentPlayer
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', clickHandler)
});

function clickHandler(e) {
    const cellIndex = e.target.dataset.cellIndex;

    if (gameActive && gameState[cellIndex] === '') {
        gameState[cellIndex] = currentPlayer
        e.target.textContent = currentPlayer
        switchPlayer();
        checkWinner();
    }
}

restartBtn.addEventListener('click' , restartGame)

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
    turnPlayer.textContent = currentPlayer
}

function checkWinner() {
    winningConditions.forEach((Condition)=>{
        const [a,b,c] = Condition
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            gameActive = false
            switchPlayer()
            status.textContent = `${currentPlayer} Won`
        }
        if (!gameState.includes('') && gameActive) {
            gameActive = false;
            status.textContent = 'It\'s a Draw!';
        }
    })
    
}

function restartGame() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    status.textContent = '';
    gameActive = true
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', clickHandler);
    });
}