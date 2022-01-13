const Matter = Phaser.Physics.Matter.Matter;

export default class Fluid extends Phaser.GameObjects.GameObject{
    constructor(config) {
        super(config.scene);

        this.scene = config.scene;
        this.config = config;
        this.map = config.map;
        this.properties = config.properties;

        this.fluidData = {
            k: 0.1,
            d: 0.15,
            s: 0.1,
            color: 0x4ED1FF,
            alpha: 0.5
        }
    }
    // To be called by childrens
    created() {
        this.createFluidShape();
        this.createFluidCollision();
        this.initializeEvents()
    }
    createFluidShape() {

        let pointWidth = 32;
        let fluidPoints = this.config.width / pointWidth;

        this.points = [];
        for(let x = 0; x <= fluidPoints; x++) {
            this.points.push([x * pointWidth, 0])
        }
        this.points.push([this.config.width, this.config.height]);
        this.points.push([0, this.config.height]);

        this.pointsData = [];

        for(let i = 0; i < this.points.length - 2; i++) {
            this.pointsData.push({
                height: this.points[i][1],
                velocity: 0,
            })
        }

        this.fluidGraphics = this.scene.add.graphics();

        this.fluidGraphics.alpha = this.fluidData.alpha;
        this.fluidGraphics.setDepth(1);
        this.fluidGraphics.x = this.config.x;
        this.fluidGraphics.y = this.config.y - this.config.height;
    }
    createFluidCollision() {
        this.fluidCollisions = [];

        this.matter = this.scene.matter.add.gameObject(this);

        let pointWidth = 32;
        let fluidPoints = this.config.width / pointWidth;

        for(let i = 0; i < fluidPoints; i++) {
            let x = this.config.x + pointWidth * i + pointWidth * 0.5;
            let y = this.config.y - this.config.height;

            let sensor = Matter.Bodies.rectangle(x, y, pointWidth, pointWidth, { isSensor: true });

            sensor.onCollideActiveCallback = (collision) => this.sensorCollided(collision, i);

            this.fluidCollisions.push(sensor);
        }

        let compoundBody = Matter.Body.create({
            parts: this.fluidCollisions,
            ignoreGravity: true,
        });
        this.matter.setExistingBody(compoundBody);
    }
    initializeEvents() {
        this.scene.matter.world.on('beforeupdate', (time, delta) => this.beforeUpdate(time, delta));
        this.scene.events.on('update', (time, delta) => this.update(time, delta));
    }
    beforeUpdate(time, delta) {

    }
    update(time, delta) {
        this.fluidPhysics();

        this.fluidGraphics.clear();
        this.fluidGraphics.fillStyle(this.fluidData.color);

        this.fluidGraphics.beginPath();

        for(let i = 0; i < this.points.length; i++){
            this.fluidGraphics.lineTo(this.points[i][0], this.points[i][1]);
        }

        this.fluidGraphics.closePath();
        this.fluidGraphics.fillPath();
    }
    sensorCollided(collision, point) {
        /*
        if(collision.bodyA.isStatic || collision.bodyB.isStatic) {
            return;
        }
        */

        let bodyVelocity = collision.bodyA.parent.velocity;

        this.pointsData[point].height += Math.abs(bodyVelocity.x) * 0.15 + bodyVelocity.y * 0.25;
    }
    fluidPhysics(time, delta) {
        const targetHeight = 0;

        let k = this.fluidData.k;
        let d = this.fluidData.d;
        let s = this.fluidData.s;

        for(let i = 1; i < this.points.length - 3; i++) {
            let y = this.pointsData[i].height - targetHeight;
            let loss = -d * this.pointsData[i].velocity;
            let acceleration = -k * y + loss;

            this.pointsData[i].height += this.pointsData[i].velocity;
            this.pointsData[i].velocity += acceleration;

            this.points[i][1] = this.pointsData[i].height;
        }

        // propagation
        for(let i = 1; i < this.points.length - 3; i++) {
            if(i > 0) {
                this.pointsData[i - 1].velocity += s * (this.pointsData[i].height - this.pointsData[i - 1].height)
            }
            if(i < this.points.length - 3) {
                this.pointsData[i + 1].velocity += s * (this.pointsData[i].height - this.pointsData[i + 1].height)
            }
        }
    }
}