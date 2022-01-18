import MapElement from "./MapElement";

export default class Ball extends MapElement{
    constructor(config) {
        super(config);

        let x = this.transform.position.x;
        let y = this.transform.position.y;

        this.ball = this.scene.add.sprite(x, y, 'ball');
        this.matter = this.scene.matter.add.gameObject(this.ball);
        this.matter.setBody({
            type: 'circle',
            radius: this.ball.width * 0.5,
        })
        this.setMatterScale(this.matter, this.ball);
        this.matter.angle = this.transform.rotation;
        this.matter.body.friction = 0.01;
        this.matter.body.frictionAir = 0;
        this.matter.body.frictionStatic = 0;
        this.matter.body.restitution = 0.3;
        this.matter.setCollisionCategory(this.map.collision.objects);
    }
}