function setup() {
  createCanvas(window.innerWidth - 5, window.innerHeight - 5);
  frameRate(60);
}

var counter = 0;
var circleX = 0, circleY = 0;
var lastSecond = 0, fps = 0, countedframes = 0;

function draw() {
  createCanvas(window.innerWidth - 5, window.innerHeight - 5);
  background(100);

  var valueX = mouseX;
  var valueY = mouseY;

  var value2X = movedX;
  var value2Y = movedY;



  if (mouseX != 0 || mouseY != 0){
    circleX = Lerp(circleX, mouseX, 0.1);
    circleY = Lerp(circleY, mouseY, 0.1);
  }

  fill(255, 255, 255);
  ellipse(500 + value2X, 500 + value2Y, 80, 80);
  ellipse(circleX,circleY,80,80);

  textSize(32);
  fill(0, 255, 0);

  updateFramerate();
}

function getDistance(x1, y1, x2, y2){
  return sqrt((y1 - y2) * (y1 - y2)) * ((x1 - x2) * (x1 - x2));
}

function updateFramerate(){
  textSize(32);
  fill(0, 255, 0);
  var s = second();
  if (s != lastSecond){
    lastSecond = s;
    fps = countedframes;
    countedframes = 0;
  }
  text('fps: ' + fps, 10, 30);
  counter++;
  countedframes++;
}

function Lerp(start, target, percentage){
  return start + ((target - start) * percentage)
}
