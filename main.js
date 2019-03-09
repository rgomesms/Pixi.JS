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

//Esse container contem o jogo
const mainContainer = new PIXI.Container();
function init(){
    console.log("Finished Loading");
    background = Sprite.from(sprites[2]);
    mainContainer.addChild(background);
    
    player = new Player(300,700);
    ball = new Ball(320,400);

    initEnemies();
    initAnimation();
    
    //Adiciona o player à lista de objetos colidíveis
    objectsList.push(player);

    mainContainer.addChild(player.sprite);
    mainContainer.addChild(ball.container); 


    game.stage.addChild(mainContainer);
    game.ticker.add(play);


    controlsSetup();
    mouseEventsSetup();
    touchEventsSetup();

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

function mouseEventsSetup(){
    mainContainer.interactive = true;
    mainContainer.on("pointerdown",onClick);
    mainContainer.on("pointerup",onDrop)

    //Ao clicar o ponteiro
    function onClick(){
        console.log("Houve clique")
        console.log(game.renderer.plugins.interaction.mouse.global);
        const pointerPosition = game.renderer.plugins.interaction.mouse.global;
        /* Caso o clique tenha sido a direita do meio do jogador, ele move pra direita. Caso contrário, move para a esquerda*/
        if(pointerPosition.x > player.sprite.x+player.sprite.width/2)
            player.direction = 1;
        else
            player.direction = -1;
        /* Caso o clique tenha sido no canto direito tela, ele move pra direita. Caso contrário, move para a esquerda*/
        // if(pointerPosition.x>CANVAS_WIDTH/2)
        //     player.direction = 1;
        // else
        //     player.direction = -1;

    }

    //Ao soltar o ponteiro
    function onDrop(){
        player.direction = 0;
    }

}

function touchEventsSetup(){
    mainContainer.on("touchstart", onClick)
    mainContainer.on("touchend",onDrop)
     //Ao clicar o ponteiro
    function onClick(){
        console.log("Houve clique")
        console.log(game.renderer.plugins.interaction.mouse.global);
        const pointerPosition = game.renderer.plugins.interaction.mouse.global;
        /* Caso o clique tenha sido a direita do meio do jogador, ele move pra direita. Caso contrário, move para a esquerda*/
        if(pointerPosition.x > player.sprite.x+player.sprite.width/2)
            player.direction = 1;
        else
            player.direction = -1;
        /* Caso o clique tenha sido no canto direito tela, ele move pra direita. Caso contrário, move para a esquerda*/
        // if(pointerPosition.x>CANVAS_WIDTH/2)
        //     player.direction = 1;
        // else
        //     player.direction = -1;

    }
    
    function onDrop(){
        player.direction = 0;
    }

}







