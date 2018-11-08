var img1;
var brushes = [];
var brushestwo = [];
var size;

function setup() {
  createCanvas(800,800);
  background(25);
  img1 = loadImage("1.jpg");
  img2 = loadImage("2.jpg")
  noStroke();
  size = 12;
  for (var i=0; i<300; i++) {
    brushes[i] = new Ball(img1,1)
    brushestwo[i] = new Ball(img2,-1)
  }
}

function draw() {
  for (var i=0; i<brushes.length;i++) {
    brushes[i].show();
    brushestwo[i].show()
  }
}

function Ball(img,dir){
  this.img = img;
  this.x = random(0,width);
  this.y = random(0,height);
  this.dir = dir;
  
  this.show = function() {
    c = this.img.get(this.x,this.y)
    fill(c[0],c[1],c[2],200);
    
    ellipse(this.x,this.y,size,size)
    this.x += this.dir*0.5+0.5;
    this.y += this.dir*-0.5+0.5;
    if(this.x < 0 || this.x > width){
      this.x = random(0,width);  
      //this.dir = this.dir*-1
    }
    if(this.y < 0 || this.y > height){
      this.y = random(0,height); 
      //this.dir = this.dir*-1
    }

  }
  
}