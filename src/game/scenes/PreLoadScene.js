import { Scene } from 'phaser'
import test from '@/game/assets/players/test.png'
import fireHead from '@/game/assets/players/fire-head.png'
import fireBody from '@/game/assets/players/fire-body.png'
import box from '@/game/assets/interactive/box.png'
import bricksTileset from '@/game/assets/tilesets/bricks.png'
import baseTileset from '@/game/assets/tilesets/base.png'
import testMap from '@/game/assets/maps/level-test.json'
import bricks from '@/game/assets/maps/backgrounds/bricks.png'

/*
Scene for importing assets to the game
 */
export default class PreLoadScene extends Scene {
    constructor () {
        super({ key: 'BootScene' })
    }
    preload () {
        this.load.image('player', test)
        this.load.image('fire-head', fireHead)
        this.load.image('fire-body', fireBody)
        this.load.image('box', box)
        this.load.tilemapTiledJSON('test', testMap)
        this.load.image('bricks-tileset', bricksTileset)
        this.load.image('base-tileset', baseTileset)
        this.load.image('bricks', bricks)
        this.load.glsl({key: 'map-shader', url: 'https://play.conlatoso.com/fuego-agua-shader/map.frag'})
    }
    create () {
        // I think next scene should be something like 'MenuScene'
        this.scene.start('TestScene')
    }
}