const Sprite = PIXI.Sprite,
      Loader = PIXI.Loader;
      Application = PIXI.Application;


const game = new Application({width:CANVAS_WIDTH,height:CANVAS_HEIGHT, backgroundColor:0x1099bb});
document.body.appendChild(game.view);

loader = new Loader();
for(sprite of sprites){
    loader.add(sprite);
}
loader.load(init)



function init(){
    console.log("Entered Init"); //////////
    console.log("Finished Loading");
    background = Sprite.from(sprites[2]);
    
    player = new Player(300,740);
    ball = new Ball(320,500);


    objectsList.push(player);

    game.stage.addChild(background);
    game.stage.addChild(player.sprite);
    game.stage.addChild(ball.sprite)
    game.ticker.add(play);



}
controlsSetup();
function play(){
    player.move();
    ball.move();

}
