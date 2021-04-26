
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup, obstacle_img;
var score
var backImage,backgr;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  backImage=loadImage("jungle.jpg");
  gameOverImg = loadImage("gameOver.png");
}



function setup() {
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  


  var survivalTime=0;
  
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
   monkey.scale=0.1
  monkey.setCollider("circle",0,0,240)
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
 
  
}


function draw() {
  
  background(255);
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  monkey.debug=false
   
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);   
    spawnFood();
    spawnObstacles();

    if(backgr.x<100){
      backgr.x=backgr.width/2;
    }
    
    
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);        
  
  

  if(obstaclesGroup.isTouching(monkey)){ 
    gameState = END;
}
} if(gameState === END){

backgr.velocityX = 0;
monkey.visible = false;

FoodGroup.destroyEach();
obstaclesGroup.destroyEach();

textSize(30);
fill(255);
text("Game Over!", 300,220);

}

    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
      monkey.scale += 0.02
      score = score + 2;
    }
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50);




function spawnFood() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -4;
    
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
     banana.addImage(bananaImage);
     banana.scale=0.05;
     banana.lifetime= 300;
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = (4 + 2*score/100); 
    
    obstacle.setCollider("circle",0,0,240)  
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    obstacle.lifetime = 300;
    obstacle.debug=true
    obstaclesGroup.add(obstacle);
  }
}
