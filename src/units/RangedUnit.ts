import Phaser from "phaser";
import Unit from "./BaseUnit";

class RangedUnitt extends Unit {
    protected initStats(): void {
        this.setStats({
            hp: 100,
            attack: 10,
            armor: 5,
            speed: 1,
        });
    }

    update() {
        // Custom update logic for the ranged unit
    }
}
export default RangedUnitt;
