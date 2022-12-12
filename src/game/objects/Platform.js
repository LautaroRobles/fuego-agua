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
            {isStatic: true, frictionStatic: 0}
        ))
        this.matter.setCollisionCategory(this.map.collision.objects);
        this.setMatterScale(this.matter, this.sprites[1]);
        this.matter.angle = this.transform.rotation;
    }
    update(time, delta) {

        if(this.properties.moveX === undefined) this.properties.moveX = 0;
        if(this.properties.moveY === undefined) this.properties.moveY = 0;
        if (this.properties.rotate === undefined) this.properties.rotate = 0;
        
        this.activated = this.properties.invertedActivation ? !this.activated : this.activated;

        let xEnd = this.xStart + this.properties.moveX;
        let yEnd = this.yStart + this.properties.moveY;
        let angleEnd = this.angleStart + this.properties.rotate;

        if(this.activated) {
            let nextX = this.transitionTo(this.container.x, this.xStart, this.properties.moveX, delta);
            this.matter.setVelocityX(nextX - this.container.x);
            this.container.x = nextX;
            this.container.y = this.transitionTo(this.container.y, this.yStart, this.properties.moveY, delta);
            this.angleHelper = this.transitionTo(this.angleHelper, this.angleStart, this.properties.rotate, delta);
            this.container.angle = this.angleHelper;
        }
        else if(!this.activated){
            let nextX = this.transitionTo(this.container.x, xEnd, -this.properties.moveX, delta);
            this.matter.setVelocityX(nextX - this.container.x);
            this.container.x = nextX;
            this.container.y = this.transitionTo(this.container.y, yEnd, -this.properties.moveY, delta);
            this.angleHelper = this.transitionTo(this.angleHelper, angleEnd, -this.properties.rotate, delta);
            this.container.angle = this.angleHelper;
        }
    }

    transitionTo(value, start, move, delta) {

        if (Math.sign(move) == 1 && value < (start + move)) {
            value += this.properties.speed * delta;
        }
        else if (Math.sign(move) == -1 && value > (start + move)) {
            value -= this.properties.speed * delta;
        }
        else {
            value = start + move;
        }

        return value;
    }
}