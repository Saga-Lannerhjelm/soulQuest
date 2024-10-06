let resultsLevel1 = getArray(localStorage.resultsLevel1);
let resultsLevel2 = getArray(localStorage.resultsLevel2);
let resultsLevel3 = getArray(localStorage.resultsLevel3);
let resultsLevel4 = getArray(localStorage.resultsLevel4);
let resultsLevel5 = getArray(localStorage.resultsLevel5);

let activeLevel;

// Function for getting array in local storage
function getArray(storage) {
  if (storage === undefined) {
    return [];
  }
  return JSON.parse(storage);
}

function updateLocalStorage() {
  if (activeLevel === resultsLevel1) {
    let jsonString = JSON.stringify(resultsLevel1);
    localStorage.resultsLevel1 = jsonString;
  } else if (activeLevel === resultsLevel2) {
    let jsonString = JSON.stringify(resultsLevel2);
    localStorage.resultsLevel2 = jsonString;
  } else if (activeLevel === resultsLevel3) {
    let jsonString = JSON.stringify(resultsLevel3);
    localStorage.resultsLevel3 = jsonString;
  } else if (activeLevel === resultsLevel4) {
    let jsonString = JSON.stringify(resultsLevel4);
    localStorage.resultsLevel4 = jsonString;
  } else if (activeLevel === resultsLevel5) {
    let jsonString = JSON.stringify(resultsLevel5);
    localStorage.resultsLevel5 = jsonString;
  }
}

// result screen
function resultScreen(victory) {
  textFont("courier new");
  inputPosition = 502;
  inputBox.position(width / 2, inputPosition);
  
  timeResult = Math.floor(gameTime / 30);
  background(0, 0, 0);
  fill(255, 255, 255);
  drawStars(0.5);

  // Text for victory or game over
  push();
  textSize(35);
  textAlign(CENTER);
  if (victory) {
    text("Victory!", width / 2, 100);
  } else {
    text("Game Over!", width / 2, 100);
  }
  pop();
  
  // Score board frame
  push();
  rectMode(CENTER);
  fill(255, 255, 255, 25);
  rect(width / 2, 300, 650, 300, 15);
  fill(255, 255, 255);
  pop();
  
  push();
  textSize(20);
  textAlign(CENTER);
  text("Highscore", width / 2, 190);
  pop();
  
  // Your result
  let resultPosition = width / 2;
  if (state === "win") {
    push();
    rectMode(CENTER);
    textSize(18);
    textAlign(LEFT);
    text("Latest result:", resultPosition - 280, 430);
    textSize(14);

    // text("Name:", resultPosition - 115, 430);
    text("Time: " + timeResult + " sec", resultPosition + 60, 430);
    pop();
    push();
    rectMode(CORNER);
    saveButton.display();
    pop();
  }
  
  updateResultArray();
  
  playAgainButton.display();
  levelScreenButton.display();
 }
  
 function updateResultArray() {
  let margin = 32;
  
  textSize(14);
  
  // Draw the list of the score board
  for (let resultIndex in activeLevel) {
    push();
    rectMode(CENTER);
    fill(0, 0, 0, 80);
    rect(width / 2, 226 + resultIndex * margin, 630, 25);
    fill(255, 255, 255);
    textAlign(LEFT);
    text(
      activeLevel[resultIndex].name,
      width / 2 - 300,
      230 + resultIndex * margin
    );
    textAlign(RIGHT);
    text(
      "Time: " + activeLevel[resultIndex].time,
      width / 2 + 295,
      230 + resultIndex * margin
    );
    pop();
  } 
}

function addToScoreBoard() {
  const inputName = inputBox.value();

  // add new score to result array
  if (activeLevel.length === 0 || activeLevel === undefined) {
    activeLevel.push({ name: inputName, time: timeResult });
  } else if (inputName !== "" || inputName !== " ") {
    activeLevel.push({
      name: inputName,
      time: timeResult,
    });
  }

  // Sort array by time
  // following line of code was retrieved from https://www.javascripttutorial.net/array/javascript-sort-an-array-of-objects/ 2022-05-23
  activeLevel.sort(function (a, b) {
    return a.time - b.time;
  });

  if (activeLevel.length === 6) {
    activeLevel.splice(5, 1);
  }

  updateLocalStorage();
  updateResultArray();
}
