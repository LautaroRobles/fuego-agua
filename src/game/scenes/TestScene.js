import { Scene } from 'phaser';
import Player from "@/game/sprites/player/Player";
import Box from "@/game/sprites/interactive/Box";

export default class TestScene extends Scene {
    constructor() {
        super({key: 'TestScene'});
    }
    create() {
        this.matter.world.setBounds(0, 0, 1200, 900, 32, true, true, false, true);

        new Player({scene: this, x: 400, y: 200})
        new Box({scene: this, x: 200, y: 100})
        new Box({scene: this, x: 200, y: 100})
        new Box({scene: this, x: 200, y: 100})
        new Box({scene: this, x: 200, y: 100})
        new Box({scene: this, x: 200, y: 100})
    }
    update(time, delta) {
        super.update(time, delta);
    }
}