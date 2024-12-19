'use strict'
const MINES = '💣'
const FLAG = '🚩'
const LOSE = '🤯'
const WIN = '😎'

var gBoard = {
    minesAroundCount: 0,
    isShown: false,
    isMine: false,
    isMarked: true
}

var gLevel = {
    SIZE: 4,
    MINES: 2
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

var gBoardGame
var gCell
var gGamersPos
var gFirstClick = true
var gCountOfLive = 3

function onInit() {
    gBoardGame = buildBoard1()
    // console.table(gBoardGame);
    renderBoard(gBoardGame)
}

function buildBoard1(firstClickI = null, firstClickJ = null) {
    const board = []
    var lives = document.querySelector('.Lives span').innerText = gCountOfLive

    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = []
        for (var j = 0; j < gLevel.SIZE; j++) {
            const cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
            board[i][j] = cell
        }
    }
    // if (firstClickI !== null && firstClickJ !== null) {
    //     placeMines(board, firstClickI, firstClickJ);
    // }

    return board
}
function renderBoard() {
    var strHTML = '<table><tbody>'
    for (var i = 0; i < gLevel.SIZE; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < gLevel.SIZE; j++) {
            gCell = gBoardGame[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}"
            onclick="onCellClicked(this,${i},${j})">
            </td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector('.container')
    elContainer.innerHTML = strHTML

    addRightClickListeners();
}
function placeMines(board, firstClickI, firstClickJ) {
    let minesPlaced = 0;

    while (minesPlaced < gLevel.MINES) {
        const i = Math.floor(Math.random() * gLevel.SIZE);
        const j = Math.floor(Math.random() * gLevel.SIZE);

        if (i === firstClickI && j === firstClickJ) continue;

        if (!board[i][j].isMine) {
            board[i][j].isMine = true;
            minesPlaced++;
        }
    }
}
function setMinesNegsCount(board, cellI, cellJ) {
    var count = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= board[i].length) continue
            if (board[i][j].isMine) count++
        }
    }
    return count
}
function onCellClicked(elCell, i, j) {

    if (gFirstClick) {
        gBoardGame = buildBoard1()
        placeMines(gBoardGame, i, j)
        gFirstClick = false
    }

    var cell = gBoardGame[i][j]
    if (cell.isShown || cell.isMarked) return

    cell.isShown = true
    gGame.shownCount++

    cell.minesAroundCount = setMinesNegsCount(gBoardGame, i, j)
    renderCell({ i, j }, cell.isMine ? MINES : cell.minesAroundCount)

    if (cell.isMine) {
        gameOver()
        setTimeout(() => {
            resetBoard()
        }, 500);
    }
    if (cell.minesAroundCount === 0) expandShown(gBoardGame, elCell, i, j)
    checkWin()
}
function checkWin() {
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {

            var currCell = gBoardGame[i][j]

            if (currCell.isMine && !currCell.isMarked) return
            if (!currCell.isMine && !currCell.isShown) return
        }
    }
    gGame.isOn = false
    setTimeout(() => {
        var emoji = document.querySelector('.smileyBtn')
        emoji.innerText = WIN
        alert('Win!')
    }, 150);

}
function gameOver() {
    gGame.isOn = false
    var lives = document.querySelector('.Lives span').innerText = gCountOfLive
    if (gCountOfLive > 1) {
        setTimeout(() => {
            alert('The Round Is Over !')
        }, 100);
        showAllMines()
        return
    } else {
        showAllMines();
        setTimeout(() => {
            alert('GAME OVER !');
        }, 150);
    }
}
function resetBoard() {
    var emoji = document.querySelector('.smileyBtn')
    if (gameOver) emoji.innerText = LOSE
    // else emoji.innerText = '😊'
    gCountOfLive--
    if (gCountOfLive === 0) {
        resetBoard()
        gCountOfLive = 3
    }
    gFirstClick = true
    gGame.shownCount = 0
    gGame.markedCount = 0
    gGame.isOn = false
    gBoardGame = buildBoard1()
    renderBoard(gBoardGame)
}
function showAllMines() {
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            var cell = gBoardGame[i][j]
            if (cell.isMine) {
                renderCell({ i, j }, MINES)
            }
        }
    }
}
function onCellMarkedRightClick(event, i, j) {
    event.preventDefault();
    var cell = gBoardGame[i][j]

    if (!cell.isMarked) {
        cell.isMarked = true
        renderCell({ i, j }, FLAG)
    } else {
        cell.isMarked = false
        renderCell({ i, j }, '')
    }
}
function addRightClickListeners() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('contextmenu', (event) => {
            event.preventDefault()

            const classNames = cell.className.split(' ')
            const i = parseInt(classNames.find(c => c.includes('cell-')).split('-')[1]);
            const j = parseInt(classNames.find(c => c.includes('cell-')).split('-')[2]);

            onCellMarkedRightClick(event, i, j)
        });
    });
}
function expandShown(board, elCell, i, j) {
    const cell = board[i][j];
    if (cell.isShown || cell.isMine) {
        return;
    }
    cell.isShown = true;
    gGame.shownCount++;
    renderCell({ i, j }, cell.minesAroundCount);
    if (cell.minesAroundCount === 0) {
        for (var x = i - 1; x <= i + 1; x++) {
            for (var y = j - 1; y <= j + 1; y++) {
                if (x < 0 || x >= board.length || y < 0 || y >= board[x].length) continue;

                const neighbor = board[x][y];
                if (!neighbor.isShown && !neighbor.isMine) {
                    const neighborElCell = document.querySelector(`.cell-${x}-${y}`);
                    if (neighborElCell) {
                        expandShown(board, neighborElCell, x, y);
                    }
                }
            }
        }
    }
}
function beginnerBoard() {
    gLevel.SIZE = 4
    gLevel.MINES = 2
    resetBoard()
}
function mediumBoard() {
    gLevel.SIZE = 8
    gLevel.MINES = 14
    resetBoard()
}
function expertBoard() {
    gLevel.SIZE = 12
    gLevel.MINES = 32
    resetBoard()
}




