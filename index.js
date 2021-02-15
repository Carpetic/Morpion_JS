const status = document.getElementById("playerTurn")
const caseClick = document.getElementsByClassName("case")
const reset = document.getElementById("replay")

let tieGame = false
let currentGame = true
let player = "X"
let gameAvancement = ["", "", "", "", "", "", "", "", ""]

const win = () => `The Player ${player} has Won`
const tie = () => 'No one has Won'
const turn = () => `It's the turn of the Player ${player} to play`
const wrong = () => 'This case is already used'

function checkWin() {
    let i = 0
    if ((gameAvancement[0] === player && gameAvancement[1] === player && gameAvancement[2] === player) ||
        (gameAvancement[3] === player && gameAvancement[4] === player && gameAvancement[5] === player) ||
        (gameAvancement[6] === player && gameAvancement[7] === player && gameAvancement[8] === player)) {
            currentGame = false
    }
    if ((gameAvancement[0] === player && gameAvancement[3] === player && gameAvancement[6] === player) ||
        (gameAvancement[1] === player && gameAvancement[4] === player && gameAvancement[7] === player) ||
        (gameAvancement[2] === player && gameAvancement[5] === player && gameAvancement[8] === player)) {
            currentGame = false
        
    }
    if ((gameAvancement[0] === player && gameAvancement[4] === player && gameAvancement[8] === player) ||
        (gameAvancement[2] === player && gameAvancement[4] === player && gameAvancement[6] === player)) {
            currentGame = false
    }
    gameAvancement.forEach(element => {
        if (element !== "")
            i++
    });
    if (i === 9 && currentGame === true) {
        currentGame = false
        tieGame = true
    }
}

function GestionClick() {
    const indexCase = parseInt(this.dataset.index)    

    if (gameAvancement[indexCase] !== "" && currentGame === true) {
        status.innerHTML = wrong()
        return;
    } else if (currentGame === true){
        gameAvancement[indexCase] = player
        this.innerHTML = player
    }

    checkWin()

    if (player === "X" && currentGame === true)
        player = "O"
    else  if (currentGame === true)
        player = "X"
    if (currentGame === false && tieGame === false)
        status.innerHTML = win()
    else if (currentGame === false && tieGame === true)
        status.innerHTML = tie()
    else
        status.innerHTML = turn()
}

function replay() {
    player = "X"
    status.innerHTML = turn()
    gameAvancement = ["", "", "", "", "", "", "", "", ""]
    Array.from(caseClick).forEach(element => {
        element.innerHTML = "&nbsp"
    })
    currentGame = true
    tieGame = false
}

Array.from(caseClick).forEach(function(element) {
      element.addEventListener('click', GestionClick);
});

document.querySelector("#replay").addEventListener('click', replay)

status.innerHTML = turn()
