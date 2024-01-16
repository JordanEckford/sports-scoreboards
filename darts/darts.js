const numbersPad = document.getElementById("scores");
const scoreContainer = document.getElementById("score-container");
const playerOneScoreContainer = document.getElementById("player-1-score-container");
const playerTwoScoreContainer = document.getElementById("player-2-score-container");
const finishersContainer = document.getElementById("finishers-container");
const playerOneGamesTotal = document.getElementById("player-1-games");
const playerTwoGamesTotal = document.getElementById("player-2-games");
const dartOne1 = document.getElementById("dart1-1");
const dartOne2 = document.getElementById("dart2-1");
const dartOne3 = document.getElementById("dart3-1");
const dartTwo1 = document.getElementById("dart1-2");
const dartTwo2 = document.getElementById("dart2-2");
const dartTwo3 = document.getElementById("dart3-2");
const playerOneHistoryContainer = document.getElementById("player-one-history");
const playerTwoHistoryContainer = document.getElementById("player-two-history");
const homeButton = document.getElementById("home-button");
const menuConfirmationContainer = document.getElementById("confirmation-menu-container");
const confirmMenu = document.getElementById("confirm-menu");
const cancelMenu = document.getElementById("cancel-menu");
const helpMenuContainer = document.getElementById("help-menu-container");
const closeHelp = document.getElementById("close-help");
const helpButton = document.getElementById("help-button");
const fullScreenButton = document.getElementById("go-fs");
const fullScreenMesage = document.getElementById("fullscreen-msg");

const numbers = {
 n1: 1,
 n2: 2,
 n3: 3,
 n4: 4,
 n5: 5,
 n6: 6,
 n7: 7,
 n8: 8,
 n9: 9,
 n0: 0,
};

let currentPlayer = 1;
let playerStarted = 1;
let playerOneScore = 501;
let playerTwoScore = 501;
let playerOneMatchCount = 0;
let playerTwoMatchCount = 0;
let dartsRemaining = 3;
let currentScore = 0;
let turnScore = 0;
let possibleFinishers = null;

numbersPad.addEventListener("click", (e) => {
 if (numbers[e.target.id] !== undefined) {
  document.getElementById(e.target.id).style.backgroundColor = "rgb(121, 79, 224)";
  setTimeout(() => {
   document.getElementById(e.target.id).style.backgroundColor = "rgb(46, 28, 90)";
  }, 100);
  scoreContainer.innerHTML === "0" ? (scoreContainer.innerHTML = numbers[e.target.id]) : (scoreContainer.innerHTML += numbers[e.target.id]);
 } else if (e.target.id === "backspace" || e.target.id === "backspace-img") {
  document.getElementById(e.target.id).style.backgroundColor = "rgb(121, 79, 224)";
  setTimeout(() => {
   if (e.target.id === "backspace") document.getElementById(e.target.id).style.backgroundColor = "rgb(46, 28, 90)";
   if (e.target.id === "backspace-img") document.getElementById(e.target.id).style.backgroundColor = "rgb(46, 28, 90, 0)";
  }, 100);
  scoreContainer.innerHTML = scoreContainer.innerHTML.slice(0, scoreContainer.innerHTML.length - 1);
  if (scoreContainer.innerHTML === "") scoreContainer.innerHTML = 0;
 } else if ((e.target.id === "confirm") | (e.target.id === "confirm-img")) {
  document.getElementById(e.target.id).style.backgroundColor = "rgb(121, 79, 224)";
  setTimeout(() => {
   if (e.target.id === "confirm") document.getElementById(e.target.id).style.backgroundColor = "rgb(46, 28, 90)";
   if (e.target.id === "confirm-img") document.getElementById(e.target.id).style.backgroundColor = "rgb(46, 28, 90,0)";
  }, 100);
  currentScore = +scoreContainer.innerHTML;
  removeScores(currentPlayer, currentScore);
 }
});

function removeDarts(currentPlayer) {
 if (currentPlayer === 1) {
  if (dartsRemaining === 2) {
   dartOne3.src = "./darts/blank.png";
  } else if (dartsRemaining === 1) {
   dartOne2.src = "./darts/blank.png";
  } else if (dartsRemaining === 0) {
   dartOne1.src = "./darts/blank.png";
  }
 }
 if (currentPlayer === 2) {
  if (dartsRemaining === 2) {
   dartTwo3.src = "./darts/blank.png";
  } else if (dartsRemaining === 1) {
   dartTwo2.src = "./darts/blank.png";
  } else if (dartsRemaining === 0) {
   dartTwo1.src = "./darts/blank.png";
  }
 }
}
function resetDarts() {
 if (currentPlayer === 1) {
  dartOne1.src = "./darts/dart1.png";
  dartOne2.src = "./darts/dart1.png";
  dartOne3.src = "./darts/dart1.png";
  dartTwo1.src = "./darts/blank.png";
  dartTwo2.src = "./darts/blank.png";
  dartTwo3.src = "./darts/blank.png";
 }
 if (currentPlayer === 2) {
  dartTwo1.src = "./darts/dart2.png";
  dartTwo2.src = "./darts/dart2.png";
  dartTwo3.src = "./darts/dart2.png";
  dartOne1.src = "./darts/blank.png";
  dartOne2.src = "./darts/blank.png";
  dartOne3.src = "./darts/blank.png";
 }
}
function bustPlayer() {
 if (currentPlayer === 1) {
  dartOne1.src = "./darts/blank.png";
  dartOne2.src = "./darts/blank.png";
  dartOne3.src = "./darts/blank.png";
 }
 if (currentPlayer === 2) {
  dartTwo1.src = "./darts/blank.png";
  dartTwo2.src = "./darts/blank.png";
  dartTwo3.src = "./darts/blank.png";
 }
 currentPlayer = currentPlayer === 1 ? 2 : 1;
 resetDarts();
}

function removeScores(player, score) {
 let bust = false;
 if (player === 1) {
  playerOneScore -= score;
  if (playerOneScore < 0) {
   playerOneScore += score;
   bust = true;
  } else {
   playerOneScoreContainer.innerHTML = playerOneScore;
   addHistory();
   endGameCheck();
  }
 } else if (player === 2) {
  playerTwoScore -= score;
  if (playerTwoScore < 0) {
   playerTwoScore += score;
   bust = true;
  } else {
   playerTwoScoreContainer.innerHTML = playerTwoScore;
   addHistory();
   endGameCheck();
  }
 }
 if (bust === false) {
  currentScore = 0;
  scoreContainer.innerHTML = 0;
  dartsRemaining--;
  removeDarts(currentPlayer);
  if (dartsRemaining === 0) {
   currentPlayer = currentPlayer === 1 ? 2 : 1;
   resetDarts();
   dartsRemaining = 3;
  }
  if (currentPlayer === 1) {
   addFinishers(playerOneScore);
  } else {
   addFinishers(playerTwoScore);
  }
 } else if (bust === true) {
  scoreContainer.innerHTML = "Bust";
  scoreContainer.style.color = "red";
  setTimeout(() => {
   currentScore = 0;
   scoreContainer.innerHTML = currentScore;
   scoreContainer.style.color = "black";
   bust = false;
   bustPlayer();
   dartsRemaining = 3;
  }, 1000);
 }
}

function addFinishers(currentPlayerScore) {
 if (finishersContainer.children.length !== 0) {
  const elements = document.getElementsByClassName("finisher");
  while (elements.length > 0) elements[0].remove();
  const oldList = document.getElementById("result-list");
  oldList.remove();
 }
 possibleFinishers = dartsFinishers(currentPlayerScore, dartsRemaining);
 if (possibleFinishers === null) {
  return;
 }
 const list = document.createElement("ul");
 list.className = "result-list";
 list.id = "result-list";
 possibleFinishers.forEach((finisher) => {
  let element = document.createElement("li");
  element.className = "finisher";
  element.innerHTML = finisher;
  list.appendChild(element);
 });
 finishersContainer.appendChild(list);
}
function addHistory() {
 if (currentPlayer === 1 && dartsRemaining === 1) {
  let element = document.createElement("li");
  element.className = "history";
  element.innerHTML = playerOneScore;
  playerOneHistoryContainer.appendChild(element);
 }
 if (currentPlayer === 2 && dartsRemaining === 1) {
  let element = document.createElement("li");
  element.className = "history";
  element.innerHTML = playerTwoScore;
  playerTwoHistoryContainer.appendChild(element);
 }
}
function removeHistory() {
 const elements = document.getElementsByClassName("history");
 while (elements.length > 0) elements[0].remove();
}

function endGameCheck() {
 if (playerOneScore === 0) {
  playerOneMatchCount++;
  playerOneGamesTotal.innerHTML = playerOneMatchCount;
  setTimeout(() => {
   resetGame();
  }, 2000);
 }
 if (playerTwoScore === 0) {
  playerTwoMatchCount++;
  playerTwoGamesTotal.innerHTML = playerTwoMatchCount;
  setTimeout(() => {
   resetGame();
   addFinishers();
  }, 2000);
 }
}
function resetGame() {
 if (playerStarted === 1) {
  currentPlayer = 2;
  playerStarted = 2;
  resetDarts();
 } else if (playerStarted === 2) {
  currentPlayer = 1;
  playerStarted = 1;
  resetDarts();
 }
 playerOneScore = 501;
 playerTwoScore = 501;
 playerOneScoreContainer.innerHTML = playerOneScore;
 playerTwoScoreContainer.innerHTML = playerTwoScore;
 dartsRemaining = 3;
 currentScore = 0;
 possibleFinishers = null;
 removeHistory();
}

function dartsFinishers(score, darts) {
 const results = [];

 const finishers = {
  Bull: 50,
  D20: 40,
  D19: 38,
  D18: 36,
  D17: 34,
  D16: 32,
  D15: 30,
  D14: 28,
  D13: 26,
  D12: 24,
  D11: 22,
  D10: 20,
  D9: 18,
  D8: 16,
  D7: 14,
  D6: 12,
  D5: 10,
  D4: 8,
  D3: 6,
  D2: 4,
  D1: 2,
 };
 const normalShots = {
  Bull: 50,
  OuterBull: 25,
  T20: 60,
  D20: 40,
  20: 20,
  T19: 57,
  D19: 38,
  19: 19,
  T18: 54,
  D18: 36,
  18: 18,
  T17: 51,
  D17: 34,
  17: 17,
  T16: 48,
  D16: 32,
  16: 16,
  T15: 45,
  D15: 30,
  15: 15,
  T14: 42,
  D14: 28,
  14: 14,
  T13: 39,
  D13: 26,
  13: 13,
  T12: 36,
  D12: 24,
  12: 12,
  T11: 33,
  D11: 22,
  11: 11,
  T10: 30,
  D10: 20,
  10: 10,
  T9: 27,
  D9: 18,
  9: 9,
  T8: 24,
  D8: 16,
  8: 8,
  T7: 21,
  D7: 14,
  7: 7,
  T6: 18,
  D6: 12,
  6: 6,
  T5: 15,
  D5: 10,
  5: 5,
  T4: 12,
  D4: 8,
  4: 4,
  T3: 9,
  D3: 6,
  3: 3,
  T2: 6,
  D2: 4,
  2: 2,
  T1: 3,
  D1: 2,
  1: 1,
  null: 0,
 };

 if (score > 160) return null;

 if (score <= 50) {
  for (let key in finishers) {
   if (finishers[key] === score) {
    results.push([key]);
   }
  }
  if (results.length > 0) return results;
 }

 if (score <= 110 && darts >= 2) {
  for (let key1 in normalShots) {
   for (let key3 in finishers) {
    if (normalShots[key1] + finishers[key3] === score) {
     results.push([key1, key3]);
    }
   }
  }
  if (results.length > 0) return results;
 }
 if (score <= 160 && darts === 3) {
  for (let key1 in normalShots) {
   for (let key2 in normalShots) {
    for (let key3 in finishers) {
     if (normalShots[key1] + normalShots[key2] + finishers[key3] === score) {
      let checker = 0;
      results.forEach((result) => {
       if (result[0] + result[1] + result[2] === key2 + key1 + key3) {
        checker += 1;
       }
      });
      if (checker === 0) results.push([key1, key2, key3]);
     }
    }
   }
  }
  if (results.length > 0) return results;
 }

 return null;
}

homeButton.addEventListener("click", () => {
 menuConfirmationContainer.style.display = "grid";
});

cancelMenu.addEventListener("click", () => {
 menuConfirmationContainer.style.display = "none";
});
confirmMenu.addEventListener("click", () => {
 window.localStorage.removeItem("poolAppData");
 location.href = "./index.html";
 menuConfirmationContainer.style.display = "none";
});
helpButton.addEventListener("click", () => {
 helpMenuContainer.style.display = "grid";
});
closeHelp.addEventListener("click", () => {
 helpMenuContainer.style.display = "none";
});
fullScreenButton.addEventListener(
 "click",
 () => {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
   elem.requestFullscreen();
  }
  fullScreenMesage.className = "fade-out";
  setTimeout(() => {
   fullScreenMesage.style.display = "none";
  }, 1000);
 },
 false
);
