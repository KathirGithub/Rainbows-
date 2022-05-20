var Loki,Thor,path,invisiblePath,restart,finish
var ThorGroup
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  Thorimg = loadImage("Him.png");
  LokiImg = loadImage("The Guy.png");
  PathImg = loadImage("Bridge.png")
  restartImage = loadImage("restart.png");
  finsihImage = loadImage("gameOver.png");

  //endImg =loadAnimation("gameOver.png");
}

function setup(){
  createCanvas(600,600);
  // Moving background

ThorGroup = createGroup();

//creating Loki running
Path = createSprite(300,300,600,600)
Path.addImage("Paths",PathImg)
Path.scale=2;

invisiblePath = createSprite(300,300,600,20);
invisiblePath.visible = false;

Loki = createSprite(70,250,20,20);
Loki.addImage("LokiRunning",LokiImg);
Loki.scale=0.08;
restart = createSprite(300,300);
    restart.addImage(restartImage)
    restart.scale = .4
    finish = createSprite(300,200);
    finish.addImage(finsihImage);
    finish.scale = .5
  
}





function draw() {
background("Path")
  if(gameState===PLAY){
  background(0);
 
  edges= createEdgeSprites();
  Loki.collide(edges);
  spawnObstacles();
  if(keyDown("space")&& Loki.y >=100) {
    Loki.velocityY = -12;
  }
  Loki.velocityY = Loki.velocityY + 0.8
  finish.visible = false;
  restart.visible = false;

    if (ThorGroup.isTouching(Loki)){
      gameState=END;
    }
  
 
  
  textSize(20);
  fill(255);
  



}
  

  else if(gameState===END){
    ThorGroup.setVelocityXEach(0)
    
    if(mousePressedOver(restart)) {
      reset();
    }
    finish.visible = true;
    restart.visible = true;
  }
  Loki.collide(invisiblePath);
  drawSprites();

}
function spawnObstacles(){
  if (frameCount % 60 === 0){
    var Thor = createSprite(600,250,10,40);
    Thor.velocityX = -6;
    Thor.addImage("Him",Thorimg)
   
     //assign scale and lifetime to the obstacle           
     Thor.scale = 0.08;
     Thor.lifetime = 300;
  ThorGroup.add(Thor);
    //add each obstacle to the group
   
  }
}

function reset(){
  gameState=PLAY;
  finish.visible = false;
  restart.visible = false;
  ThorGroup.destroyEach();
  
}