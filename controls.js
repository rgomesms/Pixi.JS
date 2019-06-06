/******************************
Here i'm gonna setup the controls for the game. 
The code it's pretty simple, Believe i've reused the code from some guide. 
(Sorry I forgot where I take that - any doubts just search on Google).
But yeah, it's pretty standards functions. A pretty simple  code, but for this project I guess it's enough (well,it's probably everything running Ok, right? :D)
******************************/

function keyboard(value) {
    let key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    
    //The `downHandler` - for when you press the button
    key.downHandler = event => {
      if (event.key === key.value) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
        event.preventDefault();
      }
    };
  
    //The `upHandler` - for when you release the button
    key.upHandler = event => {
      if (event.key === key.value) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
        event.preventDefault();
      }
    
    };
  
    //Attaching event listeners
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);
    
    //Adding event listeners to the window.
    window.addEventListener(
      "keydown", downListener, false
    );
    window.addEventListener(
      "keyup", upListener, false
    );
    
    // Detach event listeners
    key.unsubscribe = () => {
      window.removeEventListener("keydown", downListener);
      window.removeEventListener("keyup", upListener);
    };
    
    return key;
  }

  /*Controls Setup:
    Pressing leftArrow change the direction to left(change player.direction)
    Pressing rightArrow change the direction to right(change player.direction)
    Releasing them both stops the movement
    */
  function controlsSetup(){

    let rightArrow = keyboard("ArrowRight");
    let leftArrow = keyboard("ArrowLeft");
    let space = keyboard(" ");

    leftArrow.press = () =>
    {
      player.direction = -1;
    }

    leftArrow.release = () =>
    {
      if(!rightArrow.isDown)
      player.direction = 0;
    }
    
    rightArrow.press = () =>
    {
      player.direction = 1;
    }

    rightArrow.release = () =>
    {
      if(!leftArrow.isDown)
      player.direction = 0;
    }
    
    space.press = () =>
    {
        pauseFunction();
    }
      
  }


/*Pointers Setup:
  This function is responsible for the mouse and touchscreen support (mobiles).
  I've decided (probably not the best idea because no one get it first time) that to move, you gotta
  click in the direction in relation to the player. That is, if you want to move left, click on the left of the player,
  if you want to move right, click right on the player.
  Yeah, it's not based in relation to the screen position (right-side or left-side)  
  */
function pointerEventsSetup(){
  mainContainer.interactive = true;
  mainContainer.on("pointerdown",onClick);
  mainContainer.on("pointerup",onDrop)

  function onClick(){
      // console.log("Houve clique") //A debug tool - means something like ("click happened").
      const pointerPosition = game.renderer.plugins.interaction.eventData.data.global;
            
      /* Caso o clique tenha sido a direita do meio do jogador, ele move pra direita. Caso contrário, move para a esquerda*/
      if(pointerPosition.x > player.sprite.x+player.sprite.width/2)
          player.direction = 1;
      else
          player.direction = -1;
      /* Caso o clique tenha sido no canto direito tela, ele move pra direita. Caso contrário, move para a esquerda*/
          
      /*An attempt to move based on the screen position, but I decided not to use it*/
      // if(pointerPosition.x>CANVAS_WIDTH/2)
      //     player.direction = 1;
      // else
      //     player.direction = -1;

  }

  function onDrop(){
      player.direction = 0;
  }

}








    