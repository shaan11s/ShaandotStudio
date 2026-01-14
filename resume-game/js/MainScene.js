import Player from "./Player.js";
import NPC from "./NPC.js"; 

export default class MainScene extends Phaser.Scene {
    constructor(){
        super("MainScene");
    }

    preload() {
       Player.preload(this);
       NPC.preload(this);
       this.load.image('tiles','assets/images/[Base]BaseChip_pipo.png');
       this.load.tilemapTiledJSON('map','assets/images/resume-map.json')
    }

    create(){
        const map = this.make.tilemap({key:'map'})

        //sanity check
        //this.add.image(0,0,'tiles');
        const tileset = map.addTilesetImage('[Base]BaseChip_pipo', 'tiles', 32,32,0,0);
        const floorLayer = map.createLayer('Tile Layer 1', tileset, 0,0); 
        const worldLayer = map.createLayer('Tile Layer 2', tileset, 0,0); 
        //create collision bounds on tilemap
        worldLayer.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(worldLayer);
        //COLOR AND COLLLIDER DEBUG LINE BELOW
        const debugGraphics = this.add.graphics().setAlpha(0.75);
        // worldLayer.renderDebug(debugGraphics, {
        //   tileColor: null, // Color of non-colliding tiles
        //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        //   faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        // })
        
        //test
        // map.createStaticLayer('Tile Layer 2', tileset, 0,0);
        //console.log("create");
        this.player = new Player({scene:this, x:70,y:70, texture:'main-character', frame:'merchant_idle_1'});
        this.player.setFixedRotation();
        this.player.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        })
        //HERE
        //this.physics.add.collider(player, floorLayer);
         // Create the NPC
         this.soccer_player = new NPC({ scene: this, x: 380, y: 430, texture: 'npc', frame: 'npc_frame', dialogue: 'Shaan used to play for Liverpool USA soccer!'  }); // Adjust position and texture/frame as needed
         this.professor_UTA = new NPC({ scene: this, x: 275, y: 300, texture: 'npc', frame: 'npc_frame', dialogue: 'Shaan was one of our favorite students!\n He left UTA with a GPA of 3.6!'  }); // Adjust position and texture/frame as needed
         this.gator = new NPC({ scene: this, x: 85, y: 464, texture: 'npc', frame: 'npc_frame', dialogue: 'Shaan? \nYea, we have a marketing company together. \nWe are working on a logo for a cumby.'  }); // Adjust position and texture/frame as needed
         this.Lisa = new NPC({ scene: this, x: 455, y: 330, texture: 'npc', frame: 'npc_frame', dialogue: 'OMG I miss Shaan! \nHe used to work here at ANMBF!!'  }); // Adjust position and texture/frame as needed
         this.cielo = new NPC({ scene: this, x: 85, y: 330, texture: 'npc', frame: 'npc_frame', dialogue: 'Shaan loves Spanish and is\n curently the Treasurer of the Spanish Club at UTD!'  }); // Adjust position and texture/frame as needed
         this.professor_UTD = new NPC({ scene: this, x: 435, y: 130, texture: 'npc', frame: 'npc_frame', dialogue: 'Shaan started his journey here at UTD! \n He graduated with a degree in marketing!'  }); // Adjust position and texture/frame as needed
         this.alvi = new NPC({ scene: this, x: 275, y: 147, texture: 'npc', frame: 'npc_frame', dialogue: 'Hello traveler! Shaan is currently a \n grad student here at UTD\n for COMPUTER SCIENCE!!' }); // Adjust position and texture/frame as needed
         
    }
    update(){
        this.player.update();
        this.soccer_player.update(this.player);
        this.professor_UTA.update(this.player)
        this.gator.update(this.player)
        this.Lisa.update(this.player)
        this.cielo.update(this.player)
        this.professor_UTD.update(this.player)
        this.alvi.update(this.player)
    }
    }
