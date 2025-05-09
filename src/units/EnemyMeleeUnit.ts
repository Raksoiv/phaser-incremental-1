import Phaser from "phaser";
import Unit from "./BaseUnit";

class EnemyMeleeUnit extends Unit {
    protected initStats(): void {
        this.setStats({
            hp: 10,
            attack: 10,
            attackSpeed: 1000, // ms
            armor: 0,
            speed: -15,
            range: 10,
            team: this.TEAMS.ENEMY,
        });
    }
}
export default EnemyMeleeUnit;
