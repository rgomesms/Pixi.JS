class Enemy{
    constructor(x,y,idNumber){
        this.id = "Enemy";
        this.idNumber = idNumber;
        this.sprite = new Sprite.from(enemySprites[0]);
        // this.AnimatedSprite = new PIXI.AnimatedSprite(textureArray);
        this.sprite.x = x;
        this.sprite.y = y;
        this.lives = 3;
    
    }

    // changeSprite(){
    //     var spriteNumber = (this.lives-3)*-1;
    //     this.sprite = new Sprite.from(enemySprites[spriteNumber])
    //     changeSprite(this.idNumber);
    // }


    break(){
        this.lives--;
        this.changeSprite();
        console.log(this.id+this.idNumber+this.lives)
        if(this.lives==0){
            this.sprite.x = 1300;
        }
    }

    changeSprite(){
        var spriteNumber = (this.lives-3)*-1;
        this.sprite.texture =  textureArray[spriteNumber];
            
    }


}

