import Controller from "@/game/utils/Controller";
import Phaser from 'phaser'

export default class PlayerController {
    constructor(player) {
        this.player = player;
        this.physics = player.physics;
        this.input = player.scene.input;
        this.controller = new Controller(this.input);

        this.onFloor = false;

        this.configCollisions();
    }
    configCollisions() {
        this.physics.body.parts[3].onCollideActiveCallback = (collision) => this.collisionFeetStart(collision)
        this.physics.body.parts[3].onCollideEndCallback = (collision) => this.collisionFeetExit(collision)
    }
    collisionFeetStart(collision) {
        this.onFloor = true
    }
    collisionFeetExit(collision) {
        this.onFloor = false
    }
    preUpdate(time, delta) {
        if(this.controller.isRightPressed()) {
            this.physics.applyForce(new Phaser.Math.Vector2(this.player.acceleration, 0));
        }
        if(this.controller.isLeftPressed()) {
            this.physics.applyForce(new Phaser.Math.Vector2(-this.player.acceleration, 0));
        }
        if(this.controller.isUpPressed() && this.onFloor) {
            this.physics.setVelocityY(-7);
        }

        if(Math.abs(this.physics.body.velocity.x) > this.player.maxHVel) {
            this.physics.setVelocityX(this.player.maxHVel * Math.sign(this.physics.body.velocity.x));
        }
    }
}