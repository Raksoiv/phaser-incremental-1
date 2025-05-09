import Phaser from "phaser";
import Unit from "./BaseUnit";

class RangedUnit extends Unit {
    protected initStats(): void {
        this.setStats({
            hp: 100,
            attack: 2,
            attackSpeed: 1000, // ms
            armor: 0,
            speed: 15,
            range: 50,
            team: this.TEAMS.PLAYER,
        });
    }

    protected die() {
        this.x = (this.scene as Phaser.Scene & { SPAWN_POSITION: { x: number, y: number } }).SPAWN_POSITION.x;
        this.initStats();
    }
}
export default RangedUnit;
