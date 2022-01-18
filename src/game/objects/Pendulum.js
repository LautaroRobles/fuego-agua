import MapElement from "./MapElement";

const Rectangle = Phaser.GameObjects.Rectangle;

export default class Pendulum extends MapElement {
    constructor(config) {
        super(config);

        this.createPendulumBodies();
        this.startUpdate();
    }
    createPendulumBodies() {
        let x = this.transform.x;
        let y = this.transform.y;
            
        let swingHeight = this.properties.swingHeight;

        let anchorSprite = this.scene.add.circle(x, y - swingHeight, 20, 0x251201, 1);
        let rope = this.scene.add.rectangle(x, y - swingHeight / 2, 16, swingHeight, 0x251201, 1);
        let platformSprite = this.scene.add.sprite(x, y, 'pendulum');

        let anchor = this.scene.matter.add.gameObject(anchorSprite, {isStatic: true});
        let platform = this.scene.matter.add.gameObject(platformSprite);

        this.setMatterScale(platform, platformSprite);
        platform.angle = this.transform.rotation;

        anchor.setCollisionCategory(this.map.collision.objectsGhost);
        platform.setCollisionCategory(this.map.collision.objects);

        anchor.setCollidesWith([]);

        this.anchor = anchor;
        this.platform = platform;
        this.rope = rope;
        this.constraint = this.scene.matter.add.constraint(anchor, platform, swingHeight, 1);
    }
    update(time, delta) {
        let ax = this.anchor.x;
        let ay = this.anchor.y;

        let px = this.platform.x;
        let py = this.platform.y;

        this.rope.x = (ax + px) / 2;
        this.rope.y = (ay + py) / 2;
        this.rope.angle = Math.atan2(py - ay, px - ax) * 180 / Math.PI + 90;

        //console.log(this.rope.x);

        //this.rope.angle 
    }
}