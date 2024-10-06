// level screen
let rotationSpeed = 0;
let planetPressed = 0;
let planets = [
  {

    //Levels
    x: 250,
    y: 250,
    diameter: 130,
    radius: 130 / 2,
    name: "Eoneo",
    color: 255,
    ColorOpacity: 0,
    unLocked: true,
    planetNumber: 0,
  },
  {
    x: 450,
    y: 450,
    diameter: 160,
    radius: 160 / 2,
    name: "Ismene",
    color: 100,
    ColorOpacity: 10,
    unLocked: false,
    planetNumber: 1,
  },
  {
    x: 540,
    y: 250,
    diameter: 90,
    radius: 90 / 2,
    name: "Tirion",
    color: 150,
    ColorOpacity: 10,
    unLocked: false,
    planetNumber: 2,
  },
  {
    x: 750,
    y: 180,
    diameter: 80,
    radius: 80 / 2,
    name: "Oria",
    color: 20,
    ColorOpacity: 10,
    unLocked: false,
    planetNumber: 3,
  },
  {
    x: 1000,
    y: 450,
    diameter: 150,
    radius: 150 / 2,
    name: "SyrinX",
    color: 20,
    ColorOpacity: 10,
    unLocked: false,
    planetNumber: 4,
  },
];

let activePlanet = planets[0];

function levelScreen() {
  textFont("courier new");

  background(0, 0, 0);
  noFill();
  stroke(255, 255, 255);

  drawStars(0.5);
  backButton.display();

  // Line behind planets

  beginShape();
  vertex(0, 100);
  bezierVertex(
    70,
    90,
    planets[0].x,
    planets[0].y - 120,
    planets[0].x,
    planets[0].y
  );
  endShape();

  beginShape();
  vertex(planets[0].x, planets[0].y);
  bezierVertex(
    planets[0].x - 20,
    planets[0].y + 150,
    planets[1].x,
    planets[1].y,
    planets[1].x,
    planets[1].y
  );
  endShape();

  beginShape();
  vertex(planets[1].x, planets[1].y);
  bezierVertex(
    planets[1].x + 250,
    planets[1].y + 100,
    planets[2].x + 100,
    planets[2].y + 100,
    planets[2].x,
    planets[2].y
  );
  endShape();

  beginShape();
  vertex(planets[2].x, planets[2].y);
  bezierVertex(
    planets[2].x - 100,
    planets[2].y - 150,
    planets[3].x - 100,
    planets[3].y - 100,
    planets[3].x,
    planets[3].y
  );
  endShape();

  beginShape();
  vertex(planets[3].x, planets[3].y);
  bezierVertex(
    planets[3].x + 150,
    planets[3].y + 100,
    planets[4].x - 120,
    planets[4].y,
    planets[4].x,
    planets[4].y
  );
  endShape();

  beginShape();
  vertex(planets[4].x, planets[4].y);
  bezierVertex(planets[4].x + 300, planets[4].y + 100, 1350, 100, 1350, 100);
  endShape();

  noStroke();

  push();
  fill(255, 0, 255);
  textSize(40);
  textStyle(NORMAL);
  textAlign(CENTER);
  fill(255, 255, 255);
  text("Galaxy Lustroayna", width / 2, 70);
  pop();

  for (let planetIndex in planets) {
    push();
    textStyle(BOLD);

    // Darken the locked planets
    if (planets[planetIndex].unLocked === false) {
      fill(0, 0, 0, 180);
      tint(45, 45, 45, 255);
    } else {
      tint(255, 255);
    }

    // Hover the planets
    if (
      mouseX > planets[planetIndex].x - planets[planetIndex].radius &&
      mouseX < planets[planetIndex].x + planets[planetIndex].diameter / 2 &&
      mouseY > planets[planetIndex].y - planets[planetIndex].radius &&
      mouseY < planets[planetIndex].y + planets[planetIndex].diameter / 2
    ) {
      tint(115, 255);
    }

    // Display Planets
    let planetWidth = planets[planetIndex].diameter * 1.6;

    imageMode(CENTER);
    if (
      planets[planetIndex].planetNumber === 2 ||
      planets[planetIndex].planetNumber === 4
    ) {
      planetWidth = planets[planetIndex].diameter * 1.4;
    }
    if (planets[planetIndex].planetNumber === 1) {
      planetWidth = planets[planetIndex].diameter * 1.45;
    }

    image(
      planetImages[planets[planetIndex].planetNumber],
      planets[planetIndex].x,
      planets[planetIndex].y * 0.965,
      planetWidth,
      planets[planetIndex].diameter * 1.3
    );

    // hover and show text
    if (
      mouseX > planets[planetIndex].x - planets[planetIndex].radius &&
      mouseX < planets[planetIndex].x + planets[planetIndex].diameter / 2 &&
      mouseY > planets[planetIndex].y - planets[planetIndex].radius &&
      mouseY < planets[planetIndex].y + planets[planetIndex].diameter / 2
    ) {
      fill(255, 255, 255);
      textSize(15);
      textAlign(CENTER);
      text(
        planets[planetIndex].name,
        planets[planetIndex].x,
        planets[planetIndex].y - 10
      );
      if (planets[planetIndex].unLocked === false) {
        textSize(10);
        text("LOCKED", planets[planetIndex].x, planets[planetIndex].y + 10);
      }
    }
    pop();
  }

  //Get to level
  for (let planetIndex in planets) {
    if (
      mouseIsPressed &&
      mouseX > planets[planetIndex].x - planets[planetIndex].radius &&
      mouseX < planets[planetIndex].x + planets[planetIndex].diameter / 2 &&
      mouseY > planets[planetIndex].y - planets[planetIndex].radius &&
      mouseY < planets[planetIndex].y + planets[planetIndex].diameter / 2 &&
      planets[planetIndex].unLocked === true
    ) {
      activePlanet = planets[planetIndex];
    }

    if (
      mouseIsPressed &&
      mouseX > activePlanet.x - activePlanet.radius &&
      mouseX < activePlanet.x + activePlanet.diameter / 2 &&
      mouseY > activePlanet.y - activePlanet.radius &&
      mouseY < activePlanet.y + activePlanet.diameter / 2
    ) {
      state = "game";
      if (activePlanet === planets[0]) {
        activeLevel = resultsLevel1;
        gridArray = level1;
      } else if (activePlanet === planets[1]) {
        activeLevel = resultsLevel2;
        gridArray = level2;
      } else if (activePlanet === planets[2]) {
        activeLevel = resultsLevel3;
        gridArray = level3;
      } else if (activePlanet === planets[3]) {
        activeLevel = resultsLevel4;
        gridArray = level4;
      } else if (activePlanet === planets[4]) {
        activeLevel = resultsLevel5;
        gridArray = level5;
      }
    }
  }

  // Rocket flying around planet
  push();
  translate(activePlanet.x, activePlanet.y);
  rotate(rotationSpeed);
  rotationSpeed = rotationSpeed - 0.1;
  push();
  translate(activePlanet.diameter / 2.4, activePlanet.diameter / 1.6);
  rotate(1.2);
  image(
    rocketAstronaut,
    0,
    0,
    rocketAstronaut.width * 0.2,
    rocketAstronaut.height * 0.2
  );
  pop();

  pop();
}
