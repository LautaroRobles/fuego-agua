import Box from "../objects/Box";
import Button from "../objects/Button";
import Ball from "../objects/Ball";
import Fluid from "../fluids/Fluid";
import Water from "../fluids/Water";
import Lava from "../fluids/Lava";
import Platform from "../objects/Platform";

export default class Map {
    constructor(config) {
        this.scene = config.scene;

        this.map = this.scene.make.tilemap({key: config.key});

        this.layout();
        this.objects();
    }
    layout() {
        this.tileset = this.map.addTilesetImage('base', 'base-tileset');
        this.layer = this.map.createLayer('layout', this.tileset, 0, 0);

        // Set up the layer to have matter bodies. Any colliding tiles will be given a Matter body.
        this.map.setCollisionByProperty({ collides: true });
        this.scene.matter.world.convertTilemapLayer(this.layer);
        this.scene.matter.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels, 32, true, true, false, true);

        this.scene.cameras.main.setZoom(0.5);
        this.scene.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        this.mapShader = this.scene.add.shader('map-shader', this.map.widthInPixels / 2, this.map.heightInPixels / 2, this.map.widthInPixels, this.map.heightInPixels);
        this.backgroundShader = this.scene.add.shader('background-shader', this.map.widthInPixels / 2, this.map.heightInPixels / 2, this.map.widthInPixels, this.map.heightInPixels);

        this.rt = this.scene.add.renderTexture(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.rt.draw(this.layer, 0, 0);
        this.rt.setDepth(0);
        this.rt.saveTexture('map-texture');

        this.mapShader.setChannel0('bricks');
        this.mapShader.setChannel1('map-texture');

        this.backgroundShader.setChannel0('bricks');

        this.backgroundShader.setDepth(0);
        this.mapShader.setDepth(3);
    }
    objects() {
        this.customObjects = [];

        const fluidLayer = 0;
        const objectLayer = 1;

        this.map.objects[objectLayer].objects.forEach(
            object => this.customObjects.push(this.createObject(object))
        )
        
        this.map.objects[fluidLayer].objects.forEach(
            object => this.customObjects.push(this.createObject(object))
        )

        // when all objects are finished creating it calls mapLoaded to each object
        this.customObjects.forEach(object => {if(object.mapLoaded) object.mapLoaded()})
    }
    createObject(object) {
        object.scene = this.map.scene;
        object.map = this;

        let properties = {}

        // map properties   from {name: "name", type: "type", value: "value"}
        //                  to   object.name = value
        if(object.properties)
            object.properties.forEach(property => {
                properties[property.name] = property.value
            })

        object.properties = properties;

        switch(object.type) {
            case "ball":
                return new Ball(object)
            case "box":
                return new Box(object);
            case "button":
                return new Button(object);
            case "platform":
                return new Platform(object);
            case "water":
                return new Water(object);
            case "lava":
                return new Lava(object);
        }
    }
}