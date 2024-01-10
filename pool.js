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

let touchStartY = 0;
let touchEndY = 0;

let playerOneTotal = 0;
let playerTwoTotal = 0;

let playerOneColour = "red";
let playerTwoColour = "blue";

let locked = false;

function checkDirection(colour) {
 if (touchStartY > touchEndY) {
  if (colour === "red") {
   playerOneTotal++;
   playerOneScore.innerHTML = playerOneTotal;
  } else {
   playerTwoTotal++;
   playerTwoScore.innerHTML = playerTwoTotal;
  }
 }
 if (touchStartY < touchEndY) {
  if (colour === "red" && playerOneTotal > 0) {
   playerOneTotal--;
   playerOneScore.innerHTML = playerOneTotal;
  } else if (colour === "blue" && playerTwoTotal > 0) {
   playerTwoTotal--;
   playerTwoScore.innerHTML = playerTwoTotal;
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
  nameLockButton.innerHTML = "unlock names";
 } else {
  locked = false;
  playerOneInput.disabled = false;
  playerTwoInput.disabled = false;
  nameLockButton.innerHTML = "lock names";
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
  const currentColour = document.getElementById("two" + playerTwoColour);
  currentColour.style.border = "3px solid white";
  currentColour.style.width = "44px";
  currentColour.style.height = "44px";
 }
});
