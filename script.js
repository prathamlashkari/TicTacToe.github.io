// Accesing all elemnts using qureyselector
const cellelements = document.querySelectorAll(".container .boxes")
let p1 = document.querySelector(".turns .player1")
let p2 = document.querySelector(".turns .player2")
let reset = document.querySelector(".resets")
let results = document.querySelector(".result")
let res_header = document.querySelector(".result h1")
let restarts = document.querySelector(".result .restart")

// All audio selectorss
let click = new Audio("Click.mp3")
let win = new Audio("win1.mp3")
let dra = new Audio("draw.mp3")

const playo = "o"
const playx = "x"
let toog = true;


//  logic for the winning 
const win_con = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]


// using for each loop for each boxes
cellelements.forEach(cell => {
    // console.log(cell) show all boxes in concoles
    cell.addEventListener('click', () => {
        let curr = toog ? playo : playx;
        click.play()
        cell.classList.add("disable", curr)
        cell.innerHTML = curr
        if (winner(curr)) {
            result_show(curr)
        }
        else if (idraw()) {
            res_draw()
        } else {

            swaps()
        }
    })
})
// changes the user turns
function swaps() {
    toog = !toog
    if (toog) {
        p1.classList.add("active")
        p2.classList.remove("active")
    }
    else {
        p2.classList.add("active")
        p1.classList.remove("active")
    }
}

// Checing the winner conditions
function winner(curr) {
    return win_con.some(condi => {
        return condi.every(pl => {
            return cellelements[pl].classList.contains(curr)
        })
    })
}
//reset button to reset the values
reset.addEventListener("click", (curr) => {
    toog = true;
    cellelements.forEach(cell => {
        cell.innerHTML = ""
        cell.classList.remove("disable")
        cell.classList.remove(playo)
        cell.classList.remove(playx)
    })
})

// draw functions

function idraw() {
    return [...cellelements].every(cell => {
        return cell.classList.contains(playx) || cell.classList.contains(playo)
    })
}

// For showing the results

function result_show(curr) {
    results.classList.remove("inactive")
    res_header.innerHTML = `Winner is ${curr.toUpperCase()}`
    win.play()
}

function res_draw(curr) {
    results.classList.remove("inactive")
    res_header.innerHTML = `!!Draw!!`
    dra.play()
}

restarts.onclick = () => {
    results.classList.add("inactive")
    win.pause()
    win.currentTime =0
    toog = true
    cellelements.forEach(cell => {
        cell.innerHTML = ""
        cell.classList.remove("disable")
        cell.classList.remove(playo)
        cell.classList.remove(playx)
    })
    // location.reload()
}



