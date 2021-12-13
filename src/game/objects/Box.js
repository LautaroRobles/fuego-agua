import PhysicsSprite from "@/game/utils/PhysicsSprite";

export default class Box extends PhysicsSprite {
    constructor(config) {
        config.sprite = 'box';
        super(config);

        this.displayWidth = 50;
        this.scaleY = this.scaleX;

        this.physics.setMass(20);
        this.physics.setFriction(2);
    }
}