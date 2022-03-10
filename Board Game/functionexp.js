let cells = document.querySelectorAll(".row > div");
let display = document.querySelector("#display")
let restartButton = document.querySelector("#restart")
let playerX = "X"
let playerO = "O"
let currentPlayer = playerX

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", cellClicked);
}

// can place function in a for loop to active
function cellClicked(ev) {
    //ev.target.textContent = "X"
    if (currentPlayer === playerX) {
        ev.target.textContent = currentPlayer
        if (playerVictory()) {
            results()
        }
        currentPlayer = playerO
    } else {
        ev.target.textContent = currentPlayer
        if (playerVictory()) {
            results()
        }
        currentPlayer = playerX
    }
}


function playerVictory() {
    console.log(cells[0].textContent, "currentPlayer: " + currentPlayer)
    if (cells[0].textContent === currentPlayer) {

        if (cells[1].textContent === currentPlayer && cells[2].textContent === currentPlayer) {
            document.getElementById("display").innerHTML = `Congratulations!!  ${currentPlayer} wins the game!!  Let's Play Again ! `;

            return true;
        }
        if (cells[3].textContent === currentPlayer && cells[6].textContent === currentPlayer) {
            document.getElementById("display").innerHTML = `Congratulations!!  ${currentPlayer} wins the game!!  Let's Play Again ! `;
            return true;
        }
        if (cells[4].textContent === currentPlayer && cells[8].textContent === currentPlayer) {
            document.getElementById("display").innerHTML = `Congratulations!!  ${currentPlayer} wins the game!!  Let's Play Again ! `;
            return true;
        }
    }
    if (cells[8].textContent === currentPlayer) {
        if (cells[2].textContent === currentPlayer && cells[5].textContent === currentPlayer) {
            document.getElementById("display").innerHTML = `Congratulations!!  ${currentPlayer} wins the game!!  Let's Play Again ! `;
            return true;
        }
        if (cells[6].textContent === currentPlayer && cells[7].textContent === currentPlayer) {
            document.getElementById("display").innerHTML = `Congratulations!!  ${currentPlayer} wins the game!!  Let's Play Again ! `;
            return true;
        }
    }
    if (cells[4].textContent === currentPlayer) {
        if (cells[1].textContent === currentPlayer && cells[7].textContent === currentPlayer) {
            document.getElementById("display").innerHTML = `Congratulations!!  ${currentPlayer} wins the game!!  Let's Play Again ! `;
            return true;
        }
        if (cells[3].textContent === currentPlayer && cells[5].textContent === currentPlayer) {
            document.getElementById("display").innerHTML = `Congratulations!!  ${currentPlayer} wins the game!!  Let's Play Again ! `;
            return true;
        }
        if (cells[2].textContent === currentPlayer && cells[6].textContent === currentPlayer) {
            document.getElementById("display").innerHTML = `Congratulations!!  ${currentPlayer} wins the game!!  Let's Play Again ! `;
            return true;
        }
    } 
    
};


function results() {
    alert(`Hmmm, I see you've won player ${currentPlayer}. Congrats, Let's test your luck again!! `);
};

display.addEventListener("click", results);

function restart() {
    cells.forEach((cell, i) => {
        cells[i] = null;
    });
    cells.forEach((cell) => {
        cell.innerText = '';
    });
    document.getElementById("display").innerHTML = " ";

}

restartButton.addEventListener("click", restart);


function toggleSound() {
    let mySound = document.getElementById("mySound");
    return mySound.paused ? mySound.play() : mySound.pause();
};