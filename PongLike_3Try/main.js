const Sprite = PIXI.Sprite,
      Loader = PIXI.Loader;
      Application = PIXI.Application;


const game = new Application({width:CANVAS_WIDTH,height:CANVAS_HEIGHT, backgroundColor:0x1099bb});
document.body.appendChild(game.view);

loader = new Loader();
for(sprite of sprites){
    loader.add(sprite);
}
for(sprite of enemySprites)
    loader.add(sprite);
loader.load(init)


function init(){
    console.log("Entered Init"); //////////
    console.log("Finished Loading");
    background = Sprite.from(sprites[2]);
    game.stage.addChild(background);
    
    player = new Player(300,740);
    ball = new Ball(320,400);

    initEnemies();
    initAnimation();
    
    objectsList.push(player);
    game.stage.addChild(player.sprite);
    game.stage.addChild(ball.container)
    game.ticker.add(play);


controlsSetup();

}


function play(){
    player.move();
    ball.move();

}

function initEnemies(){
    let x = 30;
    let y = 30;
    let enemyCount = 0;
    for(j=0;j<6;j++){
    
        for(i=0;i<8;i++){
            objectsList.push(new Enemy(x,y,enemyCount));
            x+=90;
            game.stage.addChild(objectsList[enemyCount].sprite); 
            enemyCount++;
        }
        y+=60;
        x = 30;
    }
}

function initAnimation(){
    for(i=0;i<3;i++){
        let texture = new PIXI.Texture.from(enemySprites[i]);
        textureArray.push(texture);
    console.log(texture);
    }

}







