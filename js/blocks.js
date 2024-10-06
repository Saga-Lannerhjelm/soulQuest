let rocketPosition = 30;

// The blocks used in the map
function blocks() {
  push();
  fill(0, 0, 0);

  // The ground
  for (let x = 0; x < gridArray.length; x++) {
    for (let y = 0; y < 15; y++) {
      if (gridArray[x][y] === 1) {
        // draw block for ground
        rect(x * blockSize + 25, 60 + y * blockSize, blockSize, blockSize);
      } else if (gridArray[x][y] === 2) {
        // draw block for the rounded block left corner
        rect(
          x * blockSize + 25,
          60 + y * blockSize,
          blockSize,
          blockSize,
          15,
          0,
          0,
          0
        );
      } else if (gridArray[x][y] === 3) {
        // draw block for the rounded block right corner
        rect(
          x * blockSize + 25,
          60 + y * blockSize,
          blockSize,
          blockSize,
          0,
          15,
          0,
          0
        );
      } else if (gridArray[x][y] === 4) {
        // draw block for portal up
        push();
        fill(0, 255, 0);
        image(
          portalImage,
          x * blockSize + 15,
          59 + y * blockSize,
          portalImage.width + 5,
          portalImage.height
        );
        pop();
      } else if (gridArray[x][y] === 5) {
        // draw block for portal down
        push();
        fill(0, 255, 0);
        image(
          portalImageDown,
          x * blockSize + 15,
          60 + y * blockSize,
          portalImageDown.width + 5,
          portalImageDown.height
        );
        pop();
      } else if (gridArray[x][y] === 6) {
        // draw rocket
        push();
        if (rocketLaunch === true) {
          push();
          image(
            fire,
            x * blockSize + 32,
            y * rocketPosition + 90,
            blockSize * 1.8,
            blockSize * 1.8
          );
          pop();
          image(
            rocketAstronaut,
            x * blockSize + 25,
            y * rocketPosition,
            blockSize * 2.5,
            blockSize * 3.2
          );
          rocketPosition = rocketPosition - 2;
        } else {
          image(
            rocket,
            x * blockSize + 25,
            y * blockSize,
            blockSize * 2.5,
            blockSize * 3.2
          );
        }

        pop();
      } else if (gridArray[x][y] === 7) {
        // draw block for yellow liquid
        push();
        image(
          yellowLiquid,
          x * blockSize + 25,
          70 + y * blockSize,
          blockSize,
          blockSize
        );
        pop();
      } else if (gridArray[x][y] === 8) {
        // draw block for red liquid
        push();
        image(
          redLiquid,
          x * blockSize + 25,
          60 + y * blockSize,
          blockSize,
          blockSize
        );
        pop();
      } else if (gridArray[x][y] === 9) {
        // draw the small spikes

        triangle(
          x * blockSize + 32.5,
          y * blockSize + 8 + 67,
          x * blockSize + 40,
          y * blockSize + 23 + 67,
          x * blockSize + 25,
          y * blockSize + 23 + 67
        );
        triangle(
          x * blockSize + 47.5,
          y * blockSize + 8 + 67,
          x * blockSize + 55,
          y * blockSize + 23 + 67,
          x * blockSize + 40,
          y * blockSize + 23 + 67
        );
      } else if (gridArray[x][y] === 10) {
        // draw block for the triangle obstacles
        triangle(
          x * blockSize + 40,
          90 + y * blockSize,
          x * blockSize + 25,
          60 + y * blockSize,
          x * blockSize + 55,
          60 + y * blockSize
        );
      } else if (gridArray[x][y] === "a") {
        // draw block with diagonal left corner
        push();
        image(
          blockCornerLeft,
          x * blockSize + 13,
          51 + y * blockSize,
          blockCornerLeft.width,
          blockCornerLeft.height
        );
        pop();
      } else if (gridArray[x][y] === "b") {
        // draw block with diagonal right corner
        push();
        image(
          blockCornerRight,
          x * blockSize + 13,
          50.5 + y * blockSize,
          blockCornerLeft.width,
          blockCornerLeft.height
        );
        pop();
      }
    }
  }
  pop();
}

function smallTriangle(x, y, p) {
  triangle(
    x + blockSize / 3 + p,
    y + blockSize / 2,
    x + blockSize / 2 + p,
    y + blockSize,
    x + blockSize - blockSize + p,
    y + blockSize
  );
}
