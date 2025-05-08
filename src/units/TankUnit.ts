import Phaser from "phaser";
import Unit from "./BaseUnit";

class TankUnit extends Unit {
    protected initStats(): void {
        this.setStats({
            hp: 200,
            attack: 1,
            armor: 2,
            speed: 10,
            range: 10,
            team: this.TEAMS.PLAYER,
        });
    }
}
export default TankUnit;
