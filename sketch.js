// Daniel Shiffman
// http://codingtra.in
// https://youtu.be/IKB1hWWedMk
// https://thecodingtrain.com/CodingChallenges/011-perlinnoiseterrain.html

// Edited by SacrificeProductions

var cols, rows;
var scl = 20;
var w = 1400;
var h = 1000;

var flying = 0;

var terrain = [];

var speed = 0.01;

function setup() {
  createCanvas(600, 600, WEBGL);
  
  
  cols = w / scl;
  rows = h / scl;

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }
}

function draw() {
  flying -= speed;
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      let x_real = map(x, 0, cols-1, 0, 600);
      let z_offset = map(abs(mouseX-x_real),0,600, 100,0)
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100 + z_offset, 150 + z_offset);
      xoff += 0.2;
    }
    yoff += 0.2;
  }

  let from = color(236, 225, 185);
  let to = color(206,141, 141);
  let sky = color(0,70,90);

  background(sky);
  translate(0, 50);
  rotateX(PI / 3);
  fill(79, 39, 18, 200);
  translate(-w / 2, -h / 2);
  colorMode(HSB);
  for (var y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    //noStroke();
    stroke(180,80,60, 10);
    fill(map(y,0,rows - 1, 280, 360), 60, 50, 10);
    for (var x = 0; x < cols; x++) {

      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
  //speed += random(-0.001,0.001);
}

function mousePressed(){
  speed += 0.001;
}