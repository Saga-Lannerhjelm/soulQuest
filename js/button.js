// Following lines of code was made with help from lab number 4, "catch me"

class Button {
  constructor(x, y, width, height, text) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
  }

  display() {
    push();
    noStroke();
    translate(this.x, this.y);
    fill(255, 255, 255, 25);
    rect(0, 0, this.width, this.height, this.height / 4);
    fill("#ffffff");
    textSize(this.height / 2);
    textAlign(CENTER);
    text(this.text, 0, this.height / 4, this.width);
    pop();
  }

  pressButton(x, y) {
    return (
      x > this.x &&
      x < this.x + this.width &&
      y > this.y &&
      y < this.y + this.height
    );
  }
}
