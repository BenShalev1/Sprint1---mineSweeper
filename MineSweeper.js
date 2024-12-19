'use strict'
const MINES = '💣'
const FLAG = '🚩'



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

function onInit() {
    gBoardGame = buildBoard1()
    console.table(gBoardGame);

    renderBoard(gBoardGame)
}


function buildBoard1() {
    const board = []

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
    board[1][1].isMine = board[3][3].isMine = true

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
    // console.log('index : ', elCell, { i, j });

    var cell = gBoardGame[i][j]
    if (cell.isShown || cell.isMarked) return
    // if (oncontextmenu === false) gBoardGame[i][j] = FLAG

    cell.isShown = true
    cell.minesAroundCount = setMinesNegsCount(gBoardGame, i, j)
    renderCell({ i, j }, cell.isMine ? MINES : cell.minesAroundCount)

    if (cell.isMine) {
        gameOver()
        setTimeout(() => {
            resetBoard()
        }, 500);
    } else {
        cell.isShown = true
        cell.shownCount++
        renderCell({ i, j }, cell.minesAroundCount)
    }

}

function checkWin(){
    var counter = 0 
    for(var i =0; i < gLevel.SIZE; i++){
        for(var j =0; j < gLevel.SIZE; l++){
            var cell = gBoardGame[i][j]
            if(cell.isMine === FLAG)
                counter++
            console.log('counter : ',counter);
            
        }
    }
}

function gameOver(){
    gGame.isOn = false
    showAllMines()
    setTimeout(() => {
        alert('GAME OVER !')
    }, 150);
}
function resetBoard(){
    gBoardGame = buildBoard1()
    gGame.shownCount = 0
    gGame.markedCount = 0
    gGame.isOn = false
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

function onCellRightClick(event, i, j) {
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
            event.preventDefault(); // מונע את פתיחת תפריט ההקשר של הדפדפן

            // נמצא את המיקום של התא מתוך ה-className
            const classNames = cell.className.split(' '); // פיצול ה-className למילים
            const i = parseInt(classNames.find(c => c.includes('cell-')).split('-')[1]);
            const j = parseInt(classNames.find(c => c.includes('cell-')).split('-')[2]);

            onCellRightClick(event, i, j);  // הפעלת הפונקציה של לחיצה ימנית
        });
    });
}

function onCellMarked(elCell) {

}

function expandShown(board, elCell, i, j) {

}
