import MapElement from "./MapElement";

const Matter = Phaser.Physics.Matter.Matter;
const Sprite = Phaser.GameObjects.Sprite;
const Rectangle = Phaser.GameObjects.Rectangle;

export default class Platform extends MapElement{
    constructor(config) {
        super(config);

        this.progress = 0;
        this.activated = true;
        this.xStart = this.transform.x;
        this.yStart = this.transform.y;
        this.angleStart = this.config.rotation;
        this.angleHelper = this.config.rotation;

        //this.activators = [];

        this.createPlatformSprites();
        this.createPlatformBody();
        this.startUpdate();
    }
    createPlatformSprites() {
        let color = this.properties.color;
        // remove alpha
        color = color.substring(3);
        color = Number(`0x${color}`);

        let sprite = new Sprite(this.scene, 0, 0, 'platform');
        let rectangle = new Rectangle(this.scene, 0, 0, sprite.width - 16, sprite.height - 16, color);
        
        this.sprites = [rectangle, sprite]

        this.container = this.scene.add.container(0, 0, this.sprites);
    }
    createPlatformBody() {
        this.matter = this.scene.matter.add.gameObject(this.container);
        
        let bodyWidth = this.sprites[1].width;
        let bodyHeight = this.sprites[1].height;
        let bodyX = this.transform.x;
        let bodyY = this.transform.y;

        this.xStart = bodyX;
        this.yStart = bodyY;

        this.matter.setExistingBody(Matter.Bodies.rectangle(
            bodyX, 
            bodyY, 
            bodyWidth, 
            bodyHeight, 
            {isStatic: true, frictionStatic: Infinity}
        ))
        this.matter.setCollisionCategory(this.map.collision.objects);
        this.setMatterScale(this.matter, this.sprites[1]);
        this.matter.angle = this.transform.rotation;
    }
    /*
    mapLoaded() {
        let mapObjects = this.map.customObjects;
        for(let i = 0; i < mapObjects.length; i++) {

            let object = mapObjects[i];

            if(object.config && object.properties && object.config.type && object.properties.activates) {
                let type = object.config.type;
                let activates = object.properties.activates;

                if(activates != this.properties.activationID)
                    continue;

                switch (type) {
                    case "lever":
                    case "button":
                        this.activators.push(object);
                        break;
                }
            }
        }
    }
    */
    update(time, delta) {

        /*
        if(this.activators.length > 0) {
            let activated = false;
            this.activators.forEach(activator => {
                let type = activator.config.type;
                switch (type) {
                    case "button":
                        activated = activated || activator.activated
                        break;
                    case "lever":
                        activated = activated || activator.activated
                        break;
                }
            })
            this.activated = activated;
        }
        */

        let positionEpsilon = 5;
        let rotationEpsilon = 2;

        if(this.properties.moveX === undefined) this.properties.moveX = 0;
        if(this.properties.moveY === undefined) this.properties.moveY = 0;
        if(this.properties.rotate === undefined) this.properties.rotate = 0;

        let xEnd = this.xStart + this.properties.moveX;
        let yEnd = this.yStart + this.properties.moveY;
        let angleEnd = this.angleStart + this.properties.rotate;

        if(this.activated) {
            let nextX = this.transitionTo(this.container.x, this.xStart, this.properties.moveX, delta, positionEpsilon);
            this.matter.setVelocityX(nextX - this.container.x);
            this.container.x = nextX;
            this.container.y = this.transitionTo(this.container.y, this.yStart, this.properties.moveY, delta, positionEpsilon);
            this.angleHelper = this.transitionTo(this.angleHelper, this.angleStart, this.properties.rotate, delta, rotationEpsilon);
            this.container.angle = this.angleHelper;
        }
        else if(!this.activated){
            let nextX = this.transitionTo(this.container.x, xEnd, -this.properties.moveX, delta, positionEpsilon);
            this.matter.setVelocityX(nextX - this.container.x);
            this.container.x = nextX;
            this.container.y = this.transitionTo(this.container.y, yEnd, -this.properties.moveY, delta, positionEpsilon);
            this.angleHelper = this.transitionTo(this.angleHelper, angleEnd, -this.properties.rotate, delta, rotationEpsilon);
            this.container.angle = this.angleHelper;
        }
    }

    transitionTo(value, start, move, delta, epsilon) {
        if(Math.abs(value - (start + move)) > epsilon)
            value += delta * Math.sign(move) * 0.1 * this.properties.speed;
        else
            value = start + move;

        return value;
    }
}