class Player{
    constructor(x,y){
        this.id = "Player";
        this.sprite = new Sprite.from(sprites[1])
        this.sprite.x = x;
        this.sprite.y = y;
        this.direction = 0 ;
    }

    move(){
            this.sprite.x += playerSpeed * this.direction ;
        if(this.checkCollision() == true)
            this.sprite.x -= playerSpeed * this.direction ;

    }

    checkCollision(){
        //Considerando o tamanho da borda
        if(player.sprite.x+player.sprite.width < WORLD_WIDTH &&
           player.sprite.x>10)
            return false;
        else
            return true;
    }
}