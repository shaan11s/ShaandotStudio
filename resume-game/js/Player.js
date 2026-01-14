export default class Player extends Phaser.Physics.Matter.Sprite{
    constructor(data){
        let {scene,x,y,texture,frame} = data;
        super(scene.matter.world,x,y,texture,frame);
        this.scene.add.existing(this);

       // HERE
        const {Body, Bodies} = Phaser.Physics.Matter.Matter;
         var playerCollider = Bodies.circle(this.x,this.y, 12, {isSensor:false, label:'playerCollider'});
         var playerSensor = Bodies.circle(this.x,this.y,24, {isSensor:true, label:'playerSensor'});
        const compoundBody = Body.create({
            parts:[playerCollider,playerSensor],
            frictionAir: .35,
        });
        this.setExistingBody(compoundBody);
    }

static preload(scene){
    scene.load.atlas('main-character', 'assets/images/main-character.png', 'assets/images/main-character_atlas.json');
    scene.load.animation('main-character_anim','assets/images/main-character_anim.json');
}

get velocity() {
    return this.body.velocity;
}

    update(){
        //this.anims.play('main-character_idle', true);
        const speed = 1;
        let playerVelocity = new Phaser.Math.Vector2();
        if(this.inputKeys.left.isDown){
            playerVelocity.x = -1;
        }else if (this.inputKeys.right.isDown){
            playerVelocity.x = 1;
        }else if (this.inputKeys.up.isDown){
            playerVelocity.y = -1;
        }else if (this.inputKeys.down.isDown){
            playerVelocity.y = 1;
        }
        playerVelocity.normalize();
        playerVelocity.scale(speed);
        this.setVelocity(playerVelocity.x,playerVelocity.y);
        if(Math.abs(this.velocity.x)>0.1 || Math.abs(this.velocity.y)>0.1){
            this.anims.play('main-character_walk', true);
        }else {
            this.anims.play('main-character_idle', true);
        }
        }
}