import Phaser from "phaser";

class Unit extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        this.y = y - this.displayHeight / 2;
        scene.add.existing(this);
        this.initStats();
    }

    protected initStats(): void {
        this.setStats({
            hp: 100,
            attack: 10,
            armor: 5,
            speed: 1,
        })
    }

    protected setStats(stats: { hp: number; attack: number; armor: number; speed: number }) {
        this.setData('stats', stats);
    }

    protected die() {
        console.log(`Unit has died ${this}`);
        this.destroy();
    }

    getStats() {
        return {
            hp: this.getData('stats').hp,
            attack: this.getData('stats').attack,
            armor: this.getData('stats').armor,
            speed: this.getData('stats').speed,
        };
    }

    takeDamage(damage: number) {
        const armor = this.getStats().armor;
        this.getStats().hp -= Math.max(damage - armor, 0);
        if (this.getStats().hp <= 0) {
            this.die();
        }
    }

    update(time: number, delta: number) {
        this.x += this.getStats().speed;
    }
}

export default Unit;
