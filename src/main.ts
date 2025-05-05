import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.image('ranged-1', 'assets/ranged-1.png');
    }

    create() {
        this.add.image(160, 120, 'ranged-1');
        this.cameras.main.setBackgroundColor('#000000');
    }

    update() {
        // Your custom physics update logic will go here
    }
}

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 320,
    height: 240,
    zoom: 2,
    pixelArt: true,
    scene: [GameScene],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    parent: 'phaser-container'
};

new Phaser.Game(config);