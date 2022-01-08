export default class Box extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene, 0, 0, 'box');
        this.scene = scene;

        this.matter = this.scene.matter.add.gameObject(this);
    }
    created() {
        if(this.data)
            this.properties = this.data.list;
    }
}