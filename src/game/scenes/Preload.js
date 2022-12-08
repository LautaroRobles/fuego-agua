import { Scene } from 'phaser'
import fuegoCuerpo from '@/game/assets/players/fuego/fuego-cuerpo.png'
import fuegoCuerpoJson from '@/game/assets/players/fuego/fuego-cuerpo.json'
import fuegoCabeza from '@/game/assets/players/fuego/fuego-cabeza.png'
import fuegoCabezaJson from '@/game/assets/players/fuego/fuego-cabeza.json'
import fuego from '../assets/players/fuego/fuego-editor.png'

import aguaCuerpo from '@/game/assets/players/agua/agua-cuerpo.png'
import aguaCuerpoJson from '@/game/assets/players/agua/agua-cuerpo.json'
import aguaCabeza from '@/game/assets/players/agua/agua-cabeza.png'
import aguaCabezaJson from '@/game/assets/players/agua/agua-cabeza.json'
import agua from '../assets/players/agua/agua-editor.png'

import box from '../assets/tilesets/objects/stone.png'
import button from '../assets/tilesets/objects/button.png'
import platform from '../assets/tilesets/objects/platform.png'
import ball from '../assets/tilesets/objects/ball.png'
import pendulum from '../assets/tilesets/objects/pendulum.png'
import leverBase from '../assets/tilesets/objects/lever-base.png'
import leverStick from '../assets/tilesets/objects/lever-stick.png'
import fanSheet from '../assets/tilesets/objects/fan-spritesheet.png'
import fanJson from '../assets/tilesets/objects/fan-spritesheet.json'
import weight from '../assets/tilesets/objects/weight.png'

import baseTileset from '../assets/tilesets/base/base.png'
import backgroundBricks from '../assets/backgrounds/bricks.png'
import backgroundPattern from '../assets/backgrounds/pattern.png'
import backgroundStone from '../assets/backgrounds/stone.png'

import playButton from '../assets/ui/play-button.png'
import mainMenuBackground from '../assets/ui/background-temple.png'

/*
Scene for importing assets to the game
 */
export default class Preload extends Scene {
    constructor () {
        super({ key: 'Preload' })
    }
    preload () {
        // Jugadores
        this.load.atlas('fuego-cabeza', fuegoCabeza, fuegoCabezaJson)
        this.load.atlas('fuego-cuerpo', fuegoCuerpo, fuegoCuerpoJson)
        this.load.image('fuego-test', fuego)
        this.load.atlas('agua-cabeza', aguaCabeza, aguaCabezaJson)
        this.load.atlas('agua-cuerpo', aguaCuerpo, aguaCuerpoJson)
        this.load.image('agua-test', agua)

        //Objects
        this.load.image('box', box)
        this.load.image('button', button)
        this.load.image('platform', platform)
        this.load.image('ball', ball)
        this.load.image('pendulum', pendulum)
        this.load.image('lever-base', leverBase)
        this.load.image('lever-stick', leverStick)
        this.load.atlas('fan', fanSheet, fanJson)
        this.load.image('weight', weight)

        //Load all maps
        this.loadMaps();

        //Map effects
        this.load.image('background-bricks', backgroundBricks)
        this.load.image('background-pattern', backgroundPattern)
        this.load.image('background-stone', backgroundStone)
        this.load.image('base-tileset', baseTileset)
        this.load.glsl({key: 'map-shader', url: './shaders/map.frag.js'})
        this.load.glsl({key: 'background-shader', url: './shaders/background.frag.js'})

        //UI
        this.load.image('play-button', playButton)
        this.load.image('main-menu-background', mainMenuBackground)

    }
    create () {
        // I think next scene should be something like 'MenuScene'
        this.scene.start('MainMenu')
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