let systems=[];
let numSystems =3;

let pg;
let mode=1;
let manyBall=1;

if(window.innerWidth<=900){
  manyBall=1;
}else{
  manyBall=3;
}

window.addEventListener('resize', onWindowResize, false);

function onWindowResize(event) {
  if(window.innerWidth<=900){
    manyBall=1;
  }else{
    manyBall=3;
  }
  setup();

}

function setup(){
  var canvas=createCanvas(window.innerWidth,window.innerHeight+72,P2D);
  canvas.parent('p5-sketch');
  smooth();
  ellipseMode(CENTER);
  pg = createGraphics(width,height,P2D);
  pg.background(255,100);
  systems.splice(0,systems.length);
  for(let i=0;i<numSystems;i++){
  systems.push(new System(random(100,200)*manyBall));
  }

}

function draw(){
  background(255);
  fill(0, 6);
  noStroke();
  rect(0, 0, width, height);
  systems.forEach((sys, i) => {
    sys.run();
  });


  image(pg,0,0);
}

function mouseReleased(){
   mode++;
   mode%=3;
}

function keyReleased(){
  if (keyCode==32){
    setup();
  }
}

class Ball{


  constructor(index_,sys_){
    this.index = index_;
    this.age=0;
    this.radius = 3;
    this.sys=sys_;
    this.maxspeed=2;
    this.nbballs=0;

    this.position=createVector(0,0);
    this.velocity = createVector((1-2*round(random(1)))*random(0.5,this.maxspeed),(1-2*round(random(1)))*random(0.5,this.maxspeed));
    this.position = createVector(random(this.radius,width-this.radius),random(this.radius,height-this.radius));
    this.fposition = this.position.copy();

    this.currentTarget=0;
    this.col = int(map(this.nbballs,0,5,0,255));
  }

  chooseRandomTarget(){
    this.sys.balls[this.currentTarget].nbballs--;
    this.sys.balls[this.currentTarget].col = int(map(this.nbballs,0,5,0,255));
    this.currentTarget=int(random(this.sys.numBalls));
    while (this.currentTarget==this.index){
      this.currentTarget=int(random(this.sys.numBalls));
    }
    this.sys.balls[this.currentTarget].nbballs++;
    this.sys.balls[this.currentTarget].col = int(map(this.nbballs,0,5,0,255));
  }

    update(){
    this.age++;
    let target = this.sys.balls[this.currentTarget];
    let dst=constrain(dist(this.position.x,this.position.y,target.position.x,target.position.y),5,15);
    let delta =p5.Vector.sub(target.position,this.position);

    //check hit
    if (dst <this.radius){//||age%(5*index)==0
      this.chooseRandomTarget();
    }
    //apply /dst as acceleration, apply velocity to move ball
    delta.normalize();
    delta.mult(5/pow(dst,this.sys.factor));//pow(dst,.7));//*noise(position.x+frameCount/100,position.y)
    this.velocity.normalize();
    this.velocity.mult(5);
    this.velocity.add(delta);
    let fpos=p5.Vector.add(this.position,this.velocity);

    //check hit wall
    if(fpos.x>width-this.radius||fpos.x<this.radius){
      this.velocity.x=-this.velocity.x;
      this.chooseRandomTarget();
      return;
    }
    if(fpos.y>height-this.radius||fpos.y<this.radius){
      this.velocity.y=-this.velocity.y;
      this.chooseRandomTarget();
      return;
    }else{
      this.fposition=this.position.copy();
      this.position=fpos;
    }
  }

  display(){
    //draw ball
    noStroke();
    fill(this.col,0,0);
    strokeWeight(1);
    if (mode==0){
      circle(this.position.x,this.position.y,this.radius);
    }
    strokeWeight(0.2);
    stroke(this.col,0,0);
    if(mode<2){
      line(this.position.x,this.position.y,this.sys.balls[this.currentTarget].position.x,this.sys.balls[this.currentTarget].position.y);
    }

    pg.strokeWeight(0.02);
    pg.stroke(this.sys.col);
    pg.line(this.position.x,this.position.y,this.fposition.x,this.fposition.y);

  }
}


class System{

  constructor(numBalls_){
    this.numBalls=numBalls_;
    this.factor = random(0.6,0.8);
    this.col = color(random(0,100),0,random(100,155));
    this.balls = [];
    for (let i=0; i<this.numBalls; i++){
      this.balls.push(new Ball(i,this));
    }

    this.balls.forEach(ball => {
      ball.chooseRandomTarget()

    });
  }

  run(){

    this.balls.forEach(function(myBall,i) {
      myBall.update();
      myBall.display();
    });
  }
}
