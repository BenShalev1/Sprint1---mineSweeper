'use strict'

// function renderBoard(mat, selector) {

//     var strHTML = '<table><tbody>'
//     for (var i = 0; i < mat.length; i++) {

//         strHTML += '<tr>'
//         for (var j = 0; j < mat[0].length; j++) {

//             const cell = mat[i][j]
//             const className = `cell cell-${i}-${j}`

//             strHTML += `<td class="${className}">${cell}</td>`
//         }
//         strHTML += '</tr>'
//     }
//     strHTML += '</tbody></table>'

//     const elContainer = document.querySelector(selector)
//     elContainer.innerHTML = strHTML
// }

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {

    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
    elCell.classList.add('revealed')

    if (value === MINES) {
        elCell.classList.add('mine');
    }
}


// function showModal(isVictory) {
//     // console.log('hi modal')
//     const victory = 'You Win'
//     const notVictory = 'You Lose'
//     const msg = (isVictory) ? victory : notVictory

//     var elSpan = document.querySelector('.modal span')
//     var elModal = document.querySelector('.modal')
//     elSpan.innerText = msg

//     elModal.style.display = 'block'
//     console.log(elModal)
// }

// function HideModal() {
//     var elModal = document.querySelector('.modal')
//     elModal.style.display = 'none'
// }


function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'

    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}


function emptyCells() {
    var emptyCells = []

    for (var i = 1; i < gBoard.length - 1; i++) {
        for (var j = 1; j < gBoard[0].length - 1; j++) {
            var currCell = gBoard[i][j]

            if (currCell.gameElement === null) {
                emptyCells.push({ i, j })
            }
        }
    }

    return emptyCells

}


function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}


function createMat(rows, cols) {
    const mat = []
    for (var i = 0; i < rows; i++) {
        const row = []
        for (var j = 0; j < cols; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}


function showModal() {
    var elmodal = document.querySelector('.modal')
    elmodal.style.display = 'block'
}

function hideModal() {
    var elmodal = document.querySelector('.modal')
    elmodal.style.display = 'none'
}

function addSound() {
    var audio = new Audio('../sound/ball-collected.mp3')
    audio.play()
}

function countNegs2(cellI, cellJ, mat) {
    var count = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= mat[i].length) continue
            if (mat[i][j]) count++
        }
    }
    return count
}