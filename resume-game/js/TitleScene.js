export default class TitleScene extends Phaser.Scene{
    constructor(){
        super({key:"TitleScene"});
    }
    preload() {
        this.load.image('title','assets/images/TitleScreen.png');
    }
    create(){
        this.add.image(256, 256, 'title');

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('MainScene');
        });
    }
}
  