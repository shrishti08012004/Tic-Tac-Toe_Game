let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true; // player0 starts
let count = 0;    // to track moves

const winPatterns = [
  [0,1,2],
  [0,3,6],
  [0,4,8],
  [1,4,7],
  [2,5,8],
  [2,4,6],
  [3,4,5],
  [6,7,8],
];

const resetGame = () => {
  turn0 = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if(turn0){ 
      box.innerText = "0";
      box.style.color = "red";   
      turn0 = false;
    } else {
      box.innerText = "X";
      box.style.color = "black"; 
      turn0 = true;
    }
    box.disabled = true;
    count++;   // increase move count

    let isWinner = checkWinner();

    // if all 9 moves are played and no winner → Draw
    if(count === 9 && !isWinner){
      showDraw();
    }
  });
});

const disableBoxes = () => {
  for(let box of boxes){
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for(let box of boxes){
    box.disabled = false;
    box.innerText= "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `🎉 Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const showDraw = () => {
  msg.innerText = "😮 It's a Draw!";
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for( let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
      if(pos1Val === pos2Val && pos2Val === pos3Val){
        showWinner(pos1Val);
        return true;  //  winner found
      }
    }
  }
  return false; // no winner
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
