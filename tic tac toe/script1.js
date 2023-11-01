let audioTurn = new Audio("ting.mp3");
let gameOver = new Audio("gameover.mp3");

let reset = document.getElementById("reset");
let newGame = document.getElementById("new");

let turn = "X"
let isGameOver = false;
let x = 0;
let y = 0;

const changeTurn = () => {
    return turn==="X"?"O":"X";
}

const xwin =(e) => {
    let boxtext = document.getElementsByClassName('boxtext');
    document.querySelector(".x").innerText = `X: ${x}`

}

const ywin =(e) => {
    let boxtext = document.getElementsByClassName('boxtext');
    document.querySelector(".y").innerText = boxtext[e[0]].innerText + `: ${y}`;

}

//check wiin
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 10, 0],
        [3, 4, 5, 5, 30, 0],
        [6, 7, 8, 5, 50, 0],
        [0, 3, 6, -5, 30, 90],
        [1, 4, 7, 5, 30, 90],
        [2, 5, 8, 15, 30, 90],
        [0, 4, 8, 5, 30, 45],
        [2, 4, 6, 5, 30, 135],
    ]
    wins.forEach(e => {
        if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "")){
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won";
            boxtext[e[0]].innerText === "X"?x++:y++;
            boxtext[e[0]].innerText === "X"?xwin(e):ywin(e);

            isGameOver = true;
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
            document.querySelector('.line').style.transform = `translate(${e[3]}vw, ${e[4]}vh) rotate(${e[5]}deg)`;
            document.querySelector('.line').style.width = "20vw";
        }
    })
}

//game logic

let boxex = document.getElementsByClassName("box");
Array.from(boxex).forEach(element => {
    let boxtext = element.querySelector(".boxtext")
    element.addEventListener("click", ()=>{
        if(boxtext.innerText === ""){
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if(!isGameOver){
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn
            }
        }
    })
})

const clear = () => {
    let boxtex = document.querySelectorAll(".boxtext")
    Array.from(boxtex).forEach((element) => (element.innerHTML = ""))
    turn = "X"
    isGameOver = false;
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px"
    document.querySelector('.line').style.width = "0vw";
    document.querySelector('.line').style.transition = "width 0s";
}

//newGame click
newGame.addEventListener("click", () => {
    clear();
});

//reset click
reset.addEventListener('click', () => {
    console.log("working");
    x = 0;
    y = 0;
    xwin();
    ywin();
    clear();
})

