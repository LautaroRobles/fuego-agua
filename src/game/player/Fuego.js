import Player from "./Player";
const Sprite = Phaser.GameObjects.Sprite;

export default class Fuego extends Player {
    constructor(config) {
        super(config);
    }
    initializeContainer(config) {
        
        this.createAnimations();

        let head = new Sprite(this.scene, 0, -32, 'fuego-cabeza');
        let body = new Sprite(this.scene, 0, 0, 'fuego-cuerpo');

        this.scene.add.existing(head);
        this.scene.add.existing(body);

        body.play('idle', true);

        this.sprites = [head, body];

        super.initializeContainer(config);
    }

    createAnimations() {
        this.animations = {};

        this.animations.run = this.scene.anims.create({
            key: 'run',
            frames: this.scene.anims.generateFrameNames('fuego-cuerpo', { prefix: 'correr', suffix: '.png', start: 1, end: 6 }), 
            repeat: -1,
            frameRate: 18
        })

        this.animations.idle = this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNames('fuego-cuerpo', { prefix: 'frente', suffix: '.png', start: 1, end: 1 }), 
            repeat: -1,
        })
    }

    initializePlayerController(config) {

        this.controller.bodyHeight = 128;
        this.controller.bodyWidth = 48;
        this.controller.maxSpeed = 8;
        this.controller.acceleration = 20;
        this.controller.jumpHeight = 18.5;

        super.initializePlayerController(config);
    }

    update(time, delta) {

        let head = this.sprites[0];
        let body = this.sprites[1];

        let velocityX = this.matter.body.velocity.x;
        let velocityY = this.matter.body.velocity.y;

        // Head angle
        if(this.inputs.isLeftPressed() || this.inputs.isRightPressed()) {
            body.anims.play('run', true);
            head.angle = Math.atan2(velocityY, velocityX) * 180 / Math.PI;
        }

        // Body animation and flipping
        if(this.inputs.isLeftPressed()) {
            body.scaleX = 1;
        }
        else if (this.inputs.isRightPressed()) {
            body.scaleX = -1;
        }
        else {
            body.scaleX = 1;
            body.anims.play('idle', true);
            head.angle = 0;
        }


        super.update(time, delta);
    }

}