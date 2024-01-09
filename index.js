const nameForm = document.getElementById("name-form");
const nameFormContainer = document.getElementById("name-form-container");
const playerOneHeader = document.getElementById("player-1");
const playerTwoHeader = document.getElementById("player-2");
const playerOneScore = document.getElementById("player-1-score");
const playerTwoScore = document.getElementById("player-2-score");
const changeNameButton = document.getElementById("change-name");
const blackBall = document.getElementById("black");
const pinkBall = document.getElementById("pink");
const blueBall = document.getElementById("blue");
const brownBall = document.getElementById("brown");
const greenBall = document.getElementById("green");
const yellowBall = document.getElementById("yellow");
const redBall = document.getElementById("red");
const balls = document.getElementById("balls");
const player1Tile = document.getElementById("player-1-tile");
const player2Tile = document.getElementById("player-2-tile");
const bulk = document.getElementById("bulk");
const foul = document.getElementById("foul");
const foulMSG = document.getElementById("foul-msg");
const safety = document.getElementById("safety");
const miss = document.getElementById("miss");
const addRed = document.getElementById("add-red");
const minusRed = document.getElementById("minus-red");
const timerContainer = document.getElementById("timer-container");
const minsElapsed = document.getElementById("mins-elapsed");
const secsElapsed = document.getElementById("secs-elapsed");
const endFrameButton = document.getElementById("end-frame");
const playerOneFrameCountContainer = document.getElementById("player-1-framecount");
const playerTwoFrameCountContainer = document.getElementById("player-2-framecount");

let playerOne = "";
let playerTwo = "";
let playerOneTotal = 0;
let playerTwoTotal = 0;
let playerOneFrameCount;
let playerTwoFrameCount;

let totalRedsLeft = 15;
let currentFoul = false;
let timerSeconds = 0;
let timerMinutes = 0;
let currentBreak = 0;
let frameNumber = 1;
let gamesPlayed;
let started = false;
let finalRedColourCheck = null;
let finalColourCheck = [];

if (window.localStorage.gamesPlayed) {
 gamesPlayed = window.localStorage.gamesPlayed;
} else {
 gamesPlayed = 0;
 window.localStorage.gamesPlayed = 0;
}
if (window.localStorage.playerOneFrameCount) {
 playerOneFrameCount = window.localStorage.playerOneFrameCount;
 playerOneFrameCountContainer.innerHTML = playerOneFrameCount;
} else {
 playerOneFrameCount = 0;
 window.localStorage.playerOneFrameCount = 0;
 playerOneFrameCountContainer.innerHTML = playerOneFrameCount;
}
if (window.localStorage.playerTwoFrameCount) {
 playerTwoFrameCount = window.localStorage.playerTwoFrameCount;
 playerTwoFrameCountContainer.innerHTML = playerTwoFrameCount;
} else {
 playerTwoFrameCount = 0;
 window.localStorage.playerTwoFrameCount = 0;
 playerTwoFrameCountContainer.innerHTML = playerTwoFrameCount;
}

const timer = setInterval(() => {
 if (started) {
  if (timerSeconds === 59) {
   timerMinutes++;
   minsElapsed.innerHTML = timerMinutes + ":";
   timerSeconds = 0;
   secsElapsed.innerHTML = "0" + timerSeconds;
  } else {
   timerSeconds++;
   secsElapsed.innerHTML = timerSeconds < 10 ? "0" + timerSeconds : timerSeconds;
  }
 }
}, 1000);

let currentPots = {
 1: { red: 0, yellow: 0, green: 0, brown: 0, blue: 0, pink: 0, black: 0, score: 0 },
 2: { red: 0, yellow: 0, green: 0, brown: 0, blue: 0, pink: 0, black: 0, score: 0 },
};

const undo = [];
const redo = [];

// window.localStorage.test = JSON.stringify({ red: 1, blue: 8 });
// console.log(JSON.parse(window.localStorage.test));

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

player1Tile.addEventListener("click", () => {
 currentPlayer = 1;
 player2Tile.className = "";
 player1Tile.className = "current";
});
player2Tile.addEventListener("click", () => {
 currentPlayer = 2;
 player1Tile.className = "";
 player2Tile.className = "current";
});

if (window.localStorage.player1 && window.localStorage.player2) {
 playerOne = window.localStorage.player1;
 playerTwo = window.localStorage.player2;
 nameFormContainer.className = "hidden";
 bulk.className = "";
 changeNameButton.className = "";
 playerOneHeader.innerHTML = playerOne;
 playerTwoHeader.innerHTML = playerTwo;
 started = true;
}
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
nameForm.addEventListener("submit", (event) => {
 event.preventDefault();
 playerOne = event.target[0].value;
 playerTwo = event.target[1].value;
 nameFormContainer.className = "hidden";
 playerOneHeader.innerHTML = playerOne;
 playerTwoHeader.innerHTML = playerTwo;
 changeNameButton.className = "";
 window.localStorage.player1 = playerOne;
 window.localStorage.player2 = playerTwo;
 bulk.className = "";
 started = true;
});

changeNameButton.addEventListener("click", () => {
 const check = confirm("This will delete all game data!");
 if (check) {
  localStorage.clear();
  nameFormContainer.className = "";
  bulk.className = "hidden";
  changeNameButton.className = "hidden";
  playerOneFrameCount = 0;
  playerTwoFrameCount = 0;
  playerOneTotal = 0;
  playerTwoTotal = 0;
  playerOneFrameCountContainer.innerHTML = playerOneFrameCount;
  playerTwoFrameCountContainer.innerHTML = playerTwoFrameCount;
  playerOneScore.innerHTML = playerOneTotal;
  playerTwoScore.innerHTML = playerOneTotal;
  started = false;
  timerMinutes = 0;
  timerSeconds = 0;
  minsElapsed.innerHTML = timerMinutes + ":";
  secsElapsed.innerHTML = "0" + timerSeconds;
 } else {
  return;
 }
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
  if (finalRedColourCheck === true) {
   handleFoulsAtEnd();
  }
  return;
 }
 if (finalRedColourCheck === true) {
  //   disableColours([blackBall]);
  if (!finalColourCheck.includes("black")) finalColourCheck.push("black");
  endGameChecker();
 }
 if (finalRedColourCheck === false) {
  finalRedColourCheck = true;
  disableColours(ballsArray);
  enableColours([yellowBall]);
 }
 currentPots[currentPlayer].black++;
 window.localStorage[frameNumber] = JSON.stringify(currentPots);
 if (currentPlayer === 1) {
  playerOneTotal += 7;
  playerOneScore.innerHTML = playerOneTotal;
 } else {
  playerTwoTotal += 7;
  playerTwoScore.innerHTML = playerTwoTotal;
 }
 if (totalRedsLeft !== 0) {
  disableColours(ballsArray);
 }
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
  if (finalRedColourCheck === true) {
   handleFoulsAtEnd();
  }
  return;
 }
 if (finalRedColourCheck === true) {
  disableColours([pinkBall]);
  if (!finalColourCheck.includes("pink")) finalColourCheck.push("pink");
  enableColours([blackBall]);
 }
 if (finalRedColourCheck === false) {
  finalRedColourCheck = true;
  disableColours(ballsArray);
  enableColours([yellowBall]);
 }
 currentPots[currentPlayer].pink++;
 window.localStorage[frameNumber] = JSON.stringify(currentPots);
 if (currentPlayer === 1) {
  playerOneTotal += 6;
  playerOneScore.innerHTML = playerOneTotal;
 } else {
  playerTwoTotal += 6;
  playerTwoScore.innerHTML = playerTwoTotal;
 }
 if (totalRedsLeft !== 0) {
  disableColours(ballsArray);
 }
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
  if (finalRedColourCheck === true) {
   handleFoulsAtEnd();
  }
  return;
 }
 if (finalRedColourCheck === true) {
  disableColours([blueBall]);
  if (!finalColourCheck.includes("blue")) finalColourCheck.push("blue");
  enableColours([pinkBall]);
 }
 if (finalRedColourCheck === false) {
  finalRedColourCheck = true;
  disableColours(ballsArray);
  enableColours([yellowBall]);
 }
 currentPots[currentPlayer].blue++;
 window.localStorage[frameNumber] = JSON.stringify(currentPots);
 if (currentPlayer === 1) {
  playerOneTotal += 5;
  playerOneScore.innerHTML = playerOneTotal;
 } else {
  playerTwoTotal += 5;
  playerTwoScore.innerHTML = playerTwoTotal;
 }
 if (totalRedsLeft !== 0) {
  disableColours(ballsArray);
 }
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
  if (finalRedColourCheck === true) {
   handleFoulsAtEnd();
  }
  return;
 }
 if (finalRedColourCheck === true) {
  disableColours([brownBall]);
  if (!finalColourCheck.includes("brown")) finalColourCheck.push("brown");
  enableColours([blueBall]);
 }
 if (finalRedColourCheck === false) {
  finalRedColourCheck = true;
  disableColours(ballsArray);
  enableColours([yellowBall]);
 }
 currentPots[currentPlayer].brown++;
 window.localStorage[frameNumber] = JSON.stringify(currentPots);
 if (currentPlayer === 1) {
  playerOneTotal += 4;
  playerOneScore.innerHTML = playerOneTotal;
 } else {
  playerTwoTotal += 4;
  playerTwoScore.innerHTML = playerTwoTotal;
 }
 if (totalRedsLeft !== 0) {
  disableColours(ballsArray);
 }
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
  if (finalRedColourCheck === true) {
   handleFoulsAtEnd();
  }
  return;
 }
 if (finalRedColourCheck === true) {
  disableColours([greenBall]);
  if (!finalColourCheck.includes("green")) finalColourCheck.push("green");
  enableColours([brownBall]);
 }
 if (finalRedColourCheck === false) {
  finalRedColourCheck = true;
  disableColours(ballsArray);
  enableColours([yellowBall]);
 }
 currentPots[currentPlayer].green++;
 window.localStorage[frameNumber] = JSON.stringify(currentPots);
 if (currentPlayer === 1) {
  playerOneTotal += 3;
  playerOneScore.innerHTML = playerOneTotal;
 } else {
  playerTwoTotal += 3;
  playerTwoScore.innerHTML = playerTwoTotal;
 }
 if (totalRedsLeft !== 0) {
  disableColours(ballsArray);
 }
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
  if (finalRedColourCheck === true) {
   handleFoulsAtEnd();
  }
  return;
 }
 if (finalRedColourCheck === true) {
  disableColours([yellowBall]);
  if (!finalColourCheck.includes("yellow")) finalColourCheck.push("yellow");
  enableColours([greenBall]);
 }
 if (finalRedColourCheck === false) {
  finalRedColourCheck = true;
  disableColours(ballsArray);
  enableColours([yellowBall]);
 }
 currentPots[currentPlayer].yellow++;
 window.localStorage[frameNumber] = JSON.stringify(currentPots);
 if (currentPlayer === 1) {
  playerOneTotal += 2;
  playerOneScore.innerHTML = playerOneTotal;
 } else {
  playerTwoTotal += 2;
  playerTwoScore.innerHTML = playerTwoTotal;
 }
 if (totalRedsLeft !== 0) {
  disableColours(ballsArray);
 }
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
  currentPots[currentPlayer].red++;
  window.localStorage[frameNumber] = JSON.stringify(currentPots);
  enableColours(ballsArray);
  if (currentPlayer === 1) {
   playerOneTotal += 1;
   playerOneScore.innerHTML = playerOneTotal;
  } else {
   playerTwoTotal += 1;
   playerTwoScore.innerHTML = playerTwoTotal;
  }
  totalRedsLeft--;
  if (totalRedsLeft === 0) {
   finalRedColourCheck = false;
   disableColours([redBall]);
  }
  redBall.innerHTML = totalRedsLeft;
 } else {
  alert("no reds left");
 }
});
foulMSG.addEventListener("click", () => {
 currentFoul = false;
 foulMSG.className = "hidden";
 disableColours(ballsArray);
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
  if (totalRedsLeft > 0) {
   enableColours([redBall]);
  }
 }
});
minusRed.addEventListener("click", () => {
 if (totalRedsLeft > 0) {
  totalRedsLeft--;
  redBall.innerHTML = totalRedsLeft;
 }
 if (totalRedsLeft === 0) {
  disableColours([redBall]);
 }
});
endFrameButton.addEventListener("click", () => {
 endGame();
});

function endGameChecker() {
 if (totalRedsLeft === 0 && finalColourCheck.length === 6) {
  endGame();
 }
}

function endGame() {
 const check = confirm("Confirm end game, progress will be stored");
 if (check) {
  currentPots[1].score = playerOneTotal;
  currentPots[2].score = playerTwoTotal;
  window.localStorage[frameNumber] = JSON.stringify(currentPots);
  if (playerOneTotal === playerTwoTotal) return alert("settle draw!");
  if (playerOneTotal > playerTwoTotal) {
   playerOneFrameCount++;
   playerOneFrameCountContainer.innerHTML = playerOneFrameCount;
   window.localStorage.playerOneFrameCount = playerOneFrameCount;
  } else {
   playerTwoFrameCount++;
   playerTwoFrameCountContainer.innerHTML = playerTwoFrameCount;
   window.localStorage.playerTwoFrameCount = playerTwoFrameCount;
  }
  frameNumber++;
  currentPots = {
   1: { red: 0, yellow: 0, green: 0, brown: 0, blue: 0, pink: 0, black: 0, score: 0 },
   2: { red: 0, yellow: 0, green: 0, brown: 0, blue: 0, pink: 0, black: 0, score: 0 },
  };
  totalRedsLeft = 15;
  redBall.innerHTML = totalRedsLeft;
  gamesPlayed++;
  window.localStorage.gamesPlayed = gamesPlayed;
  timerMinutes = 0;
  timerSeconds = 0;
  minsElapsed.innerHTML = timerMinutes + ":";
  secsElapsed.innerHTML = "0" + timerSeconds;
  playerOneTotal = 0;
  playerTwoTotal = 0;
  playerOneScore.innerHTML = playerOneTotal;
  playerTwoScore.innerHTML = playerTwoTotal;
  enableColours([redBall]);
 }
}
function handleFoulsAtEnd() {
 const order = ["yellow", "green", "brown", "blue", "pink", "black"];
 const currentColour = finalColourCheck[finalColourCheck.length - 1];
 const colours = {
  yellow: yellowBall,
  green: greenBall,
  brown: brownBall,
  blue: blueBall,
  pink: pinkBall,
  black: blackBall,
 };
 enableColours([colours[order[order.indexOf(currentColour) + 1]]]);
}
//add scores to the bottom???

// const test = document.createElement("p");
// test.innerHTML = window.localStorage.player2;
// document.getElementById("results").appendChild(test);
