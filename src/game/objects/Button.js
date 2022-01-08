export default class Button extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene, 0, 0, 'button');
        this.scene = scene;
        // hack, because createFromObjects() tries to put a sprite allways, but i want to create my own gameObjects
        this.setVisible(false)
    }
    // this has to be called after a map.createFromObjects function
    created() {
        this.button = this.scene.add.sprite(this.x, this.y, 'button');

        if(this.data)
            this.properties = this.data.list;
    }

}