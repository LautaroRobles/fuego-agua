const Matter = Phaser.Physics.Matter.Matter;
const Sprite = Phaser.GameObjects.Sprite;
const Rectangle = Phaser.GameObjects.Rectangle;

export default class Button {
    constructor(config) {
        this.scene = config.scene;
        this.config = config;
        this.map = config.map;
        this.properties = config.properties;

        this.activated = false;
        this.progress = 0;
        this.yStart = this.config.y - this.config.height / 2;

        this.createButtonSprites();
        this.createButtonCollision();
        this.initializeEvents();
    }
    createButtonSprites() {
        let rectangle = new Rectangle(this.scene, 0, 0, this.config.width - 32, this.config.height - 16, 0xff00ff);
        let sprite = new Sprite(this.scene, 0, 0, 'button')

        sprite.scaleX = this.config.width * 1/sprite.width;
        sprite.scaleY = this.config.height * 1/sprite.height;

        this.sprites = [rectangle, sprite];

        this.container = this.scene.add.container(0, 0, this.sprites);
    }
    mapLoaded() {
        // change rectangle color to that of the thing this activates
        //console.log(this.sprites);
        this.map.customObjects.forEach(object => {
            if(object.properties && object.properties.activationID === this.properties.activates) {
                let color = object.properties.color;
                // remove alpha
                color = color.substring(3);
                color = Number(`0x${color}`);

                this.sprites[0].fillColor = color;
            }
        })
    }
    
    createButtonCollision() {
        this.matter = this.scene.matter.add.gameObject(this.container);
        
        let bodyWidth = this.config.width;
        let bodyHeight = this.config.height;
        let bodyX = this.config.x + this.config.width / 2;
        let bodyY = this.config.y - this.config.height / 2;

        this.matter.setExistingBody(Matter.Bodies.rectangle(
            bodyX, 
            bodyY, 
            bodyWidth, 
            bodyHeight, 
            {ignoreGravity: true, isSensor: true}
        ))
        this.matter.body.onCollideActiveCallback = (collision) => this.buttonColliding(collision);
    }
    initializeEvents() {
        this.scene.matter.world.on('beforeupdate', (time, delta) => this.beforeUpdate(time, delta));
        this.scene.events.on('update', (time, delta) => this.update(time, delta));
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

        this.container.y = Phaser.Math.Interpolation.SmoothStep(this.progress, this.yStart, this.yStart + 20);
    }

}