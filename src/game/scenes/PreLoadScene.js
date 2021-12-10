import { Scene } from 'phaser'
import test from '@/game/assets/players/test.png'
import box from '@/game/assets/interactive/box.png'

/*
Scene for importing assets to the game
 */
export default class PreLoadScene extends Scene {
    constructor () {
        super({ key: 'BootScene' })
    }
    preload () {
        this.load.image('player', test)
        this.load.image('box', box)
    }
    create () {
        // I think next scene should be something like 'MenuScene'
        this.scene.start('TestScene')
    }
}