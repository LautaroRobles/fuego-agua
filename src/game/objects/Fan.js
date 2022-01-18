import MapElement from "./MapElement";
const Matter = Phaser.Physics.Matter.Matter;

export default class Fan extends MapElement {
    constructor(config) {
        super(config);

        this.activated = false;
        this.objectsToPush = [];

        this.createFanAnimations();
        this.createFanBody();
        this.createFanWind();

        this.startUpdate();
    }
    createFanBody() {
        let x = this.transform.x;
        let y = this.transform.y;
        let color = this.properties.color;
        // remove alpha
        color = color.substring(3);
        color = Number(`0x${color}`);

        this.sprite = this.scene.add.sprite(0, 0, 'fan');
        this.rectangle = this.scene.add.rectangle(0, this.sprite.height * 0.2, this.sprite.width * 0.9, this.sprite.height * 0.4, color);
        
        this.sprites = [this.rectangle, this.sprite];

        this.container = this.scene.add.container(0, 0, this.sprites);

        this.matter = this.scene.matter.add.gameObject(this.container, {
            isStatic: true,
            parts: [
                Matter.Bodies.rectangle(
                    x,
                    y,
                    this.sprite.width,
                    this.sprite.height
                )
            ]
        });
        this.setMatterScale(this.matter, this.sprite);
        this.matter.angle = this.transform.rotation;
    }
    createFanWind() {
        let r = this.transform.rotation;
        let w = this.transform.w;
        let h = this.transform.h;

        let x = this.getXTransform(r, 0, this.properties.windLenght + h * 0.5, this.transform.x);
        let y = this.getYTransform(r, 0, this.properties.windLenght + h * 0.5, this.transform.y);

        this.windSprite = this.scene.add.rectangle(x, y, this.transform.w, this.properties.windLenght, 0xffffff);
        this.windSprite.setVisible(false);
        this.windSprite.alpha = 0.1;

        this.wind = this.scene.matter.add.gameObject(this.windSprite, {
            isSensor: true,
            ignoreGravity: true,
            onCollideCallback: (collision) => this.addObject(collision),
            onCollideEndCallback: (collision) => this.removeObject(collision)
        });
        this.wind.setCollisionCategory(this.map.collision.objectsSensor);
        this.wind.angle = this.transform.rotation;
        this.wind.customParent = this;
    }
    createFanAnimations() {
        this.animations = {};

        this.animations.on = this.scene.anims.create({
            key: 'on',
            frames: this.scene.anims.generateFrameNames('fan', { prefix: 'fan', suffix: '.png', end: 5 }), 
            repeat: -1,
            frameRate: 30
        })
    }
    addObject(collision) {
        if(collision.bodyA.isStatic || collision.bodyB.isStatic) 
            return;

        const Vector2 = Phaser.Math.Vector2;

        let gameObjectA = collision.bodyA.gameObject;
        let id = this.config.id;

        let body = collision.bodyA;

        if(gameObjectA.customParent !== undefined && gameObjectA.customParent.config.id === id) 
            body = collision.bodyB;

        this.objectsToPush.push(body);
    }
    removeObject(collision) {
        if(collision.bodyA.isStatic || collision.bodyB.isStatic) 
            return;

        const Vector2 = Phaser.Math.Vector2;

        let gameObjectA = collision.bodyA.gameObject;
        let id = this.config.id;

        let body = collision.bodyA;

        if(gameObjectA.customParent !== undefined && gameObjectA.customParent.config.id === id) 
            body = collision.bodyB;

        let indexToRemove = -1;

        for(let i = 0; i < this.objectsToPush.length; i++) {
            let object = this.objectsToPush[i];
            if(object.id == body.id) {
                indexToRemove = i;
                break;
            }
        }

        this.objectsToPush.splice(indexToRemove, 1);
    }
    beforeUpdate() {

        if(!this.activated)
            return;
            
        const forceMagnitude = 0.01;
        let angle = this.transform.rotation * Math.PI / 180;
        let force = {
            x: forceMagnitude * Math.sin(angle) * 2.5,
            y: -forceMagnitude * Math.cos(angle)
        };

        this.objectsToPush.forEach(object => {
            object.gameObject.applyForce(force);
        })
    }
    update() {
        if(this.activated) {
            this.sprite.play('on', true);
            this.windSprite.setVisible(true);
        }
        else {
            this.sprite.stop('on')
            this.windSprite.setVisible(false);
        }
    }
}