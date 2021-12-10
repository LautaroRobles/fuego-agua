import PhysicsSprite from "@/game/sprites/PhysicsSprite";

export default class Box extends PhysicsSprite {
    constructor(config) {
        config.sprite = 'box';
        super(config);

        this.displayWidth = 50;
        this.scaleY = this.scaleX;

        this.physics.setMass(100);
        this.physics.setFriction(2);
    }
}