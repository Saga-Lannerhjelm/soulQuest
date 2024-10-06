// game screen

// variables
let groundlevel = 600 / 2;
let isJumping = false;
let topOfJumpReached = false;
const blockSize = 30;
let gameTime = 0;
let gameIsActive = true;
let endOfGameTimer = 0;
let players = [];
let soulReunite = false;
let soulTime = 600;
let rocketLaunch = false;
let launchTime = 0;
let portalReached = false;

// The player
showPlayers();

function showPlayers() {
  players = [
    {
      id: 1,
      x: 100,
      y: 0,
      yDirection: -1,
      xDirection: 1,
      flipped: 1,
      isjumping: false,
      topOfJumpReached: false,
      groundPositon: groundlevel - 50,
      startOfJumpPosition: 0,
      isMoving: false,
    },
    {
      id: 2,
      x: 100,
      y: 0,
      yDirection: 1,
      xDirection: 1,
      flipped: -1,
      isjumping: false,
      topOfJumpReached: false,
      groundPositon: groundlevel + 51,
      startOfJumpPosition: 0,
      isMoving: false,
    },
  ];
}

function gameScreen() {
  background(35, 35, 35);
  gameTime += 1;

  // draw gradient background
  let count = 0;
  while (count <= height / 2) {
    if (soulReunite) {
      // change the gradient when portal is reached
      stroke(100 - count / 5.5, 100 - count / 2.5, 100 - count / 2.5);
    } else {
      if (gridArray === level1) {
        // Orange gradient
        stroke(255, 185 - count / 2.5, 30);

        //Blue gradient
      } else if (gridArray === level2) {
        stroke(0, 200 - count / 3, 200);

        //Green gradient
      } else if (gridArray === level3) {
        stroke(0, 255 - count / 2.5, 80);

        //Purple gradient
      } else if (gridArray === level4) {
        stroke(180, 0, 255 - count / 1.9);
      } //Red gradient
      else if (gridArray === level5) {
        stroke(255, 0, 100 - count / 3);
      }
    }
    line(0, count, width, count);
    count = count + 1;
  }
  image(greyMountain, 0, 0, 1300, 600);

  // grey background on bottom half
  push();
  fill(50, 50, 50);
  noStroke();
  rect(0, groundlevel, width, height / 2);
  pop();

  // Grey mountains in background
  push();
  fill(40, 40, 40);
  mountainsDown();
  pop();

  backButtonLevels.display();

  if (soulReunite) {
    push();
    textFont("courier new");

    textStyle(BOLD);
    textAlign(CENTER);
    let soultTimeSec = Math.floor(soulTime / 30);

    /* The following 7 lines of code are done with 
  help from https://css-tricks.com/snippets/javascript/check-if-number-is-evenodd/ 
  on how to calculate if a number is even or not. retrieved: 2022-05.24 */
    if (soultTimeSec % 2 === 0) {
      textSize(30);
      fill(195, 0, 0);
    } else {
      textSize(22);
      fill(145, 0, 0);
    }
    text(soultTimeSec, width / 2 - 20, 50);

    pop();
  }

  // Define positionX and positionY
  let positionX = Math.floor(players[0].x / blockSize);
  let positionY = 0;

  noStroke();

  // Show the astronaut(s)
  for (let player of players) {
    positionXRight = Math.floor(player.x / blockSize);
    positionXLeft = Math.floor((player.x - 5) / blockSize);
    positionY = Math.floor(
      player.id === 1
        ? 7 - (player.y - 11) / blockSize
        : 8 + (player.y + 10) / blockSize
    );
    push();

    translate(
      player.x + (player.xDirection > 0 ? 0 : 50),
      player.groundPositon + player.y * player.yDirection
    );
    rotate(0);

    // Turn the player vertically and horisontally
    scale(player.xDirection > 0 ? 1 : -1, player.flipped);

    if (player.isjumping) {
      if (player.topOfJumpReached) {
        image(fallDown, 0, 0, 50, 50);
      } else {
        image(jump, 0, 0, 50, 50);
      }
    } else if (
      // dangerous blocks
      gridArray[positionXRight][positionY - 1] === 10 ||
      gridArray[positionXRight][positionY + 1] === 9 ||
      gridArray[positionXRight][positionY + 1] === 7 ||
      gridArray[positionXRight][positionY - 1] === 8 ||
      gridArray[positionXLeft][positionY - 1] === 10 ||
      gridArray[positionXLeft][positionY + 1] === 9 ||
      gridArray[positionXLeft][positionY + 1] === 7 ||
      gridArray[positionXLeft][positionY - 1] === 8
    ) {
      image(dead, 0, 0, 50, 50);
      gameIsActive = false;
      gameTime = gameTime;

      // change ground level of players when dead
      players[0].groundPositon = groundlevel - 25;
      players[1].groundPositon = groundlevel + 35;

      // start end timer
      endOfGameTimer = endOfGameTimer + 1;

      if (endOfGameTimer >= 45) {
        state = "loose";
      }
    } // Astronaut when reaches portal
    else if (
      gridArray[positionX][positionY + 1] === 4 &&
      Math.floor(players[0].x / blockSize) ===
        Math.floor(players[1].x / blockSize)
    ) {
      portalReached = true;
      soulReunite = true;

      // Astronaut when reaching the rocket after getting soul back
    } else if (
      (gridArray[positionX][positionY + 1] === 6 && soulReunite) ||
      (gridArray[positionX - 1][positionY] === 6 && soulReunite)
    ) {
      gameIsActive = false;
      rocketLaunch = true;
      launchTime = launchTime + 1;
      if (launchTime >= 90) {
        state = "win";
        if (gridArray === level1) {
          planets[1].unLocked = true;
        } else if (gridArray === level2) {
          planets[2].unLocked = true;
        } else if (gridArray === level3) {
          planets[3].unLocked = true;
        } else if (gridArray === level4) {
          planets[4].unLocked = true;
        }
      }
    } else {
      //Animate the astronaut pictures
      // The following line of code with the remainder operator (%) was made with help of information from https://www.javascripttutorial.net/javascript-remainder-operator/
      image(
        walkAnimation[player.isMoving ? (player.x / 5) % 9 : 0],
        0,
        0,
        50,
        50
      );
      player.isMoving = false;
    }

    // Move and remove player 2 when portal is reached
    if (portalReached) {
      players[1].y = players[1].y - 10;
      if (players[1].y <= -50) {
        players.splice(1, 1, {
          id: 2,
          x: 1350,
          y: 0,
          yDirection: -1,
          flipped: 1,
          groundPositon: groundlevel - 20,
          startOfJumpPosition: 0,
          color: 55,
        });
      }
    }

    // Start counter when soul is reunited
    if (soulReunite && gameIsActive) {
      soulTime = soulTime - 0.5;
      if (soulTime <= 0) {
        state = "loose";
      }
    }
    pop();
  }

  //Instruction text
  if (gameTime < 90) {
    textFont("courier new");
    textSize(20);
    textAlign(CENTER);
    text("Reach the portal on both sides!", 50, 100, 250);
  } else if (soulReunite === true && soulTime > 500) {
    textFont("courier new");
    textSize(20);
    fill(255, 255, 255);
    textAlign(CENTER);
    text("Hurry back to the spaceship!", 1000, 70, 250);
  }

  blocks();

  // Divider (line) between the worlds
  push();
  stroke(0, 0, 0);
  strokeWeight(1);
  line(0, groundlevel, width, groundlevel);
  pop();

  noStroke();
  // Move character
  if (gameIsActive === true) {
    if (keyIsDown(39)) {
      movePlayerX(5);
    } else if (keyIsDown(37)) {
      movePlayerX(-5);
    }

    movePlayerY();
  }
}

function movePlayerX(x) {
  for (let player of players) {
    /*     
Check which x position within the gridArray the player will have if it moves one more step
and compensate for the player's width depending on which direction it is walking
*/
    positionX = Math.floor((player.x + x + (x > 0 ? 7 : -15)) / blockSize);
    positionY = Math.floor(
      player.id === 1
        ? 7 - (player.y - 10) / blockSize
        : 8 + player.y / blockSize
    );

    // Move player if there is no object in the way
    if (gridArray[positionX][positionY] === 0) {
      player.x = player.x + x;
    }
    // If the player is moving
    player.xDirection = x;
    player.isMoving = true;

    // Prevent player form walking out of the screen to the left
    if (player.x < 40) {
      player.x = 40;
    }
  }
}

function movePlayerY() {
  for (let player of players) {
    //jumping

    positionXRight = Math.floor((player.x + 5) / blockSize);
    positionXLeft = Math.floor((player.x - 8) / blockSize);
    // Check the height
    positionY = Math.floor(
      player.id === 1
        ? 7 - (player.y + 25) / blockSize
        : 8 + (player.y + 20) / blockSize
    );

    if (
      player.isjumping &&
      player.topOfJumpReached === false &&
      player.y - player.startOfJumpPosition < 80
    ) {
      // Check if there is a block above the player or not
      if (
        gridArray[positionXRight][positionY] +
          gridArray[positionXLeft][positionY] ===
        0
      ) {
        player.y = player.y + 20;
      } else {
        // if there is a block above user, end the jump
        player.topOfJumpReached = true;
      }
    } else if (player.isjumping) {
      player.topOfJumpReached = true;
    }

    //falling
    if (player.y > 0) {
      positionY = Math.floor(
        player.id === 1
          ? 7 - (player.y - 30) / blockSize
          : 8 + (player.y - 10) / blockSize
      );
      // Y position of obstacles
      let positionYHigh = Math.floor(
        player.id === 1
          ? 7 - (player.y - 20) / blockSize
          : 8 + player.y / blockSize
      );

      // Check if there is a block under the player or not
      if (
        gridArray[positionXRight][positionY] +
          gridArray[positionXLeft][positionY] ===
        0
      ) {
        player.y = player.y - 10;
      } else if (
        // Check the collision at a higher point on the player when the player lands on an obstacle
        (gridArray[positionXRight][positionY] > 6 ||
          gridArray[positionXLeft][positionY] > 6) &&
        gridArray[positionXRight][positionYHigh] === 0 &&
        gridArray[positionXLeft][positionYHigh] === 0
      ) {
        player.y = player.y - 10;
      } else {
        player.topOfJumpReached = false;
        player.isjumping = false;
      }
    } else if (player.topOfJumpReached) {
      player.topOfJumpReached = false;
      player.isjumping = false;
    }
  }
}

function keyPressed() {
  for (let player of players) {
    if (keyCode === 38 && player.isjumping === false && gameIsActive) {
      player.isjumping = true;
      player.topOfJumpReached = false;
      player.startOfJumpPosition = player.y;
      // testSound.play();
    }
  }
}

function mountainsDown() {
  noStroke();
  beginShape();
  vertex(0, groundlevel);
  bezierVertex(40, groundlevel, 40, groundlevel + 40, 90, groundlevel + 40);
  bezierVertex(
    100,
    groundlevel + 40,
    130,
    groundlevel + 20,
    130,
    groundlevel + 20
  );
  bezierVertex(
    130,
    groundlevel + 20,
    180,
    groundlevel + 100,
    220,
    groundlevel + 100
  );
  bezierVertex(
    280,
    groundlevel + 100,
    380,
    groundlevel + 80,
    350,
    groundlevel + 80
  );
  vertex(480, groundlevel + 90);
  bezierVertex(
    500,
    groundlevel + 90,
    500,
    groundlevel + 130,
    560,
    groundlevel + 130
  );
  bezierVertex(
    600,
    groundlevel + 130,
    740,
    groundlevel + 50,
    780,
    groundlevel + 50
  );
  bezierVertex(
    790,
    groundlevel + 40,
    900,
    groundlevel + 170,
    950,
    groundlevel + 170
  );
  bezierVertex(
    1000,
    groundlevel + 170,
    1050,
    groundlevel + 120,
    1050,
    groundlevel + 120
  );
  vertex(1150, groundlevel + 130);
  bezierVertex(
    1200,
    groundlevel + 130,
    1250,
    groundlevel + 40,
    1250,
    groundlevel + 50
  );
  vertex(1300, groundlevel + 80);
  vertex(1300, groundlevel);
  endShape();
}

// Reset the game
function resetGame() {
  gameIsActive = true;
  soulReunite = false;
  rocketLaunch = false;
  portalReached = false;
  launchTime = 0;
  gameTime = 0;
  soulTime = 600;
  endOfGameTimer = 0;
  rocketPosition = 30;
  showPlayers();
}
