{
  //hamburger toggle
    const hamburger=document.getElementById("hamburger");
    const navUL=document.getElementById("nav-ul");
    hamburger.addEventListener('click',()=>{
      navUL.classList.toggle("show");
    });
}


let img;
let yoff=0.0;
let organics=[];
let colorsPalette=[];
let speed=1;

let rem=10;
let footerTop;
let navHeight;
let cavHeight;

if(window.innerWidth<=1200){
  footerTop=131.9*rem;
  cavHeight=50*rem;
}else{
  footerTop=21.6*rem+window.innerHeight;
  cavHeight=window.innerHeight;
}


document.getElementById("myFooter").style.top=footerTop+"px";

window.addEventListener('resize',onWindowResize,false);

function onWindowResize(event){

  if(window.innerWidth<=1200){
    navHeight=131.9*rem;
    cavHeight=50*rem;
  }else{
    navHeight=21.6*rem+window.innerHeight;
    cavHeight=window.innerHeight;
  }

  setup();
  document.getElementById("myFooter").style.top=navHeight+"px";
}

function preload(){
  //img=loadImage('');
  colorsPalette=[color(146,167,202,25),
                          color(186,196,219,25),
                          color(118,135,172,25),
                          color(76, 41, 81,25),
                          color(144, 62, 92,25),
                          color(178, 93, 119,25),
                          color(215, 118, 136,25),
                          color(246, 156, 164,25),];
}

function setup(){
  var canvas=createCanvas(cavHeight/1.1,cavHeight,P2D);
  smooth();
  canvas.parent('p5-sketch');
  background(255);
  for(let i=20;i<120;i++){
    organics[i-20]= new Organic(0.1+height/500*i,width/2,height/2,i*height/425,i*random(90),colorsPalette[floor(random(8))]);
  }
}

function draw(){
  background(color('#36054E'));
  //background(color('#AA28FF'));
  //image(img,0,0,width,height);
  for (let i=0;i<organics.length;i++){
    organics[i].show(yoff);
  }
  yoff += 0.01*speed;
}

class Organic{
  constructor(radius,xpos,ypos,roughness,angle,color){
    this.radius=radius;
    this.xpos = xpos;
    this.ypos = ypos;
    this.roughness=roughness;
    this.angle=angle;
    this.color=color;
  }
  show(yoff_){
    stroke(255,10);
    strokeWeight(1.5);
    fill(this.color);
    //draw a blob
    push();
    translate(this.xpos,this.ypos);
    rotate(this.angle+yoff_);
    beginShape();
    let xoff=0;
    for(let a=0;a<=TWO_PI;a+=0.1*speed){
      let offset = map(noise(xoff, yoff_), 0, 1, -this.roughness, this.roughness);
      let r= this.radius + offset*sin(2*a);
      let x= r * cos(a);
      let y =r * sin(a);
      vertex(x,y);
      xoff += 0.1*speed;
    }
    endShape();
    pop();
  }
}
