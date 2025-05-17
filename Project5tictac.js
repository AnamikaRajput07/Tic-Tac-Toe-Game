const player_block=document.querySelector(".player");
const cell=document.querySelectorAll(".cell");
const newBtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// function to initialise the game
function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""]
    //empty on ui
    cell.forEach((cell,index)=>{
        cell.innerText="";
        cell.style.pointerEvents="all";
        cell.classList.remove("win");
    })
    newBtn.classList.remove("active");
    player_block.innerText=`Current Player-${currentPlayer}`;
}

initGame();


function swapTurns(){
    if(currentPlayer=="X") currentPlayer="O";
    else currentPlayer="X";

    player_block.innerText=`Current Player-${currentPlayer}`;
}

function checkWins(){
    let ans="";

    winningPosition.forEach((pos)=>{
    
        if((gameGrid[pos[0]] !== "" || gameGrid[pos[1]] !== "" || gameGrid[pos[2]] !== "") 
            && (gameGrid[pos[0]]===gameGrid[pos[1]] && gameGrid[pos[1]]===gameGrid[pos[2]]) ){

            
            cell[pos[0]].classList.add("win");
            cell[pos[1]].classList.add("win");
            cell[pos[2]].classList.add("win");

            // we got winners so disable all pointer events
            cell.forEach((cell)=>{
                cell.style.pointerEvents="none";
            })

            swapTurns();
            player_block.innerText=`Winner-${currentPlayer}`;
            newBtn.classList.add("active");
            return ;
        }
    })

    // when there is no winner
    let fillCount=0;
    gameGrid.forEach((cell)=>{
        if(cell!="")
            fillCount++;
    });

    if(fillCount===9){
        player_block.innerText=`Game Tied`;
        newBtn.classList.add("active");
        return ;
    }

}

function handleCLick(index){
    if(gameGrid[index] ===""){
        cell[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        cell[index].style.pointerEvents="none";
        swapTurns();
        checkWins();
    }
}

// add event listener on cells
cell.forEach((cell,index)=>{
    cell.addEventListener('click',()=>{
        handleCLick(index);
    });
});

newBtn.addEventListener("click",initGame);