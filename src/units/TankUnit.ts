import Phaser from "phaser";
import Unit from "./BaseUnit";

class TankUnit extends Unit {
    protected initStats(): void {
        this.setStats({
            hp: 200,
            attack: 5,
            armor: 10,
            speed: 0.5,
        });
    }

    update() {
        // Custom update logic for the tank unit
    }
}
export default TankUnit;
