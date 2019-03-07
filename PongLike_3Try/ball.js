class Ball{
    constructor(x,y){
        this.id = "Ball";
        this.container = new PIXI.Container();
        this.sprite = Sprite.from(sprites[0]);
        this.container.addChild(this.sprite);
        //Rotation parameters

        this.angle = getRandomInt(-30,30);
        this.dx = 1; //Direcao no eixo X
        this.dy = 1; //Direcao no eixo y
        //Translation parameters
        this.container.x = x;
        this.container.y = y;
        //Collision parameters
        this.collisionType = "NothingYet"
        this.collisionSide = "NothingYet";
        this.collisionPart = "NothingYet"

    }

    move(){
        
        this.rotate();
        this.container.x+= (Math.sin(angleInRadians(this.angle))) * (ballSpeed * this.dx);
        this.container.y+= (Math.cos(angleInRadians(this.angle)) )  *( ballSpeed * this.dy); 
        if(this.checkCollision() == true){
            console.log(this.collisionType+this.collisionSide);
            this.collisionEffect();
        }

    }

    rotate(){
        this.sprite.pivot.x = this.sprite.x+this.sprite.width/2
        this.sprite.pivot.y = this.sprite.y+this.sprite.height/2
        this.sprite.rotation+=ballRotationSpeed;
    }

    checkCollision(){
        /******************************************************************
         * MUNDO - WORLD
         *****************************************************************/
        if(this.container.x < 10 ){
            this.collisionType = "World";
            this.collisionSide = "LeftBorder"
            return true;
        }
        if(this.container.x + this.container.width > WORLD_WIDTH ){
            this.collisionType = "World";
            this.collisionSide = "RightBorder"
            return true;
        }    
        if(this.container.y < 10 ){
            this.collisionType = "World";
            this.collisionSide = "TopBorder"
            return true;
        }
        if(this.container.y+this.container.height > WORLD_HEIGHT ){
            this.collisionType = "World";
            this.collisionSide = "BottomBorder"
            return true;
        }
        /******************************************************************
         * OBJETOS - OBJECTS
         *****************************************************************/
        /* Vou percorrer o array com todos os objetos pegando o ID (Player or Enemy) e o local
         * da colisao*/

        for(let FullObject of objectsList){
            const object = FullObject.sprite;
            //Verifica se esta na area X do objeto
            if(this.container.x+this.container.width>=object.x && this.container.x <= object.x+object.width){
                //Colisao no topo
                if(this.container.y+this.container.height >= object.y && this.container.y < object.y){
                    this.collisionType = FullObject.id;
                    this.collisionSide = "TopBorder"
                    this.checkCollisionPart(object);
                    return true;
                }
                //Colisao no Bottom
                if(this.container.y+this.container.height >= object.y+object.height && this.container.y < object.y+object.height){
                    this.collisionType = FullObject.id;
                    this.collisionSide = "BottomBorder"
                    this.checkCollisionPart(object);
                    return true;
                }
            }

            //Verifica se esta na area Y do objeto
            //Nao implementado

        }


    }


    collisionEffect(){
        if(this.collisionType == "World"){
            if(this.collisionSide == "BottomBorder" || this.collisionSide == "TopBorder" )
                this.dy*=-1;
             else if(this.collisionSide == "LeftBorder" || this.collisionSide == "RightBorder")
                this.dx*=-1;

        }

        else if(this.collisionType == "Player" || this.collisionType == "Enemy"){
            this.dx = this.dy = 1;
            if(this.collisionSide == "TopBorder"){
                if(this.collisionPart == "LeftPart")
                    this.angle = getRandomInt(180+MinAngleVariation,180+MaxAngleVariation);
                else if(this.collisionPart == "RightPart")
                    this.angle = getRandomInt(180-MinAngleVariation,180-MaxAngleVariation);

            }

            else if(this.collisionSide = "BottomBorder"){
                if(this.collisionPart == "LeftPart")
                    this.angle = getRandomInt(0-MinAngleVariation,0-MaxAngleVariation);
                else if(this.collisionPart == "RightPart")
                    this.angle = getRandomInt(0+MinAngleVariation,0+MaxAngleVariation);
                
            
            }


        }

    }


    checkCollisionPart(object){
        if(this.container.x+(this.container.width/2) < object.x + (object.width/2) )
            this.collisionPart = "LeftPart";
        else
            this.collisionPart = "RightPart"
    }





}