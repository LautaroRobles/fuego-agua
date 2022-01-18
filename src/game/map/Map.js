import Box from "../objects/Box";
import Button from "../objects/Button";
import Lever from "../objects/Lever";
import Ball from "../objects/Ball";
import Water from "../fluids/Water";
import Lava from "../fluids/Lava";
import Dark from "../fluids/Dark";
import Platform from "../objects/Platform";
import Pendulum from "../objects/Pendulum";
import Fuego from "../player/Fuego";
import Fan from "../objects/Fan";
import Weight from "../objects/Weight";

export default class Map {
    constructor(config) {
        this.scene = config.scene;
        this.playerConfig = config.playerConfig;

        this.map = this.scene.make.tilemap({key: config.key});

        this.collisionCategories();
        this.layout();
        this.objects();
        this.loadActivators();

        this.startUpdate();
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
        //this.scene.matter.world.setCollisionCategory(this.collision.layout);
        this.scene.matter.world.convertTilemapLayer(this.layer);
        this.scene.matter.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels, 32, true, true, false, true);

        this.scene.cameras.main.setZoom(0.46875);
        this.scene.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        this.mapShader = this.scene.add.shader('map-shader', this.map.widthInPixels / 2, this.map.heightInPixels / 2, this.map.widthInPixels, this.map.heightInPixels);
        this.backgroundShader = this.scene.add.shader('background-shader', this.map.widthInPixels / 2, this.map.heightInPixels / 2, this.map.widthInPixels, this.map.heightInPixels);

        // Permitir texturas que no sean multiplo de 2
        let gl = this.mapShader.gl;
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

        this.rt = this.scene.add.renderTexture(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.rt.draw(this.layer, 0, 0);
        this.rt.setDepth(0);
        this.rt.saveTexture('map-texture');

        this.mapShader.setChannel0('background-pattern');
        this.mapShader.setChannel1('map-texture');
        this.mapShader.setUniform('tiling.value', 15);

        this.backgroundShader.setChannel0('background-pattern');
        this.backgroundShader.setUniform('tiling.value', 15);
        this.backgroundShader.setUniform('darken.value', 0.5);

        this.backgroundShader.setDepth(0);
        this.mapShader.setDepth(3);
        
        console.log(this);
    }
    objects() {
        this.customObjects = [];
        this.players = [];

        this.map.objects.forEach(layer => {
            layer.objects.forEach(object => this.addObject(object))
        })

        // when all objects are finished creating it calls mapLoaded to each object
        this.customObjects.forEach(object => {if(object.mapLoaded) object.mapLoaded()})
        this.players.forEach(player => {if(player.mapLoaded) player.mapLoaded()})
    }
    addObject(object) {
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
            // objects
            case "ball":
                this.customObjects.push(new Ball(object));
                break;
            case "box":
                this.customObjects.push(new Box(object));
                break;
            case "button":
                this.customObjects.push(new Button(object));
                break;
            case "lever":
                this.customObjects.push(new Lever(object));
                break;
            case "platform":
                this.customObjects.push(new Platform(object));
                break;
            case "pendulum":
                this.customObjects.push(new Pendulum(object));
                break;
            case "fan":
                this.customObjects.push(new Fan(object));
                break;
            case "weight":
                this.customObjects.push(new Weight(object));
                break;
            
            // fluids
            case "water":
                this.customObjects.push(new Water(object));
                break;
            case "lava":
                this.customObjects.push(new Lava(object));
                break;
            case "dark":
                this.customObjects.push(new Dark(object));
                break;

            // players
            case "fuego":
                object.playerNumber = this.playerConfig["fuego"];
                this.players.push(new Fuego(object));
                break;
            case "agua":
                object.playerNumber = this.playerConfig["agua"];
                this.players.push(new Fuego(object));
                break;
        }
    }
    loadActivators() {
        this.activators = {};
        this.actuators = {};

        this.customObjects.forEach(object => {
            if(object.properties !== undefined && object.properties.activates !== undefined) {
                let activatesID = object.properties.activates;

                if(this.activators[activatesID] === undefined)
                    this.activators[activatesID] = [];

                this.activators[activatesID].push(object);
            }
            if(object.properties !== undefined && object.properties.activationID !== undefined) {
                let activationID = object.properties.activationID;

                if(this.actuators[activationID] === undefined)
                    this.actuators[activationID] = [];

                this.actuators[activationID].push(object);
            }
        });
    }
    startUpdate() {
        this.scene.matter.world.on('beforeupdate', (time, delta) => this.beforeUpdate(time, delta));
        this.scene.events.on('update', (time, delta) => this.update(time, delta));
    }
    beforeUpdate(time, delta) {}
    update(time, delta) {
        // handle activators   
        for(let activationID in this.activators) {
            let activated = this.activators[activationID].some(activator => activator.activated);
            this.actuators[activationID].forEach(actuator => actuator.activated = activated);
        }
    }
}