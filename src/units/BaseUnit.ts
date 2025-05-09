import Phaser from "phaser";

class Unit extends Phaser.GameObjects.Sprite {
    protected readonly TEAMS = {
        PLAYER: 0, // Default team
        ENEMY: 1,
    }

    private target: Unit | null = null;
    private lastAttackTime: number = 0;
    private originalTint: number;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        this.y = y - this.displayHeight / 2;
        this.originalTint = this.tint;
        scene.add.existing(this);

        this.anims.create({
            key: 'walk',
            frames: [
                { key: texture, frame: 0 },
                { key: texture, frame: 1 },
                { key: texture, frame: 2 },
                { key: texture, frame: 3 },
            ],
            frameRate: 4,
            repeat: -1,
        });
        this.anims.create({
            key: 'aim',
            frames: [
                { key: texture, frame: 4 },
            ],
            frameRate: 4,
            repeat: -1,
        });
        this.anims.create({
            key: 'shoot',
            frames: [
                { key: texture, frame: 5 },
                { key: texture, frame: 6 },
            ],
            frameRate: 20,
            repeat: 0,
        });

        this.on('animationcomplete', (currentAnim: Phaser.Animations.Animation) => {
            if (currentAnim.key === 'shoot') {
                this.play('aim', true);
            }
        });

        this.initStats();
    }

    private findTarget() {
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

    private getStats() {
        const stats = this.getData('stats');
        return {
            hp: stats.hp,
            attack: stats.attack,
            attackSpeed: stats.attackSpeed,
            armor: stats.armor,
            speed: stats.speed,
            range: stats.range,
            team: stats.team,
        };
    }

    private takeDamage(damage: number) {
        const stats = this.getStats();
        const armor = stats.armor;
        this.setData('stats', {
            ...stats,
            hp: stats.hp - Math.max(damage - armor, 0),
        });

        if (this.getStats().hp <= 0) {
            this.die();
            return;
        }

        this.blink();
    }

    private blink() {
        this.setTint(0xff0000);
        this.scene.time.delayedCall(100, () => {
            this.setTint(this.originalTint);
        });
    }

    private handleAnimations(time: number) {
        if (this.target && time > this.lastAttackTime + this.getStats().attackSpeed) {
            this.play('shoot', true);
        } else if (this.target && this.anims.currentAnim?.key === 'walk') {
            this.play('aim', true);
        } else if (!this.target) {
            this.play('walk', true);
        }
    }

    protected die() {
        const updateList = (this.scene as Phaser.Scene & { update_list: Unit[] }).update_list;
        const index = updateList.indexOf(this);
        if (index > -1) {
            updateList.splice(index, 1);
        }
        this.destroy();
    }

    protected initStats(): void {
        this.setStats({
            hp: 100,
            attack: 10,
            attackSpeed: 1, // ms
            armor: 5,
            speed: 1,
            range: 100,
            team: this.TEAMS.PLAYER,
        })
    }

    protected setStats(stats: { [key: string]: number }) {
        this.setData('stats', stats);
    }

    update(time: number, delta: number) {
        this.findTarget();
        this.handleAnimations(time);

        if (this.target && time > this.lastAttackTime + this.getStats().attackSpeed) {
            this.lastAttackTime = time;
            this.target.takeDamage(this.getStats().attack);
        } else if (!this.target) {
            this.x += this.getStats().speed * delta * 0.001;
        }
    }
}

export default Unit;
