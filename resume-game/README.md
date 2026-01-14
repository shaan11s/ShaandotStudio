# resumeGame
Resume Game V1.0

This is a game created with Phaser3 to promote myself through an interactive resume experience!

This game allows the user to use keyboard keys 'WASD' and 'space' to navigate a small world and interact with NPCs that each know a little about Shaan.

A world was created with a tilemap featuring two layers, one which formed the background, and one which formed the structures (houses, plants, terrain). 
The player was allowed to walk on layer 1, the background, but not layer 2. This created a realistic experience like feeling for the user. 

The player object was animated using a series of frames. A JSON file as well as a standard set of PNGs were used together to create the animation. 
NPC's for version 1 all have the same appearance as the player object just because of the sheer time it would take to design each frame for each NPC. 
Expect this update to come along shortly.

Dialogue boxes were essential for the game to be of any use, each featuring a small bit of information about the main character.
The dialogue boxes reveal themselves when the player is a certain distance from the NPC, and dissapears once the player has left that range, 3 seconds after.
It is possible using Phaser 3 matter physics to move the NPCs themselves with the character. 
Dialogue boxes still work on the moved player, and even follow the NPC as it is being moved. 

Expect design updates before function updates, including an easy to read font, more pleasing dialogue box styles, as well as unique NPC sprites. 
Following, an implementation of buildings interiors would be priority. 

BLOG POST:
Phaser.js is a powerful framework for creating interactive games in JavaScript, offering a robust set of tools for game development. In this blog post, we'll take a closer look and see the creation of a game scene using Phaser, complete with player character movement and non-player character (NPC) interaction.

Preloading: The preload() function is used to load assets such as images, spritesheets, and tilemaps before they are used in the game. Here, the player and NPC classes are preloaded along with tileset images and a Tiled JSON map.

Creating the Scene: In the create() function, the game map is created using a Tiled JSON map. Tile layers are added to the scene, including one for the floor and one for the world. Collision properties are set for the world layer tiles to enable collision detection.

Player and NPC Initialization: The player character is initialized using the Player class, which handles player movement and input. NPCs are also initialized with their positions, textures, frames, and dialogue.

Updating the Scene: The update() function is called every frame. Here, the player and NPCs are updated accordingly. For example, the player's movement is updated, and NPC behavior may change based on player interaction.

In the realm of game development, creating non-player characters (NPCs) that engage with the player adds depth and immersion to the gaming experience. With Phaser.js, developers can craft dynamic NPCs that interact with players in various ways. 

Constructor: The constructor initializes the NPC object with the provided data, including its position, texture, frame, and dialogue. It also sets up the physics body for the NPC using Matter.js.

Preloading: The preload() static method is responsible for preloading the assets required for the NPC, such as its texture and animation data.

Update Function: The update() method is called every frame to handle NPC behavior. Here, it plays the NPC's idle animation and checks the distance between the NPC and the player. If the player is within a certain range (50 pixels in this case), the NPC's dialogue is displayed.

Show Dialogue Function: The showDialogue() method creates a text object above the NPC with its dialogue. It also sets a timer to destroy the text after a certain delay, enhancing the user experience by providing temporary dialogue feedback.

