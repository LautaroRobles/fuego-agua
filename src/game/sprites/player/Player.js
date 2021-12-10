import PhysicsSprite from "@/game/sprites/PhysicsSprite";
import PlayerController from "./PlayerController";

export default class Player extends PhysicsSprite {
    constructor(config) {
        config.sprite = 'player';
        super(config);

        this.maxHVel = 3;
        this.acceleration = 0.05;
        this.controller = new PlayerController(this);

        let Bodies = Phaser.Physics.Matter.Matter.Bodies;

        let rectA = Bodies.rectangle(32, 48, 64, 96);
        let circleA = Bodies.circle(32, 0, 32);

        let compoundBody = Phaser.Physics.Matter.Matter.Body.create({
            parts: [ rectA, circleA ]
        });

        this.physics.setExistingBody(compoundBody);

        console.log(this.physics);

        this.physics.x = config.x;
        this.physics.y = config.y;

        this.physics.setFixedRotation(0);
    }
    // Pre update is called to all objects who are 'this.scene.add.existing(this)'
    preUpdate(time, delta) {
        this.controller.preUpdate(time, delta);
        super.preUpdate(time, delta);
    }
}