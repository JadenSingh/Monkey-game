
var monkey , monkey_running, RandomHeight;
var banana ,bananaImage, obstacle, obstacleImage, tree, treeImage,panda,pandaImage;
var bananaGroup, obstacleGroup
var score=0;
var Bananas=0
var ground, groundImage
var START = 0;
var PLAY = 1;
var END = 2;
var gameState=START;
var invisground
var startback, startbackImage;
var play1, playImage,title, titleImage;
var bananaGroup;
var plane, planeImage;
var gameover, gameoverImage;
var menu, menuImage;
var Deaths=0;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  groundImage = loadImage("Ground-1.png");
  obstacleImage = loadImage("obstacle.png");
  startbackImage = loadImage("startback.jpg");
  titleImage = loadImage("title.png");
  playImage = loadImage("play1.png");
  treeImage=loadImage("tree.png");
  pandaImage = loadImage("panda.png");
  planeImage = loadImage("plane.png");
  gameoverImage = loadImage("Gameover.png");
  menuImage = loadImage("menu.png");

 
}



function setup() {
  createCanvas(770,400);
  
  startback = createSprite(350,200);
  startback.addImage(startbackImage);
  startback.scale=0.5;
 
  
  ground = createSprite(250,100);
  ground.addImage(groundImage);
  ground.x = ground.width /2;
  ground.scale=1.5;

  monkey = createSprite(50,280);
  monkey.addAnimation("running", monkey_running );
  monkey.scale=0.1;
  
  invisground = createSprite(30,320,400,5);
  invisground.visible=false;
  
  
   
  title = createSprite(370,160);
  title.addImage(titleImage);
  title.scale=0.8;
    
  play1 = createSprite(365,280);
  play1.addImage(playImage);
  play1.scale=0.3;
  
  gameover = createSprite(360,200);
  gameover.addImage(gameoverImage);
  gameover.scale=1;
  
  menu = createSprite(345,330);
  menu.addImage(menuImage);
  menu.scale=0.5;
  
  bananaGroup= new Group();
  obstacleGroup= new Group();
  
  
}
function draw() {
background("white");
  console.log(gameState);
  
  if(gameState===START){
    monkey.visible=false;
    ground.visible=false;
    gameover.visible=false;
    menu.visible=false;
    startback.visible=true;
    play1.visible=true;
    title.visible=true;
    
    if(mousePressedOver(play1)){
    
    gameState = PLAY;
  }
    
  
    
  }
  
  if(gameState===PLAY){
    ground.y=100;
    startback.visible=false;
    menu.visible=false;
    gameover.visible=false;
    title.visible=false;
    play1.visible=false;
    monkey.visible=true;
    ground.visible=true;
    ground.velocityX = -6;
    if (ground.x < 0){
      ground.x = ground.width/2; 
    }
      if(keyDown("space")&& monkey.y >= 280) {
        monkey.velocityY = -15;
        
      }
  monkey.velocityY = monkey.velocityY + 0.8
    
    spawnObstacles();
    spawnPlane();
    spawnBananas();
    
    if(frameCount%5===0){
      score++;
      
    }
    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      Bananas=Bananas+1;
    }
    if(obstacleGroup.isTouching(monkey)){
      gameState=END; 
      score=0;
      Bananas=0;
      Deaths=Deaths+1;
    }
    
    
  }
   if(gameState===END){
    monkey.y=280;
     startback.visible=false;
    title.visible=false;
    play1.visible=false;
    monkey.visible=false;
    obstacleGroup.setVisibleEach(false);
    obstacleGroup.setVelocityXEach(0);
    ground.visible=false;
    ground.velocityX=-6;
    menu.visible=true;
    gameover.visible=true;
     score.visible=false;
     Bananas.visible=false;
    obstacleGroup.destroyEach();
     bananaGroup.destroyEach();
    if(mousePressedOver(menu)){
      
      gameState=START;
    }
  }
   
  monkey.collide(invisground);
  
    
  

  
drawSprites();
  stroke("black");
  fill("yellow");
  textSize(30);
  text("Bananas: "+ Bananas,10,80);
  stroke("black");
  fill("yellow");
  textSize(30);
  text("Score: "+ score,10,40);
  stroke("black");
  fill("red");
  textSize(30);
  text("Deaths: "+ Deaths,10,120);
}

function spawnObstacles(){
   if (frameCount % 100 === 0){
   var obstacle = createSprite(770,290);
     obstacle.addImage(obstacleImage);
     obstacle.scale=0.15;
     obstacle.velocityX = -5;
     obstacleGroup.add(obstacle);
     obstacle.setCollider("circle",0,0,80)
     
     var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacleImage);
              break;
      case 2: obstacle.addImage(treeImage);
        obstacle.scale=0.25;
              break;
      case 3: obstacle.addImage(pandaImage);
        obstacle.scale=0.21;
              break;
              default: break;
    }
   }
  
  
}
function spawnPlane(){
  if (frameCount % 300 === 0){
   var plane = createSprite(770,210);
     plane.addImage(planeImage);
     plane.scale=0.5;
     plane.velocityX = -10;
     obstacleGroup.add(plane);
    plane.setCollider("circle",0,0,40)
    
  
  
}
}

function spawnBananas(){
  if (frameCount % 120 === 0){
   var banana = createSprite(770,280);
   banana.addImage(bananaImage);
   banana.scale=0.1;
   banana.velocityX=-5;
   banana.y = Math.round(random(250,290));
   bananaGroup.add(banana);
  
}

}