import Phaser from "phaser";
import Unit from "./BaseUnit";

class TankUnit extends Unit {
    protected initStats(): void {
        this.setStats({
            hp: 200,
            attack: 5,
            armor: 10,
            speed: 10,
        });
    }
}
export default TankUnit;
