// start screen
function startScreen() {
  background(0, 0, 0);
  fill(255, 255, 255);
  textSize(60);
  textFont("courier new");
  textAlign(CENTER);
  textStyle(NORMAL);
  text("SoulQuest", width / 2 - 20, 300);
  drawStars(0.5);

  beginButton.display();

  image(rocketFire, 90, 100, rocketFire.width / 1.5, rocketFire.height / 1.5);
  image(planet, 600, 300, 1200, 1200);
}
