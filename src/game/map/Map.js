import {Tilemaps} from 'phaser'
export default class Map extends Tilemaps.Tilemap {
    constructor(config) {
        super(config.scene, new Phaser.Tilemaps.MapData());
    }
}