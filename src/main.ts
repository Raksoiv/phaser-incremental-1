import Phaser from 'phaser';
import TankUnit from './units/TankUnit';
import RangedUnit from './units/RangedUnit';
import EnemyMeleeUnit from './units/EnemyMeleeUnit';
import Unit from './units/BaseUnit';

class GameScene extends Phaser.Scene {
    readonly SPAWN_POSITION = { x: 50, y: 160 };

    private shortcutKeys: { [key: string]: Phaser.Input.Keyboard.Key } = {};
    protected update_list: Unit[] = [];

    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.spritesheet('ranged-1', 'assets/ranged-1.png', { frameWidth: 16, frameHeight: 16 });
        this.load.image('background', 'assets/background.png');
        this.load.image('tank-1', 'assets/tank-1.png');
        this.load.image('melee-enemy-1', 'assets/melee-enemy-1.png');
        this.load.spritesheet('ranged-1-shoot', 'assets/ranged-1-shoot.png', { frameWidth: 16, frameHeight: 16 });
    }

    create() {
        if (this.input.keyboard) {
            this.shortcutKeys = {
                one: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE),
                two: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO),
            };
        }

        this.add.image(160, 120, 'background');

        this.update_list.push(new EnemyMeleeUnit(this, 310, 160, 'melee-enemy-1'));
        this.update_list.push(new EnemyMeleeUnit(this, 300, 160, 'melee-enemy-1'));
        this.update_list.push(new EnemyMeleeUnit(this, 290, 160, 'melee-enemy-1'));
    }

    update(time: number, delta: number) {
        // Input handling
        if (Phaser.Input.Keyboard.JustDown(this.shortcutKeys.one)) {
            const unit = new TankUnit(this, this.SPAWN_POSITION.x, this.SPAWN_POSITION.y, 'tank-1');
            this.update_list.push(unit);
        }
        if (Phaser.Input.Keyboard.JustDown(this.shortcutKeys.two)) {
            const unit = new RangedUnit(this, this.SPAWN_POSITION.x, this.SPAWN_POSITION.y, 'ranged-1');
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
