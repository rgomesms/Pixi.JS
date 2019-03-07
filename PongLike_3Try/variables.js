const sprites = ["resources/greenBall.png",
                "resources/player.png",
                "resources/background.png"];

const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 800;

const WORLD_WIDTH =  CANVAS_WIDTH - 10;  //Tira o tamanho da borda do mapa
const WORLD_HEIGHT = CANVAS_HEIGHT; //Subtract the end of the world size

const playerSpeed = 3;
const ballSpeed = 2.5;
const MinAngleVariation = 15;
const MaxAngleVariation = 30;
const objectsList = [];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


function angleInRadians(angle){
    return angle * Math.PI/180; //Angle in Radians
}