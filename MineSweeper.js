'use strict'
const MINES = '💣'



var gCell = {
    minesAroundCount: 2,
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

function onInit() {
    gBoardGame = buildBoard1()
    console.table(gBoardGame);

    renderBoard(gBoardGame)

}

// function buildBoard() {
//     const board = []
//     for (var i = 0; i < gLevel.SIZE; i++) {
//         const row = []
//         for (var j = 0; j < gLevel.SIZE; j++) {
//             row.push({...gCell})
//         }
//         board.push(row)
//     }
//     board[1][1].isMine = board[3][3].isMine = true
//     console.table(board)
//     return board
// }

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
            console.log(cell);
        }
    }
    board[1][1].isMine = board[3][3].isMine = true
    
    return board
}

function renderBoard(mat) {

    var strHTML = '<table><tbody>'
    for (var i = 0; i < gLevel.SIZE; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < gLevel.SIZE; j++) {
            gCell = gBoardGame[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${gCell}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector('.container')
    elContainer.innerHTML = strHTML
}

function setMinesNegsCount(board, cellI, cellJ) {
    var count = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= board[i].length) continue
            if (board[i][j]) count++
        }
    }
    console.log(count);

    return count
}

function onCellClicked(elCell, i, j) {

}

function onCellMarked(elCell) {

}

function expandShown(board, elCell, i, j) {

}

function onCellClicked() {
    var cell = document.querySelector('.container')
}