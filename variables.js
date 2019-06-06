const sprites = ["resources/greenBall.png",
                "resources/player.png",
                "resources/background.png",];

const enemySprites =[ "resources/enemy0.png",
                      "resources/enemy1.png",
                      "resources/enemy2.png"];

const guiSprites = ["resources/heart-icon.png",
              "resources/pause-icon.png"];

const objectsList = []; //This array lists all colidibles objects
const textureArray = []; //This array is used to change the Enemies textures (to look like is breaking) - I discovered later that there are better implementations.

const CANVAS_WIDTH = 640; 
const CANVAS_HEIGHT = 800;

const WORLD_WIDTH =  CANVAS_WIDTH-10; //10 is the size of the metal border, in the edge of the map  
const WORLD_WIDTH_START = 10;
const WORLD_HEIGHT = CANVAS_HEIGHT;

//Game control variables
let playerLives = 3;
const playerSpeed = 9.6; //4
const ballSpeed = 9.6; //4
const ballRotationSpeed = .1;
const MinAngleVariation = 15;
const MaxAngleVariation = 30;
//Yeah, you can play up with this values - (changing angles values make the ball wild :D)

let pause = false;

// Text variables
let livesText;
let pauseText;
let gameOverText;
const textFont = 'sans-serif';

//This function returns a random integer
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

//This function convert from degrees to radians
function angleInRadians(angle){
    return angle * Math.PI/180; //Angle in Radians
}

