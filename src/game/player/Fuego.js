import Player from "./Player";
const Sprite = Phaser.GameObjects.Sprite;

export default class Fuego extends Player {
    constructor(config) {
        super(config);
    }
    initializeContainer(config) {

        let head = new Sprite(this.scene, 0, -32, 'fire-head');
        let body = new Sprite(this.scene, 0, 32, 'fire-body');

        this.sprites = [head, body];

        super.initializeContainer(config);
    }

    initializePlayerController(config) {

        this.controller.bodyHeight = 128;
        this.controller.bodyWidth = 48;
        this.controller.maxSpeed = 8;
        this.controller.acceleration = 20;
        this.controller.jumpHeight = 18.5;

        super.initializePlayerController(config);
    }

}