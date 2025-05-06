import Phaser from 'phaser';
import TankUnit from './units/TankUnit';
import RangedUnit from './units/RangedUnit';

class GameScene extends Phaser.Scene {
    private update_list: Phaser.GameObjects.Sprite[] = [];

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
        this.update_list.push(new TankUnit(this, 200, 160, 'tank-1'));
        this.update_list.push(new RangedUnit(this, 100, 160, 'ranged-1'));
    }

    update(time: number, delta: number) {
        for (const unit of this.update_list) {
            unit.update(time, delta);
        }
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
