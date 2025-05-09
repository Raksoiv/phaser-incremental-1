import Phaser from "phaser";
import Unit from "./BaseUnit";

class TankUnit extends Unit {
    protected initStats(): void {
        this.setStats({
            hp: 200,
            attack: 1,
            attackSpeed: 2000, // ms
            armor: 2,
            speed: 10,
            range: 10,
            team: this.TEAMS.PLAYER,
        });
    }

    protected die() {
        this.x = (this.scene as Phaser.Scene & { SPAWN_POSITION: { x: number, y: number } }).SPAWN_POSITION.x;
        this.initStats();
    }
}
export default TankUnit;
