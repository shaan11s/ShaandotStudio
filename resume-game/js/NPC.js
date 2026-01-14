export default class NPC extends Phaser.Physics.Matter.Sprite {
    constructor(data) {
        let { scene, x, y, texture, frame, dialogue } = data;
        super(scene.matter.world, x, y, texture, frame);
        this.scene.add.existing(this);
        this.dialogue = dialogue; // Store dialogue data

        // Define NPC physics body
        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        var npcCollider = Bodies.circle(this.x, this.y, 12, { isSensor: false, label: 'npcCollider' });
        var npcSensor = Bodies.circle(this.x, this.y, 24, { isSensor: true, label: 'npcSensor' });
        const compoundBody = Body.create({
            parts: [npcCollider, npcSensor],
            frictionAir: .35,
        });
        this.setExistingBody(compoundBody);
    }

    static preload(scene) {
        // Preload NPC assets
        scene.load.atlas('npc', 'assets/images/main-character.png', 'assets/images/main-character_atlas.json');
        scene.load.animation('main-character_anim','assets/images/main-character_anim.json');
    }

    update(player) {
        this.anims.play('main-character_idle', true);
        // Check if player is close to the NPC
        const distance = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);
        if (distance < 50) { // Adjust distance threshold as needed
            this.showDialogue();
        }
    }

    showDialogue() {
        // Assuming 'this.scene' is the current Phaser scene
        const dialogueText = this.scene.add.text(this.x, this.y - 50, this.dialogue, {
            font: '7px Arial',
            fill: '#0a0a0a', // Corrected color format
            backgroundColor: '#f0e6e6', // Corrected color format
            padding: {
                x: 6,
                y: 4
            }
        }).setOrigin(0.5);
    
        // Destroy the text after a certain delay (e.g., 3 seconds)
        this.scene.time.delayedCall(3000, () => {
            dialogueText.destroy();
        });
    }
}
