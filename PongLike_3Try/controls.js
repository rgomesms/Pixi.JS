function keyboard(value) {
    let key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = event => {
      if (event.key === key.value) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
        event.preventDefault();
      }
    };
  
    //The `upHandler`
    key.upHandler = event => {
      if (event.key === key.value) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
        event.preventDefault();
      }
    };
  
    //Attach event listeners
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);
    
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


  function controlsSetup(){
    //Keyboard
      let rightArrow = keyboard("ArrowRight");
      let leftArrow = keyboard("ArrowLeft");
      let spaceBar = keyboard(" ");
        
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
          
      
    }
    