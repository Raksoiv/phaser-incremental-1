import Phaser from "phaser";
import Unit from "./BaseUnit";

class RangedUnit extends Unit {
    protected initStats(): void {
        this.setStats({
            hp: 100,
            attack: 10,
            armor: 5,
            speed: 1,
        });
    }
}
export default RangedUnit;
