console.log("Welcome to Tic Tac Toe");
let turn = "X";
let gameover = false;
let audioElement = new Audio("wonSong.mp3");

// Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "O" : "X";
};

// Function to check for a win
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 0, 5, 0],
        [3, 4, 5, 0, 15, 0],
        [6, 7, 8, 0, 25, 0],
        [0, 3, 6, -10, 15, 90],
        [1, 4, 7, 0, 15, 90],
        [2, 5, 8, 10, 15, 90],
        [0, 4, 8, 0.5, 15, 45],
        [2, 4, 6, 0.5, 15, 135],
    ];
    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && 
            (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && 
            (boxtext[e[0]].innerText !== "")) {
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won ";
            gameover = true;
            document.querySelector('.imgbox').getElementsByTagName("img")[0].style.width = "200px";
            document.querySelector('.line').style.width = '30vw';
            document.querySelector('.line').style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            audioElement.play();
        }
    });
};

// Function to check for a draw
const checkDraw = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let isDraw = true;
    Array.from(boxtext).forEach(box => {
        if (box.innerText === "") {
            isDraw = false; // Found an empty box, so not a draw
        }
    });

    // If all boxes are filled and no one has won, it's a draw
    if (isDraw && !gameover) {
        document.querySelector('.info').innerText = "It's a Draw!";
        gameover = true;
    }
};

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === "" && !gameover) {
            boxtext.innerText = turn;
            turn = changeTurn();
            checkWin(); // Check if someone won
            checkDraw(); // Check if it's a draw
            if (!gameover) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
        }
    });
});

// Add onclick listener to reset button
let reset = document.getElementById('reset');
reset.addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    gameover = false;
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
    document.querySelector('.line').style.width = '0vw';
    document.querySelector('.line').style.transform = '';
    audioElement.pause();
    audioElement.currentTime = 0; 
});