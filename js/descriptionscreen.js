// descriptionscreen

let textTime = 0;
let startTimeForPart = 0;
let textMeter;

function descriptionScreen() {
  background(0, 0, 0);
  fill(255, 255, 255);
  textSize(25);
  textAlign(CENTER);

  // The lines that show the progress of the "text time"
  textMeter = [
    {
      color: (50, 50, 50),
      x: 500,
      y: 550,
      height: 8,
      length: 300,
      roundness: 10,
    },
    {
      color: (90, 90, 90),
      x: 500,
      y: 550,
      height: 8,
      length: (textTime - startTimeForPart) * 1.52,
      roundness: 10,
    },
  ];

  textTime = textTime + 1;
  let middleOfScreen = width / 2 - 250;
  let yPOsitionOfText = 250;

  push();
  if (textTime < 200) {
    image(descrBackground[0], 0, 0, 1300, 600);
    text(
      "An exploring astronaut with a mission to find undiscovered planets is entering the galaxy Lustroayna.",
      middleOfScreen,
      yPOsitionOfText,
      500
    );

    showTextTimeProgress();
  }

  // Show different text and background depending on textTime

  if (textTime > 200 && textTime < 400) {
    startTimeForPart = 200;
    // change the background
    if (textTime < 260) {
      image(descrBackground[1], -10, 0, 1300, 600);
    } else if (textTime < 290) {
      image(descrBackground[2], -10, 0, 1300, 600);
    } else {
      image(descrBackground[3], -10, 0, 1300, 600);
    }

    text(
      "The atmosphere of the planets turns out to be very different from what he is used to.",
      middleOfScreen,
      yPOsitionOfText,
      500
    );

    showTextTimeProgress();
  }
  if (textTime > 400 && textTime < 600) {
    startTimeForPart = 400;
    if (textTime < 500) {
      image(descrBackground[4], -10, 0, 1300, 600);
    } else {
      image(descrBackground[5], -10, 0, 1300, 600);
    }

    text(
      "His body could not handle the differences, and thereby his soul got ripped out from his body.",
      middleOfScreen,
      yPOsitionOfText,
      500
    );
    showTextTimeProgress();
  }

  if (textTime > 600 && textTime < 800) {
    startTimeForPart = 600;
    image(descrBackground[6], -10, 0, 1300, 600);
    text(
      "He ended up on a different dark dimension that is mirrored to the original planets.",
      middleOfScreen,
      yPOsitionOfText,
      500
    );
    showTextTimeProgress();
  }

  if (textTime > 800 && textTime < 1000) {
    startTimeForPart = 800;
    image(descrBackground[6], -10, 0, 1300, 600);
    text(
      "Now, the astronaut need to find the portal between the dimensions in order to reunite with his soul.",
      middleOfScreen,
      yPOsitionOfText,
      500
    );
    showTextTimeProgress();
  }

  pop();

  if (textTime > 1000 && textTime < 1200) {
    startTimeForPart = 1000;
    text(
      "Then he quickly have to get back to his ship and leave the atmosphere before the soul is lost again.",
      middleOfScreen,
      yPOsitionOfText,
      500
    );
    showTextTimeProgress();
  }

  if (textTime < 1100) {
    skipButton.display();
  }

  if (textTime > 1200) {
    push();
    textAlign(CENTER);
    textSize(60);
    text("SoulQuest", width / 2, 300);
    textSize(18);
    text('"Let The Adventure Begin"', width / 2, 340);
    replayButton.display();
    startButton.display();
    drawStars(0.5);
    pop();
  }
}

function showTextTimeProgress() {
  fill(textMeter[0].color);
  rect(
    textMeter[0].x,
    textMeter[0].y,
    textMeter[0].length,
    textMeter[0].height,
    textMeter[0].roundness
  );

  noStroke();
  fill(textMeter[1].color);
  rect(
    textMeter[1].x,
    textMeter[1].y,
    textMeter[1].length,
    textMeter[1].height,
    textMeter[1].roundness
  );
}
