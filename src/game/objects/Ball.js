export default class Ball extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene, 0, 0, 'ball');
        this.scene = scene;
        // hack, because createFromObjects() tries to put a sprite allways, but i want to create my own gameObjects
        this.setVisible(false)
    }
    // this has to be called after a map.createFromObjects function
    created() {
        this.ball = this.scene.add.sprite(this.x, this.y, 'ball');
        this.ball.scale = this.width * this.scaleX * 1/64;
        this.matter = this.scene.matter.add.gameObject(this.ball);
        this.matter.setBody({
            type: 'circle',
            radius: this.width * this.scaleX * 0.5,
        })
        this.matter.body.friction = 0.01;
        this.matter.body.frictionAir = 0;
        this.matter.body.frictionStatic = 0;
        this.matter.body.restitution = 0.3;

        //console.log(this);

        if(this.data)
            this.properties = this.data.list;
    }

}