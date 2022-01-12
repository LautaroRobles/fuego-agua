export default class Box {
    constructor(config) {
        this.scene = config.scene;
        this.config = config;

        let spriteX = this.config.x + this.config.width / 2;
        let spriteY = this.config.y - this.config.height / 2

        this.box = this.scene.add.sprite(spriteX, spriteY, 'box');
        this.box.scaleX = this.config.width * 1/this.box.width;
        this.box.scaleY = this.config.height * 1/this.box.height;

        this.matter = this.scene.matter.add.gameObject(this.box);
    }
}