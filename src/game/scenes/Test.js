import { Scene } from 'phaser';
import Map from "@/game/map/Map";

export default class Test extends Scene {
    constructor() {
        super({key: 'Test'});
    }
    create() {
        let playerConfig = {
            fuego: 1,
            agua: 2
        }

        new Map({scene: this, key: 'map2', playerConfig: playerConfig})
    }
    update(time, delta) {
        super.update(time, delta);
    }
}