const Matter = Phaser.Physics.Matter.Matter;
import Inputs from '@/game/utils/Inputs.js';


export default class Player {
    constructor(config) {
        this.scene = config.scene;
        this.sprites = undefined;
        this.controller = {
            bodyHeight: undefined,
            bodyWidth: undefined,
            playerBody: null,

            sensor: {
                ground: null,
                left: null,
                right: null,
            },
            blocked: {
                left: false,
                right: false
            },
            onFloor: false,

            speed: 0,
            acceleration: undefined,
            maxSpeed: undefined,
            jumpHeight: undefined,
        };

        this.initializeContainer(config);
        this.initializeInputs(config);
        this.initializePlayerController(config);
        this.initializeEvents(config);
        this.initializeCollisions(config);
    }
    initializeContainer(config) {
        let x = config.x;
        let y = config.y;

        this.container = this.scene.add.container(x, y, this.sprites);
    }
    initializeInputs(config) {
        this.inputs = new Inputs(this.scene);
    }
    initializePlayerController(config) {
        let x = config.x;
        let y = config.y;

        let w = this.controller.bodyWidth;
        let h = this.controller.bodyHeight;

        this.matter = this.scene.matter.add.gameObject(this.container);

        this.controller.playerBody = Matter.Bodies.rectangle(x, y, w, h, { chamfer: { radius: w / 2} });
        this.controller.sensor.ground = Matter.Bodies.rectangle(x, y + h / 2, 20, 10, { isSensor: true });
        this.controller.sensor.left = Matter.Bodies.rectangle(x - w / 2, y, 20, h / 2, { isSensor: true });
        this.controller.sensor.right = Matter.Bodies.rectangle(x + w / 2, y, 20, h / 2, { isSensor: true });

        let compoundBody = Matter.Body.create({
            parts: [
                this.controller.playerBody,
                this.controller.sensor.ground, this.controller.sensor.left, this.controller.sensor.right
            ],
            friction: 0.2,
            restitution: 0.05
        });

        this.matter.setExistingBody(compoundBody);
        this.matter.setFixedRotation();

        console.log(this);
    }

    initializeEvents(config) {
        this.scene.matter.world.on('beforeupdate', (time, delta) => this.beforeUpdate(time, delta));
        this.scene.events.on('update', (time, delta) => this.update(time, delta));
    }

    initializeCollisions(config) {
        this.controller.sensor.right.onCollideActiveCallback = (collision) => {
            if(collision.bodyA.isStatic || collision.bodyB.isStatic) {
                this.controller.blocked.right = true;
            }
        };
        this.controller.sensor.left.onCollideActiveCallback = (collision) => {
            if(collision.bodyA.isStatic || collision.bodyB.isStatic) {
                this.controller.blocked.left = true;
            }
        };
        this.controller.sensor.ground.onCollideActiveCallback = (collision) => {
            this.controller.onFloor = true;
        };
    }

    move(time, delta, direction) {
        let deltaSeconds = delta / 1000;
        let speed = this.controller.speed;

        speed += this.controller.acceleration * deltaSeconds * direction;

        if(Math.abs(speed) > this.controller.maxSpeed) {
            speed = this.controller.maxSpeed * direction;
        }

        this.controller.speed = speed;
    }

    stop(time, delta) {
        let deltaSeconds = delta / 1000;
        let speed = this.controller.speed;

        if(Math.abs(speed) > delta / 10) {
            speed -= this.controller.acceleration * deltaSeconds * Math.sign(speed);
        }
        else {
            speed = 0;
        }

        this.controller.speed = speed;
    }

    beforeUpdate(time, delta) {
        this.controller.blocked.right = false;
        this.controller.blocked.left = false;
        this.controller.onFloor = false;
    }

    update(time, delta) {
        if(this.inputs.isLeftPressed()) {
            this.move(time, delta, -1);
        }
        else if(this.inputs.isRightPressed()) {
            this.move(time, delta, 1);
        }
        else if(!this.controller.onFloor){
            this.stop(time, delta);
        }
        else {
            this.controller.speed = this.matter.body.velocity.x;
        }

        if(this.controller.blocked.left) {
            this.controller.speed = Phaser.Math.Clamp(this.controller.speed, 1, this.controller.maxSpeed);
        }
        if(this.controller.blocked.right) {
            this.controller.speed = Phaser.Math.Clamp(this.controller.speed, -this.controller.maxSpeed, -1);
        }

        this.matter.setVelocityX(this.controller.speed);

        if(this.inputs.isUpPressed() && this.controller.onFloor) {
            this.matter.setVelocityY(-this.controller.jumpHeight);
        }
    }
}