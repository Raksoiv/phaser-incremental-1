import Phaser from 'phaser';
import TankUnit from './units/TankUnit';
import RangedUnit from './units/RangedUnit';

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.image('ranged-1', 'assets/ranged-1.png');
        this.load.image('background', 'assets/background.png');
        this.load.image('tank-1', 'assets/tank-1.png');
    }

    create() {
        this.add.image(160, 120, 'background');
        this.add.existing(new TankUnit(this, 200, 152, 'tank-1'));
        this.add.existing(new RangedUnit(this, 100, 152, 'ranged-1'));
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
