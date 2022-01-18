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
        new Map({scene: this, key: 'map2'})
    }
    update(time, delta) {
        super.update(time, delta);
    }
}