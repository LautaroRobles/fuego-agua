import MapElement from "./MapElement";

const Matter = Phaser.Physics.Matter.Matter;
const Sprite = Phaser.GameObjects.Sprite;
const Rectangle = Phaser.GameObjects.Rectangle;

export default class Button extends MapElement {
    constructor(config) {
        super(config);

        this.activated = false;
        this.progress = 0;
        this.yStart = this.transform.position.y;

        this.createButtonSprites();
        this.createButtonCollision();
        this.startUpdate();
    }
    createButtonSprites() {
        let sprite = new Sprite(this.scene, 0, 0, 'button')
        let rectangle = new Rectangle(this.scene, 0, 0, sprite.width - 40, sprite.height - 16, 0xff00ff);

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
        
        let bodyWidth = this.sprites[1].width;
        let bodyHeight = this.sprites[1].height
        let bodyX = this.transform.position.x;
        let bodyY = this.transform.position.y;

        this.matter.setExistingBody(Matter.Bodies.rectangle(
            bodyX, 
            bodyY, 
            bodyWidth, 
            bodyHeight, 
            {ignoreGravity: true, isSensor: true}
        ))
        this.matter.body.onCollideActiveCallback = (collision) => this.buttonColliding(collision);
        this.matter.setCollisionCategory(this.map.collision.objectsSensor);
        this.setMatterScale(this.matter, this.sprites[1]);
        this.matter.angle = this.transform.rotation;
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