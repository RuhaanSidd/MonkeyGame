var monkey , monkey_running;
var banana , bananaImage, FoodGroup;
var obstacle, obstacleImage , obstacleGroup;
var Survival_Time;
var invisibleground, ground;

function preload(){
  
   monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
   bananaImage    = loadImage("banana.png");
   obstaceImage   = loadImage("obstacle.png");
   }

function setup() {
   createCanvas(600,300);

   monkey = createSprite(50,240,50,50);
   monkey.addAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
   monkey.scale = 0.1;
  
   ground = createSprite(300,290,600,15);

   invisibleground = createSprite(300,280,600,50);
   invisibleground.x = invisibleground.width /2;
   invisibleground.visible = false;
  
  FoodGroup      = createGroup();
  obstaclesGroup = createGroup();
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true;
  
  Survival_Time = 0;
}

function draw() {

  background("Green");
  
  text("Survival_Time: "+ Survival_Time, 280,50);
  
  invisibleground.velocityX = -4;

  Survival_Time = Survival_Time + Math.round(getFrameRate()/60);
  
  if (invisibleground.x < 0){
      invisibleground.x = invisibleground.width/2;
    }
  
  if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
  monkey.velocityY = monkey.velocityY + 0.8; 
  monkey.collide(invisibleground);
  
  spawnBananas();
  spawnObstacles();
  
  if(obstaclesGroup.isTouching(monkey)){
        monkey.velocityY = 0;
        invisibleground.velocityX = 0;
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
        Survival_Time = 0;
  } 
  
drawSprites();
}

function spawnObstacles(){
 if (frameCount % 100 === 0){
    var obstacle = createSprite(600,250,10,40);
    obstacle.addImage(obstaceImage);
    obstacle.velocityX = -6;
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
   
    obstaclesGroup.add(obstacle);
    obstacle.setCollider("rectangle",0,0,obstacle.width,obstacle.height);
    obstacle.debug = true
 }
}

function spawnBananas() {
  if (frameCount % 90 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 300;
    
    FoodGroup.add(banana);
    monkey.depth = banana.depth + 1;
  }
}