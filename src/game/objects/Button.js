const Matter = Phaser.Physics.Matter.Matter;

export default class Button extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene, 0, 0, 'button');
        this.scene = scene;
    }
    // this has to be called after a map.createFromObjects function
    created(map) {
        this.map = map;

        if(this.data)
            this.properties = this.data.list;

        this.activated = false;
        this.progress = 0;
        this.yStart = this.y;

        this.createButtonCollision();
        this.initializeEvents();
    }
    mapLoaded() {
        this.findObjectsToActivate();
    }
    initializeEvents() {
        this.scene.matter.world.on('beforeupdate', (time, delta) => this.beforeUpdate(time, delta));
        this.scene.events.on('update', (time, delta) => this.update(time, delta));
    }
    createButtonCollision() {
        this.matter = this.scene.matter.add.gameObject(this, {isSensor: true, ignoreGravity: true});
        this.matter.body.onCollideActiveCallback = (collision) => this.buttonColliding(collision);
    }
    findObjectsToActivate() {

        this.objectsToActivate = [];

        for(let i = 0; i < this.map.customObjects.length; i++) {
            let object = this.map.customObjects[i];

            if(object.properties && object.properties.activation === this.properties.activates) {
                this.objectsToActivate.push(object);
            }
        }
    }
    buttonColliding(collision) {
        if(collision.bodyA.isStatic)
            return;

        this.activated = true;
    }
    beforeUpdate() {
        this.activated = false;
    }
    update(time, delta) {
        if(this.activated && this.progress < 1) {
            this.progress += delta * 0.01;
        }
        else if(!this.activated && this.progress > 0){
            this.progress -= delta * 0.01;
        }

        if(this.objectsToActivate) {
            this.objectsToActivate.forEach(object => object.activated = this.activated);
        }

        this.y = Phaser.Math.Interpolation.SmoothStep(this.progress, this.yStart, this.yStart + 20);
    }

}