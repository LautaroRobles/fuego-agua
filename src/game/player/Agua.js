import Player from "./Player";
const Sprite = Phaser.GameObjects.Sprite;

export default class Agua extends Player {
    constructor(config) {
        super(config);

        this.startUpdate();
    }
    initializeContainer() {
        
        this.createAnimations();

        let head = new Sprite(this.scene, 0, 0, 'agua-cabeza');
        let body = new Sprite(this.scene, 0, 0, 'agua-cuerpo');

        let test = new Sprite(this.scene, 0, 0, 'agua-test');

        this.scene.add.existing(head);
        this.scene.add.existing(body);
        this.scene.add.existing(test);

        head.play('agua-idle-cabeza', true);
        body.play('agua-idle-cuerpo', true);

        this.sprites = [head, body, test];

        super.initializeContainer();
    }

    createAnimations() {
        this.animations = {};

        this.animations.runCabeza = this.animations.runCuerpo = this.scene.anims.create({
            key: 'agua-run-cabeza',
            frames: this.scene.anims.generateFrameNames('agua-cabeza', { prefix: 'correr', suffix: '.png', start: 1, end: 5 }), 
            repeat: -1,
            frameRate: 18
        })
        
        this.animations.runCabeza = this.animations.runCuerpo = this.scene.anims.create({
            key: 'agua-idle-cabeza',
            frames: this.scene.anims.generateFrameNames('agua-cabeza', { prefix: 'frente', suffix: '.png', start: 1, end: 1 }), 
            repeat: -1
        })

        this.animations.runCuerpo = this.scene.anims.create({
            key: 'agua-run-cuerpo',
            frames: this.scene.anims.generateFrameNames('agua-cuerpo', { prefix: 'correr', suffix: '.png', start: 1, end: 6 }), 
            repeat: -1,
            frameRate: 18
        })

        this.animations.idleCuerpo = this.scene.anims.create({
            key: 'agua-idle-cuerpo',
            frames: this.scene.anims.generateFrameNames('agua-cuerpo', { prefix: 'frente', suffix: '.png', start: 1, end: 1 }), 
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
        let test = this.sprites[2];

        let velocityX = this.matter.body.velocity.x;
        let velocityY = this.matter.body.velocity.y;

        // Head angle
        if(this.inputs.isLeftPressed() || this.inputs.isRightPressed()) {
            body.anims.play('agua-run-cuerpo', true);
            head.anims.play('agua-run-cabeza', true);
            head.angle = Math.atan2(velocityY, Math.abs(velocityX)) * 180 / Math.PI * -head.scaleX;
            test.setVisible(false)
        }
        else {
            body.scaleX = 1;
            body.anims.play('agua-idle-cuerpo', true);
            head.angle = 0;
            head.scaleX = 1;
            head.anims.play('agua-idle-cabeza', true);
            test.setVisible(false)
        }

        // Body animation and flipping
        if(this.inputs.isLeftPressed() && (this.controller.onFloor || velocityX < 0)) {
            body.scaleX = 1;
            head.scaleX = 1;
        }
        else if (this.inputs.isRightPressed() && (this.controller.onFloor || velocityX > 0)) {
            body.scaleX = -1;
            head.scaleX = -1;
        }


        super.update(time, delta);
    }

}