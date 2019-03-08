class Enemy{
    constructor(x,y,idNumber){
        this.id = "Enemy";
        this.idNumber = idNumber;
        this.sprite = new Sprite.from(enemySprite);
        this.sprite.x = x;
        this.sprite.y = y;
        this.lives = 3;
    }

    break(){
        console.log(this.id+this.idNumber+this.lives)
        if(this.lives==0){
            this.sprite.x = 1300;
        }
        this.lives--;
    }
}