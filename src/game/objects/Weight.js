import MapElement from "./MapElement";

export default class Weight extends MapElement {
    constructor(config) {
        super(config);

        this.link = undefined;

        this.createSprite();
        this.createPhysics();

        this.startUpdate();
    }
    mapLoaded() {
        let linkID = this.properties.linkID;
        this.map.customObjects.forEach(object => {
            if(object.config.id === linkID) {
                this.link = object;
            }
        });
    }
    createSprite() {
        let x = this.transform.x;
        let y = this.transform.y;

        this.sprite = this.scene.add.sprite(x, y, 'weight');
    }
    createPhysics() {
        let matterConfig = {
            ignoreGravity: true,
            collisionFilter: {category: this.map.collision.objects}
        }

        this.matter = this.scene.matter.add.gameObject(this.sprite, matterConfig);
        this.matter.setFixedRotation();
    }
    update() {

        if(this.link === undefined)
            return;

        let velocity = this.matter.body.velocity;
        let linkVelocity = this.link.matter.body.velocity;

        this.matter.setVelocity(-linkVelocity.x, -linkVelocity.y);
    }
}