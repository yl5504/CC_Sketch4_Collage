var img;
var img1;
var img2;
var brushes = [];
var brushestwo = [];
var size;

var inputText = "if you soil three-quarters of a canvas with black and white, rub the rest with yellow, distribute haphazardly some red and blue spots, you'll obtain an impression. They are Impressionists in the sense that they render not the landscape but the sensation produced by the landscape."
var inputTitle = "Impressinism"
var message = "THRIVING"
var letters=[]
var spacing = 8; // line height
var angle=0;

//This collage contains three paintings of Monet. I just love impressionism and chose his paintings to code this changeable, generative collage.

function preload() {
  img = loadImage('0.jpg');  //load background image
}


function setup() {
  createCanvas(800,800);
  background(25);
  //load main body image
  img1 = loadImage("1.jpg");
  img2 = loadImage("2.jpg")
  noStroke();
  size = 12; //brush's size
  for (var i=0; i<300; i++) {
    brushes[i] = new Ball(img1,1)
    brushestwo[i] = new Ball(img2,-1)
  }

  textFont('Times');
  textAlign(CENTER, CENTER);

//Text based on image -- background
  var x = 0;
  var y = 0;
  var counter = 0;

  while (y < height) {
    // translate position (display) to position (image)
    img.loadPixels();
    // get current color
    var imgX = round(map(x, 0, width, 0, img.width))
    var imgY = round(map(y, 0, height, 0, img.height))
    var c = color(img.get(imgX, imgY));

    push();
    translate(x, y);
    textSize(15)
    fill(c,200)
    
    var letter = inputText.charAt(counter);
    text(letter, 0, 0);
    var letterWidth = textWidth(letter) + 1;
    // for the next letter ... x + letter width
    x += letterWidth;

    pop();

    // linebreaks
    if (x + letterWidth >= width) {
      x = 0;
      y += spacing;
    }

    counter++;
    if (counter >= inputText.length) {
      counter = 0;
    }
  } 

  var a = 300; var b = 800;
  for(var i = 0; i<message.length;i++){
    letters[i] = new Letter(a,b,message.charAt(i));
    a += 8 * textWidth(message.charAt(i))
    b += 80
  }

}



function draw() {

  //Rotating text that you can type and edit
  push();
  fill(255,20);
  var ts = map(mouseX,0,width,20,40)
  textSize(ts);

  translate(mouseX,mouseY);
  rotate(radians(angle));

  text(inputTitle,0,0);

  angle = angle +0.5;//changes speed of rotation

  pop();

  //Press mouse to brush images
  if(mouseIsPressed){
   for (var i=0; i<brushes.length;i++) {
     brushes[i].show();
     brushestwo[i].show()
    }
  }

  //THRIVING
  for (var i = 0;i<letters.length;i++){
    letters[i].display();
    letters[i].up();
  }

}

class Letter{
  constructor(x_,y_,letter_){
    this.x = x_
    this.y = y_
    this.letter = letter_
  }

  display(){
    fill(255,40);
    textAlign(CENTER);
    textSize(40)
    text(this.letter,this.x,this.y)
  }

  up(){
    this.y -=random(0,2) 
  }
}



function keyTyped() {
  if (key == BACKSPACE) {
    var lastLetter = inputTitle.length -1;
    if (lastLetter < 0) lastLetter = 0;
    inputTitle = inputTitle.substring(0, lastLetter);
  }
  else  {
    inputTitle += str(key);
  }
}

function Ball(img,dir){
  this.img = img;
  this.x = random(0,width);
  this.y = random(0,height);
  this.dir = dir;
  
  this.show = function() {
    //get the image's color
    c = this.img.get(this.x,this.y)
    fill(c[0],c[1],c[2],200);
    ellipse(this.x,this.y,size,size)
    //brush's speed depending on mouse position
    var vx = map(mouseX,0,width,0.3,3)
    var vy = map(mouseY,0,height,0.3,3)
    this.x += (this.dir*0.5+0.5)*vx;
    this.y += (this.dir*-0.5+0.5)*vy;
    //back to the screen
    if(this.x < 0 || this.x > width){
      this.x = random(0,width);  
    }
    if(this.y < 0 || this.y > height){
      this.y = random(0,height); 
    }
  }
  
}