var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var position=0;
var form, player, game;
var add,feed;
var cars, car1, car2, car3, car4;
var giftgroup;
var track, car1_img, car2_img, car3_img, car4_img;

var santa,santaImage;

function preload(){
  santaImage=loadImage("santa.png");
  track=loadImage("images/track.jpg");
  car2_img = loadImage("boyHappy.png");
  car1_img = loadImage("boySad.png");
  car4_img = loadImage("girlHappy.png");
  car3_img = loadImage("girlSad.png");
  prize=loadImage("gift.png")
  
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();

  game = new Game();
  game.getState();
  game.start();
  gift1=new Gift();
  santa=createSprite(200,800,50,50);
  santa.addImage(santaImage);
  santa.scale=0.05;

  feed = createButton("GIVE THE GIFTS");
  feed.position(1100,80);
  feed.mousePressed(giveGifts);
  
  add = createButton("ADD GIFTS");
  add.position(1100,40);
 add.mousePressed(addGift)
 
 giftgroup=new Group();
 
 
}


function draw(){
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
   
  }
 

}
var x=100
 var y=900
function addGift(){
  position++
  database.ref('/').update({
   gift : position
 })
 x=x+50;
 gift2=createSprite(x,y,30,30)
 if(x==300)
 {
   y=y+50
   x=100;
 }
 gift2.addImage(prize)
 gift2.scale=0.05
 giftgroup.add(gift2)

}
function giveGifts(){
  for (var i = 0; i < giftgroup.length; i++) {
    giftgroup.get(i).destroy();
}
 if(position == 0)
 {
   gift1.updateGiftStock(0);
   
 }
 else
 {
   gift1.updateGiftStock(position-1)
  
 }
 
 database.ref('/').update({
   gift : gift1.getGiftStock(),
 
 })
 
}