// The following code was made with help by code from Garrit Schaap's Night Sky example on https://pixelkind.github.io/foundationsofprogramming/programming/15-07-example

let stars = [];

function drawStars(speed) {
  push();

  noStroke();
  //   frameRate(0);
  if (stars.length == 0) {
    createStars();
  }

  for (let star of stars) {
    fill(255, 255, 255, Math.abs(Math.sin(star.alpha)) * 255);
    ellipse(star.x, star.y, star.size);
    star.alpha = star.alpha + 0.02;
    star.x = star.x + speed;
    if (star.x > width) {
      star.x = -4;
      star.y = Math.floor(Math.random() * height);
    }
  }

  pop();
}

function createStars() {
  for (let i = 0; i < 500; i++) {
    const star = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
      size: random(0.5, 4),
      alpha: Math.random(),
    };
    stars.push(star);
  }
}
