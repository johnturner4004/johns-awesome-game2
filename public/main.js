const gameState = {};

class Game extends Phaser.Scene {
  constructor() {
    super('awesome')
  }
  
  preload() {
    this.load.image('tiles', 'resources/Overworld.png');
    this.load.tilemapTiledJSON('overworld', 'resources/johns-awesome-tileset.json');
    this.load.spritesheet('john', 'resources/sprites/John.png', { frameWidth: 32, frameHeight: 32 });
  }
  
  create() {
    gameState.cursors = this.input.keyboard.createCursorKeys();

    gameState.cursors = this.input.keyboard.addKeys(
      {up:Phaser.Input.Keyboard.KeyCodes.W,
      down:Phaser.Input.Keyboard.KeyCodes.S,
      left:Phaser.Input.Keyboard.KeyCodes.A,
      right:Phaser.Input.Keyboard.KeyCodes.D});

    gameState.map = this.make.tilemap({ key: 'overworld' })
    gameState.tileset = gameState.map.addTilesetImage('Overworld', 'tiles')
    
    gameState.grassLayer = gameState.map.createStaticLayer('Grass', gameState.tileset);
    gameState.wallLayer = gameState.map.createStaticLayer('Walls', gameState.tileset);
    gameState.bushLayer = gameState.map.createStaticLayer('Bushes', gameState.tileset);
    gameState.doorLayer = gameState.map.createStaticLayer('Doors', gameState.tileset);
    
    gameState.wallLayer.setCollisionByProperty({ collides: true });
    gameState.bushLayer.setCollisionByProperty({ collides: true });
    gameState.doorLayer.setCollisionByProperty({ collides: true });

    
    const debugMode = true;
    if (debugMode) {
      const debugGraphics = this.add.graphics().setAlpha(0.7);
      gameState.wallLayer.renderDebug(debugGraphics, {
        tileColor: null,
        collidingTileColor: new Phaser.Display.Color(243, 243, 48, 255),
        faceColor: new Phaser.Display.Color(40, 39, 37, 255)
      })
      
      gameState.bushLayer.renderDebug(debugGraphics, {
        tileColor: null,
        collidingTileColor: new Phaser.Display.Color(243, 243, 48, 255),
        faceColor: new Phaser.Display.Color(40, 39, 37, 255)
      })
      
      gameState.doorLayer.renderDebug(debugGraphics, {
        tileColor: null,
        collidingTileColor: new Phaser.Display.Color(243, 243, 48, 255),
        faceColor: new Phaser.Display.Color(40, 39, 37, 255)
      })
    }
    // this.add.image(0, 0, 'overworld').setOrigin(0, 0);
    gameState.player = this.physics.add.sprite(50, 50, 'john').setScale(1);
    
    this.anims.create({
      key: 'walkDown',
      frames: this.anims.generateFrameNumbers('john', {start: 1, end: 3}),
      frameRate: 5,
      yoyo: true,
      repeat: -1
    })
    
    this.anims.create({
      key: 'walkLeft',
      frames: this.anims.generateFrameNumbers('john', {start: 5, end: 7}),
      frameRate: 5,
      yoyo: true,
      repeat: -1
    })
    
    this.anims.create({
      key: 'walkUp',
      frames: this.anims.generateFrameNumbers('john', {start: 9, end: 11}),
      frameRate: 5,
      yoyo: true,
      repeat: -1
    })
    
    this.anims.create({
      key: 'walkRight',
      frames: this.anims.generateFrameNumbers('john', {start: 13, end: 15}),
      frameRate: 5,
      yoyo: true,
      repeat: -1
    })
    
    this.anims.create({
      key: 'faceDown',
      frames: this.anims.generateFrameNumbers('john', {start: 0, end: 0}),
      frameRate: 5,
      repeat: -1
    })
    
    this.anims.create({
      key: 'faceLeft',
      frames: this.anims.generateFrameNumbers('john', {start: 4, end: 4}),
      frameRate: 5,
      repeat: -1
    })
    
    this.anims.create({
      key: 'faceUp',
      frames: this.anims.generateFrameNumbers('john', {start: 8, end: 8}),
      frameRate: 5,
      repeat: -1
    })
    
    this.anims.create({
      key: 'faceRight',
      frames: this.anims.generateFrameNumbers('john', {start:12, end: 12}),
      frameRate: 5,
      repeat: -1
    })
    
    gameState.player.anims.play('faceDown', true);
    this.physics.add.collider(gameState.player, gameState.wallLayer);
  }
  
  update() {
    if (gameState.cursors.down.isDown) {
      gameState.player.anims.play('walkDown', true);
      gameState.player.setVelocityY(100);
      gameState.player.setVelocityX(0);
      gameState.direction = 'down'
    } else if (gameState.cursors.up.isDown) {
      gameState.player.anims.play('walkUp', true);
      gameState.player.setVelocityY(-100);
      gameState.player.setVelocityX(0);
      gameState.direction = 'up'
    } else if (gameState.cursors.right.isDown) {
      gameState.player.anims.play('walkRight', true);
      gameState.player.setVelocityY(0);
      gameState.player.setVelocityX(100);
      gameState.direction = 'right'
    } else if (gameState.cursors.left.isDown) {
      gameState.player.anims.play('walkLeft', true);
      gameState.player.setVelocityY(0);
      gameState.player.setVelocityX(-100);
      gameState.direction = 'left'
    } else {
      gameState.player.setVelocity(0);
      switch (gameState.direction) {
        case 'down':
          gameState.player.anims.play('faceDown');
          break;
        case 'left':
          gameState.player.anims.play('faceLeft');
          break;
        case 'up':
          gameState.player.anims.play('faceUp');
          break;
        case 'right':
          gameState.player.anims.play('faceRight');
          break;
        default:
          gameState.player.anims.play('faceDown');
      }
    }
  }
}

const config = {
  type: Phaser.AUTO,
	width: 400,
	height: 300,
  scale: { zoom: 2 },
  backgroundColor: '#000',
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 }
		}
	},
	scene: [Game]
}

const game = new Phaser.Game(config)