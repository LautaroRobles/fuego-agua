import MapElement from "./MapElement";

export default class Lever extends MapElement{
    constructor(config) {
        super(config);

        this.activated = false;
        this.maxDistance = this.transform.w / 2 - 16;
        
        this.createLeverSprites();
        this.createLeverPhysics();
        this.startUpdate();
    }
    createLeverSprites() {
        let x = this.transform.x;
        let y = this.transform.y;

        let w = this.transform.w;
        let h = this.transform.h;

        this.leverCircle = this.scene.add.circle(0, - h + 22, 14, 0xff0000);
        this.leverStick = this.scene.add.sprite(0, - h / 2, 'lever-stick');
        this.leverStickContainer = this.scene.add.container(x, y + h / 2, [this.leverCircle, this.leverStick]);

        this.leverRectangle = this.scene.add.rectangle(x, y + h / 2 - 8, w - 26, h / 8 - 8, 0xff0000);
        this.leverBase = this.scene.add.sprite(x, y, 'lever-base');
    }
    createLeverPhysics() {
        let x = this.transform.x;
        let y = this.transform.y;

        let freeSprite = this.scene.add.circle(x, y, 32, 0x00ff00);
        let anchorSprite = this.scene.add.circle(x, y, 32, 0xff0000);

        anchorSprite.setVisible(false);
        freeSprite.setVisible(false);

        this.anchor = this.scene.matter.add.gameObject(anchorSprite, {isStatic: true});
        this.free = this.scene.matter.add.gameObject(freeSprite, {friction: Infinity, frictionAir: 0, frictionStatic: Infinity});
        
        this.anchor.setCollisionCategory(this.map.collision.objectsGhost);
        this.free.setCollisionCategory(this.map.collision.objects);
        this.anchor.setCollidesWith([]);
        this.free.setFixedRotation();

        this.constraint = this.scene.matter.add.constraint(this.free, this.anchor, 0, 0.05)
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

                this.leverCircle.fillColor = color;
                this.leverRectangle.fillColor = color;
            }
        })
    }
    update(time, delta) {
        this.updateConstraintCollision();
        this.updateLeverSprite();
    }
    updateConstraintCollision() {
        let minX = this.transform.position.x - this.maxDistance;
        let maxX = this.transform.position.x + this.maxDistance;

        //console.log(this.free.body.velocity.y);
        //this.free.setVelocityX(this.free.body.velocity.y);
        this.free.setVelocityY(0);
        if(this.free.x > maxX || this.free.x < minX) {
            this.free.setVelocityX(0);
        }

        this.free.y = this.transform.position.y;
        this.free.x = Phaser.Math.Clamp(
            this.free.x, 
            minX, 
            maxX
        );

        this.anchor.x = this.activated ? maxX : minX;

        let diff = Math.abs(this.anchor.x - this.free.x);
        if(diff > this.maxDistance) {
            this.activated = !this.activated;
        }
    }
    updateLeverSprite() {
        let diff = this.free.x - this.transform.position.x;
        let angle = diff / (this.maxDistance) * 35;
        
        this.leverStickContainer.angle = angle;
    }
}