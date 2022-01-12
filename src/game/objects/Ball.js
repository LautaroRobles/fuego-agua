export default class Ball {
    constructor(config) {
        this.scene = config.scene;
        this.config = config;

        let spriteX = this.config.x + this.config.width / 2;
        let spriteY = this.config.y - this.config.height / 2

        this.ball = this.scene.add.sprite(spriteX, spriteY, 'ball');
        this.ball.scale = this.config.width * 1/64;
        this.matter = this.scene.matter.add.gameObject(this.ball);
        this.matter.setBody({
            type: 'circle',
            radius: this.config.width * 0.5,
        })
        this.matter.body.friction = 0.01;
        this.matter.body.frictionAir = 0;
        this.matter.body.frictionStatic = 0;
        this.matter.body.restitution = 0.3;
    }
}