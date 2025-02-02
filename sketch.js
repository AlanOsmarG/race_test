var canvas ;
var background_image;
var bg_image;
var form, player;
var database;
var car1img, car2img, track, car1, car2;
var obstacle1img, obstacle2img, coinimg, fuelimg, lifeimg;
var playerCount, name;
var gamestate;
var allPlayers;
var cars = []
var fuels, coins;

function preload(){
background_image = loadImage("./assets/background.png");
car1img = loadImage("./assets/car1.png");
car2img = loadImage("./assets/car2.png");
track = loadImage("./assets/track.jpg");
obstacle1img = loadImage("./assets/obstacle1.png");
obstacle2img = loadImage("./assets/obstacle2.png");
coinimg = loadImage("./assets/goldCoin.png");
fuelimg = loadImage("./assets/fuel.png");
lifeimg = loadImage("./assets/life.png")
}

function setup(){
canvas = createCanvas(windowWidth, windowHeight);
database = firebase.database();
//bg_image = background_image;
game = new Game();
game.getState()
game.start()
}

function draw(){
background(background_image)

if(gamestate === 1){
    game.play()
}

if(playerCount === 2){
    game.update(1)
}

if(gamestate === 2){
    game.showBoard()
}
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight)
}

