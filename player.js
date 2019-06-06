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

    //This function checks collision with the edges of the world
    checkCollision(){
        if(player.sprite.x+player.sprite.width - playerSpeed < WORLD_WIDTH &&
           player.sprite.x>WORLD_WIDTH_START)
            return false;
        else
            return true;
    }
}