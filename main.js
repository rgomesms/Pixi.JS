//A few aliases
const Sprite = PIXI.Sprite,
      Loader = PIXI.Loader;
      Application = PIXI.Application;

//Creating a new game Application
const game = new Application({width:CANVAS_WIDTH,height:CANVAS_HEIGHT, backgroundColor:0x050c41,resolution:window.devicePixelRatio,autoDensity: true, legacy:true});
game.renderer.width = window.innerWidth;
game.renderer.height = window.innerHeight;
document.body.appendChild(game.view);

//Loading game sprites and enemySprites
loader = new Loader();
for(sprite of sprites)
    loader.add(sprite);
for(sprite of enemySprites)
    loader.add(sprite);
for (sprite of guiSprites)
    loader.add(sprite);
loader.load(init)

//This function initializes the gui elements
function initGui(){
    const heartContainer = new PIXI.Container();
    const pauseContainer = new PIXI.Container();
    heartSprite = new Sprite.from(guiSprites[0]);
    heartSprite.scale.set(.05);
    
    livesText = new PIXI.Text(playerLives.toString(),{fontFamily : textFont, fontSize: 30, fill : 0xff1010, align : 'center', fontWeight:900, stroke:0x00000});
    livesText.x = heartSprite.width + 8;
    livesText.y = -3;
    heartContainer.addChild(livesText)
    heartContainer.x = WORLD_WIDTH_START + 5;
    heartContainer.y = 15;
    heartContainer.alpha = .7;
    
    heartContainer.addChild(heartSprite);

    gameOverText = new PIXI.Text("Well...You've already lost but you can keep trying! ",{fontFamily : textFont, fontSize: 15, fill : 0xff1010, align : 'center', fontWeight:900});    
    gameOverText.x = livesText.x+livesText.width + 10;
    gameOverText.y = 0;
    gameOverText.visible = false;
    
    heartContainer.addChild(gameOverText);
    mainContainer.addChild(heartContainer);
    
    pauseSprite = new Sprite.from(guiSprites[1]);
    pauseSprite.scale.set(.1);
    pauseSprite.alpha = .7;

    pauseContainer.addChild(pauseSprite);
    pauseContainer.x = WORLD_WIDTH - pauseContainer.width - 10;
    pauseContainer.y = 15;

    pauseContainer.interactive  = true;
    pauseContainer.on('pointertap', ()=>{pauseFunction()});

    pauseText = new PIXI.Text("Paused\n\nPress Space to continue\nClick to continue",{fontFamily : textFont, fontSize: 40, fill : 0xff1010, align : 'center'});    
    pauseText.x = (WORLD_WIDTH -  pauseText.width)/ 2;
    pauseText.y = ( (WORLD_HEIGHT -  pauseText.height)/ 2 )  - 50;
    pauseText.visible = false;

    game.stage.addChild(pauseContainer);
    game.stage.addChild(pauseText);

}

function pauseFunction(){
    pause = !pause;
    if(pause == true){
        mainContainer.alpha = .2;
        pauseText.visible = true;
    }
    else{
        mainContainer.alpha = 1;
        pauseText.visible = false;
    }
}

function decreaseLife(){
    playerLives-=1;
    livesText.text = playerLives.toString();
    if(playerLives <= 0){
        gameOver();
    }
}

function gameOver(){
    gameOverText.visible = true;
}


function mainContainerOnClick(){
    if(pause == true)
        pauseFunction();
}

const mainContainer = new PIXI.Container(); //This container contains the Game

function init(){
    game.stage.addChild(mainContainer); //Adding main container to the stage
    background = Sprite.from(sprites[2]);
    mainContainer.addChild(background);
    
    player = new Player(300,700);
    ball = new Ball(320,400);

    initEnemies();
    initAnimation();
    
    //Add player to the list of objects you can collide with
    objectsList.push(player);

    mainContainer.addChild(player.sprite);
    mainContainer.addChild(ball.container); 
    
    initGui(); //initialize gui elements

    mainContainer.on('pointerdown',() => mainContainerOnClick() )

    game.ticker.add(play); //Play function, with a timer (ticker)

    controlsSetup() //Setup controls
    pointerEventsSetup(); //Setup pointer (mouse or touch screen)

}

/************************************ 
The FPS is limited to 60 for better gaming experience (because shit happens)... 
I've discovered the hard way that the game was running very slow in 60hz monitors - i was using a 144hz when developing-
So yeah, it's everything running on 60hz, so your (and mine D:) expensive 144hz monitor don't worth nothing in this game. 
Live with that.
    :D - Sad but true...
************************************/
var fps = 60;
var now; 
var then = Date.now();
var interval = 1000/fps;
var delta;

function play(){
    now = Date.now();
    delta = now - then;

    if(delta>interval && pause == false){
        player.move();
        ball.move();

        then = now - (delta%interval);
    }
    
}

function initEnemies(){
    let x = 30;
    let y = 30;
    let enemyCount = 0;
    for(j=0;j<6;j++){
    
        for(i=0;i<8;i++){
            objectsList.push(new Enemy(x,y,enemyCount));
            x+=90;
            mainContainer.addChild(objectsList[enemyCount].sprite); 
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
    }

}


