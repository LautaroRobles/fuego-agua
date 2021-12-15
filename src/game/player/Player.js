import PhysicsSprite from "@/game/utils/PhysicsSprite";
import PlayerController from "./PlayerController";

export default class Player extends PhysicsSprite {
    constructor(config) {
        config.sprite = 'firePlayer';
        super(config);

        this.createBody(config);

        this.maxHVel = 3;
        this.acceleration = 0.01;
        this.controller = new PlayerController(this);
    }
    createBody(config) {
        this.scale = 0.25;

        let Bodies = Phaser.Physics.Matter.Matter.Bodies;

        let spriteWidth = this.displayWidth;
        let spriteHeight = this.displayHeight;

        let bodyRect = Bodies.rectangle(spriteWidth / 2, spriteHeight / 2 + spriteWidth / 4, spriteWidth, spriteHeight - spriteWidth / 2, {label: "MainBody", chamfer: {radius: 10}});
        let headCircle = Bodies.circle(spriteWidth / 2, spriteWidth / 2, spriteWidth / 2, {label: "Head"});
        let feetRect = Bodies.rectangle(spriteWidth / 2, spriteHeight, spriteWidth - 4, 2, {label: "Feet"});

        let compoundBody = Phaser.Physics.Matter.Matter.Body.create({
            parts: [ bodyRect, headCircle, feetRect ]
        });

        this.physics.setExistingBody(compoundBody);
        this.physics.x = config.x;
        this.physics.y = config.y;
        this.physics.setFixedRotation(0);
        this.physics.setFriction(0.1, 0, 0);
    }
    // Pre update is called to all objects who are 'this.scene.add.existing(this)'
    preUpdate(time, delta) {
        this.controller.preUpdate(time, delta);
        super.preUpdate(time, delta);
    }
}