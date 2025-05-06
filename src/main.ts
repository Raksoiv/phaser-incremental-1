import Phaser from 'phaser';
import TankUnit from './units/TankUnit';
import RangedUnit from './units/RangedUnit';

class GameScene extends Phaser.Scene {
    private update_list: Phaser.GameObjects.Sprite[] = [];
    private shortcutKeys: { [key: string]: Phaser.Input.Keyboard.Key } = {};

    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.image('ranged-1', 'assets/ranged-1.png');
        this.load.image('background', 'assets/background.png');
        this.load.image('tank-1', 'assets/tank-1.png');
    }

    create() {
        if (this.input.keyboard) {
            this.shortcutKeys = {
                one: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE),
                two: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO),
            };
        }

        this.add.image(160, 120, 'background');
    }

    update(time: number, delta: number) {
        // Input handling
        if (Phaser.Input.Keyboard.JustDown(this.shortcutKeys.one)) {
            const unit = new TankUnit(this, 50, 160, 'tank-1');
            this.update_list.push(unit);
        }
        if (Phaser.Input.Keyboard.JustDown(this.shortcutKeys.two)) {
            const unit = new RangedUnit(this, 50, 160, 'ranged-1');
            this.update_list.push(unit);
        }

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
