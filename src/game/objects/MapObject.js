export default class MapObject {
    constructor(config) {
        this.scene = config.scene;
        this.config = config;
        this.map = config.map;
        this.properties = config.properties;
        
        this.createTransform();
    }
    createTransform() {
        let rad = this.config.rotation / 180 * Math.PI;
        let scaleXCompensation = (this.config.width * Math.cos(rad) + this.config.height * Math.sin(rad)) * 0.5;
        let scaleYCompensation = (this.config.width * Math.sin(rad) - this.config.height * Math.cos(rad)) * 0.5;

        let x = this.config.x + scaleXCompensation;
        let y = this.config.y + scaleYCompensation;

        this.transform = {
            x: x,
            y: y,
            w: this.config.width,
            h: this.config.height,
            position: {
                x: x,
                y: y
            },
            scale: {
                w: this.config.width,
                h: this.config.height
            },
            rotation: this.config.rotation
        }
    }
    setMatterScale(matter, sprite) {
        let scale = this.getMatterScale(sprite);
        matter.setScale(scale.x, scale.y);
    }
    getMatterScale(sprite) {
        return {
            x: this.transform.scale.w * 1/sprite.width,
            y: this.transform.scale.h * 1/sprite.height,
        }
    }
    startUpdate() {
        this.scene.matter.world.on('beforeupdate', (time, delta) => this.beforeUpdate(time, delta));
        this.scene.events.on('update', (time, delta) => this.update(time, delta));
    }
    beforeUpdate(time, delta) {}
    update(time, delta) {}
}