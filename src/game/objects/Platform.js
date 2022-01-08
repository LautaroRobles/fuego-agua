export default class Platform extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene, 0, 0, 'platform');
        this.scene = scene;

        this.matter = this.scene.matter.add.gameObject(this, {
            isStatic: true,
            friction: 1,
            frictionAir: 0,
            frictionStatic: Infinity
        });
    }
    created() {
        //console.log(this);

        if(this.data)
            this.properties = this.data.list;

        this.progress = 0;
        this.activated = true;
        this.xStart = this.x;
        this.yStart = this.y;
        this.angleStart = this.angle;

        this.initializeEvents();
    }
    initializeEvents() {
        this.scene.matter.world.on('beforeupdate', (time, delta) => this.beforeUpdate(time, delta));
        this.scene.events.on('update', (time, delta) => this.update(time, delta));
    }
    beforeUpdate() {

    }
    update(time, delta) {

        if(!this.properties) {
            return;
        }

        let positionEpsilon = 5;
        let rotationEpsilon = 2;

        if(this.properties.moveX === undefined) this.properties.moveX = 0;
        if(this.properties.moveY === undefined) this.properties.moveY = 0;
        if(this.properties.rotate === undefined) this.properties.rotate = 0;

        let xEnd = this.xStart + this.properties.moveX;
        let yEnd = this.yStart + this.properties.moveY;
        let angleEnd = this.angleStart + this.properties.rotate;

        if(this.activated) {
            this.x = this.transitionTo(this.x, this.xStart, this.properties.moveX, delta, positionEpsilon);
            this.y = this.transitionTo(this.y, this.yStart, this.properties.moveY, delta, positionEpsilon);
            this.angle = this.transitionTo(this.angle, this.angleStart, this.properties.rotate, delta, rotationEpsilon);
        }
        else if(!this.activated){
            this.x = this.transitionTo(this.x, xEnd, -this.properties.moveX, delta, positionEpsilon);
            this.y = this.transitionTo(this.y, yEnd, -this.properties.moveY, delta, positionEpsilon);
            this.angle = this.transitionTo(this.angle, angleEnd, -this.properties.rotate, delta, rotationEpsilon);
        }
    }

    transitionTo(value, start, move, delta, epsilon) {
        if(Math.abs(value - (start + move)) > epsilon)
            value += delta * Math.sign(move) * 0.1;
        else
            value = start + move;

        return value;
    }
}