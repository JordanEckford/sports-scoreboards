const nameForm = document.getElementById("name-form");
const playerOneHeader = document.getElementById("player-1");
const playerTwoHeader = document.getElementById("player-2");
const playerOneScore = document.getElementById("player-1-score");
const playerTwoScore = document.getElementById("player-2-score");
const restartButton = document.getElementById("restart-game");
const blackBall = document.getElementById("black");
const pinkBall = document.getElementById("pink");
const blueBall = document.getElementById("blue");
const brownBall = document.getElementById("brown");
const greenBall = document.getElementById("green");
const yellowBall = document.getElementById("yellow");
const redBall = document.getElementById("red");
const balls = document.getElementById("balls");
const turnSwitcher = document.getElementById("turn-switcher");
const player1Tile = document.getElementById("player-1-tile");
const player2Tile = document.getElementById("player-2-tile");
const bulk = document.getElementById("bulk");
const foul = document.getElementById("foul");
const foulMSG = document.getElementById("foul-msg");
const safety = document.getElementById("safety");
const miss = document.getElementById("miss");
const addRed = document.getElementById("add-red");
const minusRed = document.getElementById("minus-red");

let playerOne = "";
let playerTwo = "";
let playerOneTotal = 0;
let playerTwoTotal = 0;
let totalRedsLeft = 15;
let currentFoul = false;

const undo = [];
const redo = [];

const ballsArray = [blackBall, pinkBall, blueBall, brownBall, greenBall, yellowBall];

playerOneScore.innerHTML = playerOneTotal;
playerTwoScore.innerHTML = playerTwoTotal;

function disableColours(balls) {
 balls.forEach((ball) => {
  ball.disabled = true;
  ball.className = "disabled";
 });
}
function enableColours(balls) {
 balls.forEach((ball) => {
  ball.disabled = false;
  ball.className = "ball";
 });
}
disableColours(ballsArray);

let currentPlayer = 1;

function changePlayer() {
 if (currentPlayer === 1) {
  currentPlayer = 2;
  player1Tile.className = "";
  player2Tile.className = "current";
 } else if (currentPlayer === 2) {
  currentPlayer = 1;
  player2Tile.className = "";
  player1Tile.className = "current";
 }
}

turnSwitcher.addEventListener("click", () => {
 changePlayer();
});

if (window.localStorage.player1 && window.localStorage.player2) {
 playerOne = window.localStorage.player1;
 playerTwo = window.localStorage.player2;
 nameForm.className = "hidden";
 restartButton.className = "";
 playerOneHeader.innerHTML = playerOne;
 playerTwoHeader.innerHTML = playerTwo;
}

nameForm.addEventListener("submit", (event) => {
 event.preventDefault();
 playerOne = event.target[0].value;
 playerTwo = event.target[1].value;
 nameForm.className = "hidden";
 playerOneHeader.innerHTML = playerOne;
 playerTwoHeader.innerHTML = playerTwo;
 restartButton.className = "";
 window.localStorage.player1 = playerOne;
 window.localStorage.player2 = playerTwo;
 bulk.className = "";
});

restartButton.addEventListener("click", () => {
 nameForm.className = "";
 bulk.className = "hidden";
});

blackBall.addEventListener("click", () => {
 if (currentFoul) {
  if (currentPlayer === 1) {
   playerTwoTotal += 7;
   playerTwoScore.innerHTML = playerTwoTotal;
  } else {
   playerOneTotal += 7;
   playerOneScore.innerHTML = playerOneTotal;
  }
  currentFoul = false;
  foulMSG.className = "hidden";
  disableColours(ballsArray);
  changePlayer();
  return;
 }
 if (currentPlayer === 1) {
  playerOneTotal += 7;
  playerOneScore.innerHTML = playerOneTotal;
 } else {
  playerTwoTotal += 7;
  playerTwoScore.innerHTML = playerTwoTotal;
 }
 disableColours(ballsArray);
});
pinkBall.addEventListener("click", () => {
 if (currentFoul) {
  if (currentPlayer === 1) {
   playerTwoTotal += 6;
   playerTwoScore.innerHTML = playerTwoTotal;
  } else {
   playerOneTotal += 6;
   playerOneScore.innerHTML = playerOneTotal;
  }
  currentFoul = false;
  foulMSG.className = "hidden";
  disableColours(ballsArray);
  changePlayer();
  return;
 }
 if (currentPlayer === 1) {
  playerOneTotal += 6;
  playerOneScore.innerHTML = playerOneTotal;
 } else {
  playerTwoTotal += 6;
  playerTwoScore.innerHTML = playerTwoTotal;
 }
 disableColours(ballsArray);
});
blueBall.addEventListener("click", () => {
 if (currentFoul) {
  if (currentPlayer === 1) {
   playerTwoTotal += 5;
   playerTwoScore.innerHTML = playerTwoTotal;
  } else {
   playerOneTotal += 5;
   playerOneScore.innerHTML = playerOneTotal;
  }
  currentFoul = false;
  foulMSG.className = "hidden";
  disableColours(ballsArray);
  changePlayer();
  return;
 }
 if (currentPlayer === 1) {
  playerOneTotal += 5;
  playerOneScore.innerHTML = playerOneTotal;
 } else {
  playerTwoTotal += 5;
  playerTwoScore.innerHTML = playerTwoTotal;
 }
 disableColours(ballsArray);
});
brownBall.addEventListener("click", () => {
 if (currentFoul) {
  if (currentPlayer === 1) {
   playerTwoTotal += 4;
   playerTwoScore.innerHTML = playerTwoTotal;
  } else {
   playerOneTotal += 4;
   playerOneScore.innerHTML = playerOneTotal;
  }
  currentFoul = false;
  foulMSG.className = "hidden";
  disableColours(ballsArray);
  changePlayer();
  return;
 }
 if (currentPlayer === 1) {
  playerOneTotal += 4;
  playerOneScore.innerHTML = playerOneTotal;
 } else {
  playerTwoTotal += 4;
  playerTwoScore.innerHTML = playerTwoTotal;
 }
 disableColours(ballsArray);
});
greenBall.addEventListener("click", () => {
 if (currentFoul) {
  if (currentPlayer === 1) {
   playerTwoTotal += 4;
   playerTwoScore.innerHTML = playerTwoTotal;
  } else {
   playerOneTotal += 4;
   playerOneScore.innerHTML = playerOneTotal;
  }
  currentFoul = false;
  foulMSG.className = "hidden";
  disableColours(ballsArray);
  changePlayer();
  return;
 }
 if (currentPlayer === 1) {
  playerOneTotal += 3;
  playerOneScore.innerHTML = playerOneTotal;
 } else {
  playerTwoTotal += 3;
  playerTwoScore.innerHTML = playerTwoTotal;
 }
 disableColours(ballsArray);
});
yellowBall.addEventListener("click", () => {
 if (currentFoul) {
  if (currentPlayer === 1) {
   playerTwoTotal += 4;
   playerTwoScore.innerHTML = playerTwoTotal;
  } else {
   playerOneTotal += 4;
   playerOneScore.innerHTML = playerOneTotal;
  }
  currentFoul = false;
  foulMSG.className = "hidden";
  disableColours(ballsArray);
  changePlayer();
  return;
 }
 if (currentPlayer === 1) {
  playerOneTotal += 2;
  playerOneScore.innerHTML = playerOneTotal;
 } else {
  playerTwoTotal += 2;
  playerTwoScore.innerHTML = playerTwoTotal;
 }
 disableColours(ballsArray);
});
redBall.addEventListener("click", () => {
 if (currentFoul) {
  if (currentPlayer === 1) {
   playerTwoTotal += 4;
   playerTwoScore.innerHTML = playerTwoTotal;
  } else {
   playerOneTotal += 4;
   playerOneScore.innerHTML = playerOneTotal;
  }
  currentFoul = false;
  foulMSG.className = "hidden";
  disableColours(ballsArray);
  changePlayer();
  return;
 }
 if (totalRedsLeft > 0) {
  enableColours(ballsArray);
  if (currentPlayer === 1) {
   playerOneTotal += 1;
   playerOneScore.innerHTML = playerOneTotal;
  } else {
   playerTwoTotal += 1;
   playerTwoScore.innerHTML = playerTwoTotal;
  }
  totalRedsLeft--;
  redBall.innerHTML = totalRedsLeft;
 } else {
  alert("no reds left");
 }
});
foulMSG.addEventListener("click", () => {
 currentFoul = false;
 foulMSG.className = "hidden";
});
foul.addEventListener("click", () => {
 currentFoul = true;
 enableColours(ballsArray);
 foulMSG.className = "";
});
safety.addEventListener("click", () => {
 changePlayer();
});
miss.addEventListener("click", () => {
 changePlayer();
});
addRed.addEventListener("click", () => {
 if (totalRedsLeft < 15) {
  totalRedsLeft++;
  redBall.innerHTML = totalRedsLeft;
 }
});
minusRed.addEventListener("click", () => {
 if (totalRedsLeft > 0) {
  totalRedsLeft--;
  redBall.innerHTML = totalRedsLeft;
 }
});
