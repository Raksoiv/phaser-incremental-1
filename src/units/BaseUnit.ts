import Phaser from "phaser";

class Unit extends Phaser.GameObjects.Sprite {
    protected readonly TEAMS = {
        PLAYER: 0, // Default team
        ENEMY: 1,
    }

    protected target: Unit | null = null;

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
            range: 100,
            team: this.TEAMS.PLAYER,
        })
    }

    protected setStats(stats: { hp: number; attack: number; armor: number; speed: number; range: number; team: number }) {
        this.setData('stats', stats);
    }

    protected die() {
        const updateList = (this.scene as Phaser.Scene & { update_list: Unit[] }).update_list;
        const index = updateList.indexOf(this);
        if (index > -1) {
            updateList.splice(index, 1);
        }
        this.destroy();
    }

    protected findTarget() {
        const units = (this.scene as Phaser.Scene & { update_list: Unit[] }).update_list;
        this.target = units
            .filter((unit) =>
                unit !== this &&
                unit.getData('stats').team !== this.getData('stats').team &&
                unit.active &&
                Math.abs(this.x - unit.x) <= this.getData('stats').range
            )
            .reduce((closest: Unit | null, unit) => {
                const distance = Math.abs(this.x - unit.x);
                return !closest || distance < Math.abs(this.x - closest.x) ? unit : closest;
            }, null);
    }

    getStats() {
        const stats = this.getData('stats');
        return {
            hp: stats.hp,
            attack: stats.attack,
            armor: stats.armor,
            speed: stats.speed,
            range: stats.range,
            team: stats.team,
        };
    }

    takeDamage(damage: number) {
        console.log(`Unit took damage: ${damage}`);
        const stats = this.getStats();
        const armor = stats.armor;
        this.setData('stats', {
            ...stats,
            hp: stats.hp - Math.max(damage - armor, 0),
        });

        console.log(`Unit Stats: ${JSON.stringify(this.getStats())}`);

        if (this.getStats().hp <= 0) {
            this.die();
        }
    }

    update(time: number, delta: number) {
        this.findTarget();

        if (this.target) {
            this.target.takeDamage(this.getStats().attack);
        } else {
            this.x += this.getStats().speed * delta * 0.001;
        }
    }
}

export default Unit;
