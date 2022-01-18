import MapElement from "./MapElement";

export default class Box extends MapElement{
    constructor(config) {
        super(config);

        this.box = this.scene.add.sprite(this.transform.x, this.transform.y, 'box');

        this.matter = this.scene.matter.add.gameObject(this.box);
        this.matter.setCollisionCategory(this.map.collision.objects);
        
        this.setMatterScale(this.matter, this.box);
        this.matter.angle = this.transform.rotation;
    }
}