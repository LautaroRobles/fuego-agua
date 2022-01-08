const Matter = Phaser.Physics.Matter.Matter;

export default class Fluid extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene, 0, 0, 'button');
        this.scene = scene;

        this.fluidData = {
            k: 0.1,
            d: 0.15,
            s: 0.1,
            color: 0x4ED1FF,
            alpha: 0.5
        }

        // hack, because createFromObjects() tries to put a sprite allways, but i want to create my own gameObjects
        this.setVisible(false)
    }
    // this has to be called after a map.createFromObjects function
    created() {
        if(this.data)
            this.properties = this.data.list;

        this.createFluidShape();
        this.createFluidCollision();

        this.initializeEvents()
    }
    createFluidShape() {
        this.points = [];
        for(let x = 0; x <= this.scaleX; x++) {
            this.points.push([x * this.width, 0])
        }
        this.points.push([this.scaleX * this.width, this.scaleY * this.height]);
        this.points.push([0, this.scaleY * this.height]);

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
        this.fluidGraphics.x = this.x - this.width * this.scaleX * 0.5;
        this.fluidGraphics.y = this.y + this.height * this.scaleY * 0.5;
    }
    createFluidCollision() {
        this.fluidCollisions = [];

        this.matter = this.scene.matter.add.gameObject(this);

        for(let i = 0; i < this.scaleX; i++) {
            let x = this.x + this.width * i - this.width * this.scaleX * 0.5 + this.width * 0.5;
            let y = this.y + this.height * this.scaleY * 0.5;

            let sensor = Matter.Bodies.rectangle(x, y, this.width, this.height, { isSensor: true });

            sensor.onCollideActiveCallback = (collision) => this.sensorCollided(collision, i);

            this.fluidCollisions.push(sensor);
        }

        let compoundBody = Matter.Body.create({
            parts: this.fluidCollisions,
            ignoreGravity: true
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
        if(collision.bodyA.isStatic || collision.bodyB.isStatic) {
            return;
        }

        let bodyVelocity = collision.bodyA.parent.velocity;

        this.pointsData[point].height += (Math.abs(bodyVelocity.x) + bodyVelocity.y) * 0.25;
    }
    fluidPhysics(time, delta) {
        const targetHeight = 0;

        let k = this.fluidData.k;
        let d = this.fluidData.d;
        let s = this.fluidData.s;

        for(let i = 0; i < this.points.length - 2; i++) {
            let y = this.pointsData[i].height - targetHeight;
            let loss = -d * this.pointsData[i].velocity;
            let acceleration = -k * y + loss;

            this.pointsData[i].height += this.pointsData[i].velocity;
            this.pointsData[i].velocity += acceleration;

            this.points[i][1] = this.pointsData[i].height;
        }

        // propagation
        for(let i = 0; i < this.points.length - 2; i++) {
            if(i > 0) {
                this.pointsData[i - 1].velocity += s * (this.pointsData[i].height - this.pointsData[i - 1].height)
            }
            if(i < this.points.length - 3) {
                this.pointsData[i + 1].velocity += s * (this.pointsData[i].height - this.pointsData[i + 1].height)
            }
        }
    }
}