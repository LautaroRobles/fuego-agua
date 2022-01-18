import { Scene } from 'phaser';
import Player from "@/game/player/Player";
import Box from "@/game/objects/Box";
import Fuego from "../player/Fuego";
import Map from "@/game/map/Map";

export default class TestScene extends Scene {
    constructor() {
        super({key: 'TestScene'});
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