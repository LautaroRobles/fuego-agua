import { Scene } from 'phaser'
import test from '@/game/assets/players/test.png'
import firePlayer from '@/game/assets/players/fire.png'
import box from '@/game/assets/interactive/box.png'
import bricksTileset from '@/game/assets/tilesets/bricks.png'
import testMap from '@/game/assets/maps/level-test.json'

/*
Scene for importing assets to the game
 */
export default class PreLoadScene extends Scene {
    constructor () {
        super({ key: 'BootScene' })
    }
    preload () {
        this.load.image('player', test)
        this.load.image('firePlayer', firePlayer)
        this.load.image('box', box)
        this.load.tilemapTiledJSON('test', testMap);
        this.load.image('bricks-tileset', bricksTileset);
    }
    create () {
        // I think next scene should be something like 'MenuScene'
        this.scene.start('TestScene')
    }
}