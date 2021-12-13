import { Scene } from 'phaser';
import Player from "@/game/player/Player";
import Box from "@/game/objects/Box";

export default class TestScene extends Scene {
    constructor() {
        super({key: 'TestScene'});
    }
    create() {

        new Player({scene: this, x: 400, y: 200})
        new Box({scene: this, x: 200, y: 100})
        new Box({scene: this, x: 200, y: 100})
        new Box({scene: this, x: 200, y: 100})
        new Box({scene: this, x: 200, y: 100})
        new Box({scene: this, x: 200, y: 100})


        let map = this.make.tilemap({key: 'test'});
        let tileset = map.addTilesetImage('bricks', 'bricks-tileset');
        let layer = map.createLayer(0, tileset, 0, 0);

        // Set up the layer to have matter bodies. Any colliding tiles will be given a Matter body.
        map.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(layer);
        this.matter.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels, 32, true, true, false, true);
    }
    update(time, delta) {
        super.update(time, delta);
    }
}