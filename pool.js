const redSide = document.getElementById("red-side");
const playerOneName = document.getElementById("player-1");
const playerOneScore = document.getElementById("player-1-score");
const blueSide = document.getElementById("blue-side");
const playerTwoName = document.getElementById("player-2");
const playerTwoScore = document.getElementById("player-2-score");
const nameLockButton = document.getElementById("lock-names");
const playerOneInput = document.getElementById("player-1-input");
const playerTwoInput = document.getElementById("player-2-input");
const colourSettings = document.getElementById("colour-settings");
const coloursMenu = document.getElementById("colours-menu");
const colourSettingsForm = document.getElementById("colour-settings-form");
const settingsOne = document.getElementById("settings-1");
const settingsTwo = document.getElementById("settings-2");
const resetScoresButton = document.getElementById("reset-scores");
const warningMessage = document.getElementById("warning-msg");

let touchStartY = 0;
let touchEndY = 0;
let playerOneTotal;
let playerTwoTotal;
let playerOneColour = "red";
let playerTwoColour = "blue";
let locked;

if (window.innerWidth < 500) {
 warningMessage.className = "";
}

let poolAppData = {
 playerOneTotal: 0,
 playerTwoTotal: 0,
 playerOneColour: "red",
 playerTwoColour: "blue",
 playerOneName: "",
 playerTwoName: "",
 locked: false,
};

if (window.localStorage.poolAppData) {
 poolAppData = JSON.parse(window.localStorage.poolAppData);
 playerOneTotal = poolAppData.playerOneTotal;
 playerTwoTotal = poolAppData.playerTwoTotal;
 playerOneScore.innerHTML = playerOneTotal;
 playerTwoScore.innerHTML = playerTwoTotal;
 redSide.style.backgroundColor = poolAppData.playerOneColour;
 playerOneInput.style.backgroundColor = poolAppData.playerOneColour;
 blueSide.style.backgroundColor = poolAppData.playerTwoColour;
 playerTwoInput.style.backgroundColor = poolAppData.playerTwoColour;
 locked = poolAppData.locked;
 playerOneInput.disabled = locked;
 playerTwoInput.disabled = locked;
 nameLockButton.innerHTML = poolAppData.locked === true ? "Unlock names" : "Lock names";
 playerOneInput.value = poolAppData.playerOneName;
 playerTwoInput.value = poolAppData.playerTwoName;
} else {
 playerOneTotal = poolAppData.playerOneTotal;
 playerTwoTotal = poolAppData.playerTwoTotal;
 locked = false;
 nameLockButton.innerHTML = "Lock names";
}

function checkDirection(colour) {
 if (touchStartY > touchEndY) {
  if (colour === "red") {
   playerOneTotal++;
   playerOneScore.innerHTML = playerOneTotal;
   poolAppData.playerOneTotal++;
   window.localStorage.poolAppData = JSON.stringify(poolAppData);
  } else {
   playerTwoTotal++;
   playerTwoScore.innerHTML = playerTwoTotal;
   poolAppData.playerTwoTotal++;
   window.localStorage.poolAppData = JSON.stringify(poolAppData);
  }
 }
 if (touchStartY < touchEndY) {
  if (colour === "red" && playerOneTotal > 0) {
   playerOneTotal--;
   playerOneScore.innerHTML = playerOneTotal;
   poolAppData.playerOneTotal--;
   window.localStorage.poolAppData = JSON.stringify(poolAppData);
  } else if (colour === "blue" && playerTwoTotal > 0) {
   playerTwoTotal--;
   playerTwoScore.innerHTML = playerTwoTotal;
   poolAppData.playerTwoTotal--;
   window.localStorage.poolAppData = JSON.stringify(poolAppData);
  }
 }
}

redSide.addEventListener("touchstart", (e) => {
 touchStartY = e.changedTouches[0].screenY;
});
redSide.addEventListener("touchend", (e) => {
 touchEndY = e.changedTouches[0].screenY;
 checkDirection("red");
});
blueSide.addEventListener("touchstart", (e) => {
 touchStartY = e.changedTouches[0].screenY;
});
blueSide.addEventListener("touchend", (e) => {
 touchEndY = e.changedTouches[0].screenY;
 checkDirection("blue");
});

nameLockButton.addEventListener("click", () => {
 if (locked === false) {
  locked = true;
  playerOneInput.disabled = true;
  playerTwoInput.disabled = true;
  nameLockButton.innerHTML = "Unlock names";
  poolAppData.locked = true;
  window.localStorage.poolAppData = JSON.stringify(poolAppData);
 } else {
  locked = false;
  playerOneInput.disabled = false;
  playerTwoInput.disabled = false;
  nameLockButton.innerHTML = "Lock names";
  poolAppData.locked = false;
  window.localStorage.poolAppData = JSON.stringify(poolAppData);
 }
});

colourSettings.addEventListener("click", () => {
 coloursMenu.className = "";
});
const colourArray = ["red", "blue", "purple", "orange", "green", "hotpink"];

colourSettingsForm.addEventListener("submit", (e) => {
 e.preventDefault();
 coloursMenu.className = "hidden";
 redSide.style.backgroundColor = playerOneColour;
 playerOneInput.style.backgroundColor = playerOneColour;

 blueSide.style.backgroundColor = playerTwoColour;
 playerTwoInput.style.backgroundColor = playerTwoColour;
});
settingsOne.addEventListener("click", (e) => {
 if (colourArray.includes(e.target.id.slice(3))) {
  const previousColour = document.getElementById("one" + playerOneColour);
  previousColour.style.border = "none";
  previousColour.style.width = "50px";
  previousColour.style.height = "50px";
  playerOneColour = e.target.id.slice(3);
  poolAppData.playerOneColour = playerOneColour;
  window.localStorage.poolAppData = JSON.stringify(poolAppData);
  const currentColour = document.getElementById("one" + playerOneColour);
  currentColour.style.border = "3px solid white";
  currentColour.style.width = "44px";
  currentColour.style.height = "44px";
 }
});
settingsTwo.addEventListener("click", (e) => {
 if (colourArray.includes(e.target.id.slice(3))) {
  const previousColour = document.getElementById("two" + playerTwoColour);
  previousColour.style.border = "none";
  previousColour.style.width = "50px";
  previousColour.style.height = "50px";
  playerTwoColour = e.target.id.slice(3);
  poolAppData.playerTwoColour = playerTwoColour;
  window.localStorage.poolAppData = JSON.stringify(poolAppData);
  const currentColour = document.getElementById("two" + playerTwoColour);
  currentColour.style.border = "3px solid white";
  currentColour.style.width = "44px";
  currentColour.style.height = "44px";
 }
});
playerOneInput.addEventListener("change", (e) => {
 poolAppData.playerOneName = e.target.value;
 window.localStorage.poolAppData = JSON.stringify(poolAppData);
});
playerTwoInput.addEventListener("change", (e) => {
 poolAppData.playerTwoName = e.target.value;
 window.localStorage.poolAppData = JSON.stringify(poolAppData);
});
resetScoresButton.addEventListener("click", () => {
 confirm("Confirm to rest scores. Progress will be lost!");
 poolAppData.playerOneTotal = 0;
 poolAppData.playerTwoTotal = 0;
 playerOneTotal = poolAppData.playerOneTotal;
 playerTwoTotal = poolAppData.playerTwoTotal;
 playerOneScore.innerHTML = playerOneTotal;
 playerTwoScore.innerHTML = playerTwoTotal;
 window.localStorage.poolAppData = JSON.stringify(poolAppData);
});
