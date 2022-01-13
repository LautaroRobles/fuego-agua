import { Scene } from 'phaser'
import fuegoCuerpo from '@/game/assets/players/fuego/fuego-cuerpo.png'
import fuegoCuerpoJson from '@/game/assets/players/fuego/fuego-cuerpo.json'
import fireHead from '@/game/assets/players/fire-head.png'
import fireBody from '@/game/assets/players/fire-body.png'
import box from '@/game/assets/tilesets/objects/stone.png'
import button from '@/game/assets/tilesets/objects/button.png'
import platform from '@/game/assets/tilesets/objects/platform.png'
import ball from '@/game/assets/tilesets/objects/ball.png'
import baseTileset from '@/game/assets/tilesets/base/base.png'
import bricks from '@/game/assets/backgrounds/bricks.png'

/*
Scene for importing assets to the game
 */
export default class PreLoadScene extends Scene {
    constructor () {
        super({ key: 'BootScene' })
    }
    preload () {
        this.load.image('fuego-cabeza', fireHead)
        this.load.atlas('fuego-cuerpo', fuegoCuerpo, fuegoCuerpoJson)

        //Objects
        this.load.image('box', box)
        this.load.image('button', button)
        this.load.image('platform', platform)
        this.load.image('ball', ball)

        //Load all maps
        this.loadMaps();

        //Map effects
        this.load.image('bricks', bricks)
        this.load.image('base-tileset', baseTileset)
        this.load.glsl({key: 'map-shader', url: './shaders/map.frag'})
        this.load.glsl({key: 'background-shader', url: './shaders/background.frag'})

    }
    create () {
        // I think next scene should be something like 'MenuScene'
        this.scene.start('TestScene')
    }
    loadMaps() {
        const context = require.context('../assets/maps/export', true, /.json$/);
        const all = {};
        context.keys().forEach((key) => {
            const mapKey = key.replace('./', '');
            const map = require(`../assets/maps/export/${mapKey}`);
            const mapName = mapKey.replace('.json', '');

            this.load.tilemapTiledJSON(mapName, map)
        });
    }
}