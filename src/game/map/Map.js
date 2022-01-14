import Box from "../objects/Box";
import Button from "../objects/Button";
import Lever from "../objects/Lever";
import Ball from "../objects/Ball";
import Water from "../fluids/Water";
import Lava from "../fluids/Lava";
import Platform from "../objects/Platform";
import Pendulum from "../objects/Pendulum";

export default class Map {
    constructor(config) {
        this.scene = config.scene;

        this.map = this.scene.make.tilemap({key: config.key});

        this.collisionCategories();
        this.layout();
        this.objects();
    }
    collisionCategories() {
        this.collision = {};
        this.collision.layout = this.scene.matter.world.nextCategory();
        this.collision.objects = this.scene.matter.world.nextCategory();
        this.collision.objectsSensor = this.scene.matter.world.nextCategory();
        this.collision.objectsGhost = this.scene.matter.world.nextCategory();
        this.collision.fluids = this.scene.matter.world.nextCategory();
        this.collision.players = this.scene.matter.world.nextCategory();
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

        this.mapShader.setChannel0('background-bricks');
        this.mapShader.setChannel1('map-texture');
        this.mapShader.setUniform('tiling.value', 16);

        this.backgroundShader.setChannel0('background-bricks');
        this.backgroundShader.setUniform('tiling.value', 16);
        this.backgroundShader.setUniform('darken.value', 0.5);

        this.backgroundShader.setDepth(0);
        this.mapShader.setDepth(3);
    }
    objects() {
        this.customObjects = [];

        const fluidLayer = 0;
        const objectLayer = 1;

        this.map.objects[objectLayer].objects.forEach(
            object => {
                let customObject = this.createObject(object);
                if(customObject !== undefined) {
                    this.customObjects.push(customObject)
                }
            }
        )
        
        this.map.objects[fluidLayer].objects.forEach(
            object => {
                let customObject = this.createObject(object);
                if(customObject !== undefined) {
                    this.customObjects.push(customObject)
                }
            }
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
            case "lever":
                return new Lever(object);
            case "platform":
                return new Platform(object);
            case "pendulum":
                return new Pendulum(object);
            case "water":
                return new Water(object);
            case "lava":
                return new Lava(object);
        }
    }
}