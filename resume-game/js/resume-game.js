import MainScene from "./MainScene.js";
import TitleScene from "./TitleScene.js";

const config = {
    width:512,
    height:512,
    backgroundColor: '#999999',
    type: Phaser.AUTO,
    parent: 'resume-game',
    scene:[TitleScene,MainScene],
    scale: {
        zoom:1.4
    },
    physics: {
        default: 'matter',
        matter: {
            debug:false,
            gravity:{y:0},
        }
    },
    plugins: {
        scene:[
            {
            plugin: PhaserMatterCollisionPlugin,
            key: 'matterCollision',
            mapping: 'matterCollision',
            }
        ]
    }
}

new Phaser.Game(config);