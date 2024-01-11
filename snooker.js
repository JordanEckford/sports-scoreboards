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
const resultsLoader = document.getElementById("results-loader");
const goHomeButton = document.getElementById("go-home");
// const fullScreenButton = document.getElementById("go-fs");
// const fullScreenMesage = document.getElementById("fullscreen-msg");

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
let frameNumber;
let framesPlayed;
let started = false;
let finalRedColourCheck = null;
let finalColourCheck = [];
let matchInformation = {
 games: [],
};
let frameInformation;

if (window.localStorage.framesPlayed) {
 framesPlayed = window.localStorage.framesPlayed;
} else {
 framesPlayed = 0;
 window.localStorage.framesPlayed = 0;
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
if (window.localStorage.frameNumber) {
 frameNumber = window.localStorage.frameNumber;
} else {
 frameNumber = 1;
 window.localStorage.frameNumber = frameNumber;
}
if (window.localStorage[frameNumber]) {
 frameInformation = JSON.parse(window.localStorage[frameNumber]);
 playerOneTotal = frameInformation[1].score;
 playerTwoTotal = frameInformation[2].score;
 const redsPotted = frameInformation[1].red + frameInformation[2].red;
 totalRedsLeft -= redsPotted;
 timerMinutes = frameInformation.frameMins;
 timerSeconds = frameInformation.frameSecs;
 minsElapsed.innerHTML = timerMinutes + ":";
 secsElapsed.innerHTML = timerSeconds < 10 ? "0" + timerSeconds : timerSeconds;
 redBall.innerHTML = totalRedsLeft;
} else {
 frameInformation = {
  frameNumber: frameNumber,
  frameMins: 0,
  frameSecs: 0,
  1: { red: 0, yellow: 0, green: 0, brown: 0, blue: 0, pink: 0, black: 0, score: 0 },
  2: { red: 0, yellow: 0, green: 0, brown: 0, blue: 0, pink: 0, black: 0, score: 0 },
 };
}

const timer = setInterval(() => {
 if (started) {
  if (timerSeconds === 59) {
   timerMinutes++;
   minsElapsed.innerHTML = timerMinutes + ":";
   timerSeconds = 0;
   secsElapsed.innerHTML = "0" + timerSeconds;
   frameInformation.frameMins = timerMinutes;
   frameInformation.frameSecs = timerSeconds;
   window.localStorage[frameNumber] = JSON.stringify(frameInformation);
  } else {
   timerSeconds++;
   frameInformation.frameSecs = timerSeconds;
   secsElapsed.innerHTML = timerSeconds < 10 ? "0" + timerSeconds : timerSeconds;
   window.localStorage[frameNumber] = JSON.stringify(frameInformation);
  }
 }
}, 1000);

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
  foulShot(7);
  currentFoul = false;
  foulMSG.className = "hidden";
  disableColours(ballsArray);
  changePlayer();
  if (finalRedColourCheck === true) {
   handleFoulsAtEnd();
  }
  return;
 }
 addScoreToPlayer(7, "black");
 if (finalRedColourCheck === true) {
  if (!finalColourCheck.includes("black")) finalColourCheck.push("black");
  endGameChecker();
 }
 if (finalRedColourCheck === false) {
  finalRedColourCheck = true;
  disableColours(ballsArray);
  enableColours([yellowBall]);
 }
 if (totalRedsLeft !== 0) {
  disableColours(ballsArray);
 }
});
pinkBall.addEventListener("click", () => {
 if (currentFoul) {
  foulShot(6);
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
 addScoreToPlayer(6, "pink");
 if (totalRedsLeft !== 0) {
  disableColours(ballsArray);
 }
});
blueBall.addEventListener("click", () => {
 if (currentFoul) {
  foulShot(5);
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
 addScoreToPlayer(5, "blue");
 if (totalRedsLeft !== 0) {
  disableColours(ballsArray);
 }
});
brownBall.addEventListener("click", () => {
 if (currentFoul) {
  foulShot(4);
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
 addScoreToPlayer(4, "brown");
 if (totalRedsLeft !== 0) {
  disableColours(ballsArray);
 }
});
greenBall.addEventListener("click", () => {
 if (currentFoul) {
  foulShot(4);
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
 addScoreToPlayer(3, "green");
 if (totalRedsLeft !== 0) {
  disableColours(ballsArray);
 }
});
yellowBall.addEventListener("click", () => {
 if (currentFoul) {
  foulShot(4);
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
 addScoreToPlayer(2, "yellow");
 if (totalRedsLeft !== 0) {
  disableColours(ballsArray);
 }
});
redBall.addEventListener("click", () => {
 if (currentFoul) {
  foulShot(4);
  currentFoul = false;
  foulMSG.className = "hidden";
  disableColours(ballsArray);
  changePlayer();
  return;
 }
 if (totalRedsLeft > 0) {
  enableColours(ballsArray);
  addScoreToPlayer(1, "red");
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
 if (finalRedColourCheck === null) disableColours(ballsArray);
 changePlayer();
});
miss.addEventListener("click", () => {
 if (finalRedColourCheck === null) disableColours(ballsArray);
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
  frameInformation[1].score = playerOneTotal;
  frameInformation[2].score = playerTwoTotal;
  window.localStorage[frameNumber] = JSON.stringify(frameInformation);
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
  window.localStorage.frameNumber = frameNumber;
  frameInformation = {
   frameNumber: frameNumber,
   frameMins: 0,
   frameSecs: 0,
   1: { red: 0, yellow: 0, green: 0, brown: 0, blue: 0, pink: 0, black: 0, score: 0 },
   2: { red: 0, yellow: 0, green: 0, brown: 0, blue: 0, pink: 0, black: 0, score: 0 },
  };
  totalRedsLeft = 15;
  redBall.innerHTML = totalRedsLeft;
  framesPlayed++;
  window.localStorage.framesPlayed = framesPlayed;
  timerMinutes = 0;
  timerSeconds = 0;
  minsElapsed.innerHTML = timerMinutes + ":";
  secsElapsed.innerHTML = "0" + timerSeconds;
  playerOneTotal = 0;
  playerTwoTotal = 0;
  playerOneScore.innerHTML = playerOneTotal;
  playerTwoScore.innerHTML = playerTwoTotal;
  enableColours([redBall]);
  finalRedColourCheck = null;
  finalColourCheck = [];
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
function addScoreToPlayer(amount, colour) {
 if (currentPlayer === 1) {
  playerOneTotal += amount;
  playerOneScore.innerHTML = playerOneTotal;
  frameInformation[1].score = playerOneTotal;
  frameInformation[currentPlayer][colour]++;
 } else {
  playerTwoTotal += amount;
  playerTwoScore.innerHTML = playerTwoTotal;
  frameInformation[2].score = playerTwoTotal;
  frameInformation[currentPlayer][colour]++;
 }
 window.localStorage[frameNumber] = JSON.stringify(frameInformation);
}
function foulShot(amount) {
 if (currentPlayer === 1) {
  playerTwoTotal += amount;
  playerTwoScore.innerHTML = playerTwoTotal;
 } else {
  playerOneTotal += amount;
  playerOneScore.innerHTML = playerOneTotal;
 }
}
//add scores to the bottom???

// const test = document.createElement("p");
// test.innerHTML = window.localStorage.player2;
// document.getElementById("results").appendChild(test);

resultsLoader.addEventListener("click", () => {
 loadPreviousResults();
});
function loadPreviousResults() {
 const resultContainer = document.getElementById("result-container");
 if (resultContainer.className === "") {
  resultContainer.className = "hidden";
  const elements = document.getElementsByClassName("result-text");
  while (elements.length > 0) elements[0].remove();
  resultsLoader.innerHTML = "Load Results";
  return;
 }
 if (resultContainer.className === "hidden") {
  resultContainer.className = "";
  const list = document.createElement("ul");
  list.className = "result-list";

  for (let i = 1; i < frameNumber; i++) {
   let element = document.createElement("li");
   element.className = "result-text";
   let data = JSON.parse(window.localStorage[i]);
   element.innerHTML = `Frame ${i}: ${playerOne}: ${data[1].score}, ${playerTwo}: ${data[2].score}`;
   list.appendChild(element);
  }
  resultContainer.appendChild(list);
  resultsLoader.innerHTML = "Hide Results";
 }
}
goHomeButton.addEventListener("click", () => {
 location.href = "./index.html";
});
// fullScreenButton.addEventListener(
//  "click",
//  () => {
//   const elem = document.documentElement;
//   if (elem.requestFullscreen) {
//    elem.requestFullscreen();
//    fullScreenMesage.style.display = "none";
//   }
//  },
//  false
// );
