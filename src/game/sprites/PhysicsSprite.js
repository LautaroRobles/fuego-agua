export default class PhysicsSprite extends Phaser.GameObjects.Sprite {
    constructor(config) {
        // create Sprite
        super(config.scene, config.x, config.y, config.sprite);
        // Add this sprite to scene
        this.scene.add.existing(this);
        // Add this sprite to matter physics engine
        this.physics = this.scene.matter.add.gameObject(this);
        // Now this class has this.physics to manipulate physics
    }
}