import Phaser from "phaser";
import Unit from "./BaseUnit";

class RangedUnit extends Unit {
    protected initStats(): void {
        this.setStats({
            hp: 100,
            attack: 2,
            armor: 0,
            speed: 15,
            range: 50,
            team: this.TEAMS.PLAYER,
        });
    }
}
export default RangedUnit;
