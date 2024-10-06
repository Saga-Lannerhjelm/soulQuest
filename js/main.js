let state = "start";

// Images
let walkAnimation = [];
let fallAnimation = [];
let jump;
let fallDown;
let rocket;
let rocketFire;
let planet;
let blockCornerLeft;
let blockCornerRight;
let rocketAstronaut;
let portalImage;
let portalImageDown;
let planetImages = [];
let descrBackground = [];

// Buttons
let beginButton;
let skipButton;
let replayButton;
let startButton;
let backButton;
let backButtonLevels;
let playAgainButton;
let levelScreenButton;
let saveButton;

// Input
let inputBox;
let inputPosition;

// Preload
function preload() {
  // Load images

  for (let i = 1; i < 10; i++) {
    let walk = loadImage("Astronaut/walk/astronaut_walk" + i + ".png");
    walkAnimation.push(walk);
  }

  for (let i = 1; i <= 5; i++) {
    let planetImage = loadImage("images/planet" + i + ".png");
    planetImages.push(planetImage);
  }

  dead = loadImage("Astronaut/astronaut_fall.png");
  jump = loadImage("Astronaut/astronaut_Jump.png");
  fallDown = loadImage("Astronaut/astronaut_falldown.png");
  rocket = loadImage("images/rocket.svg");
  rocketFire = loadImage("images/rocketfire1.png");
  fire = loadImage("images/fire.png");
  planet = loadImage("images/planet.png");
  yellowLiquid = loadImage("images/yellow_Liquid.svg");
  redLiquid = loadImage("images/red_Liquid.png");
  blockCornerLeft = loadImage("images/block_corner.png");
  blockCornerRight = loadImage("images/block_corner2.png");
  rocketAstronaut = loadImage("images/rocket_astronaut.png");
  portalImage = loadImage("images/portal.png");
  portalImageDown = loadImage("images/portalDown.png");
  greyMountain = loadImage("images/grayMountains.png");

  for (let i = 1; i <= 7; i++) {
    let descrIllustration = loadImage("images/descr_illustration" + i + ".png");
    descrBackground.push(descrIllustration);
  }
}

function setup() {
  let canvas = createCanvas(1300, 600);
  canvas.parent("canvasFrame");
  background(255, 255, 255);
  frameRate(30);

  // Buttons
  beginButton = new Button((width - 200) / 2, 500, 150, 50, "Start");
  skipButton = new Button(width / 2 - 40, 505, 70, 25, "Skip");
  replayButton = new Button(width / 2 - 75 - 120, 500, 150, 50, "Rewatch");
  startButton = new Button(width / 2 - 75 + 120, 500, 150, 50, "Play");
  backButton = new Button(width / 6 - 185, 545, 130, 30, "Back To Start");
  backButtonLevels = new Button(
    width / 6 - 185,
    545,
    140,
    30,
    "Back To Levels"
  );
  playAgainButton = new Button(width / 2 - 195, 500, 185, 50, "Play Again");
  levelScreenButton = new Button(width / 2 - 75 + 120, 500, 150, 50, "Levels");
  saveButton = new Button(
    (width - 200) / 2 + 280,
    415,
    120,
    20,
    "Save Highscore"
  );

  // Input
  // The following line of code and was made with help from https://editor.p5js.org/tom.smith/sketches/fASj3inoc 2022-05-22
  inputBox = createInput("Name:");
  inputBox.size(100);
  inputBox.addClass("inputBox");
}

//draw the screens
function draw() {
  inputBox.position(width / 2, -900);
  //draw different screens depending on the state
  if (state === "start") {
    startScreen();
  } else if (state === "description") {
    descriptionScreen();
  } else if (state === "level") {
    levelScreen();
  } else if (state === "game") {
    gameScreen();
  } else if (state === "win") {
    resultScreen(true);
  } else if (state === "loose") {
    resultScreen(false);
    inputBox.position(width / 2, -900);
  }
}

// click buttons
function mousePressed() {
  if (state === "start") {
    if (beginButton.pressButton(mouseX, mouseY)) {
      state = "description";
      textTime = 0;
      startTimeForPart = 0;
    }
  } else if (state === "description") {
    if (skipButton.pressButton(mouseX, mouseY)) {
      textTime = 1200;
    }
    if (textTime > 1200) {
      if (replayButton.pressButton(mouseX, mouseY)) {
        textTime = 0;
        startTimeForPart = 0;
      }
      if (startButton.pressButton(mouseX, mouseY)) {
        state = "level";
      }
    }
  } else if (state === "level") {
    if (backButton.pressButton(mouseX, mouseY)) {
      state = "start";
      resetGame();
    }
  } else if (state === "game") {
    if (backButtonLevels.pressButton(mouseX, mouseY)) {
      state = "level";
      resetGame();
    }
  } else if (state === "win" || state === "loose") {
    if (playAgainButton.pressButton(mouseX, mouseY)) {
      resetGame();
      state = "game";
    }
    if (state === "win") {
      if (saveButton.pressButton(mouseX, mouseY)) {
        addToScoreBoard();
      }
    }
    if (levelScreenButton.pressButton(mouseX, mouseY)) {
      resetGame();
      state = "level";
    }
  }
}
