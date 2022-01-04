import PhysicsSprite from "@/game/utils/PhysicsSprite";

export default class Box extends PhysicsSprite {
    constructor(config) {
        config.sprite = 'box';
        super(config);

        this.displayWidth = 128;
        this.scaleY = this.scaleX;

        this.physics.setMass(128);
        this.physics.setFriction(16);

        this.setDepth(1);
    }
}