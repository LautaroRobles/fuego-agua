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
        this.customObjects = []

        //call created() on each object because createFromObjects() copies properties from Tiled after the constructor is called
        this.buttons = this.map.createFromObjects('objects', {gid: 11, classType: Button, key: 'button'})
        this.buttons.forEach(button => {this.customObjects.push(button); button.created(this)})

        this.boxes = this.map.createFromObjects('objects', {gid: 9, classType: Box, key: 'box'});
        this.boxes.forEach(box => {this.customObjects.push(box); box.created(this)})

        this.balls = this.map.createFromObjects('objects', {gid: 12, classType: Ball})
        this.balls.forEach(ball => {this.customObjects.push(ball); ball.created(this)})

        this.platforms = this.map.createFromObjects('objects', {gid: 13, classType: Platform, key: 'platform'})
        this.platforms.forEach(platform => {this.customObjects.push(platform); platform.created(this)})

        this.water = this.map.createFromObjects('objects', {name: 'water', classType: Water})
        this.water.forEach(water => {this.customObjects.push(water); water.created(this)})

        this.lava = this.map.createFromObjects('objects', {name: 'lava', classType: Lava})
        this.lava.forEach(lava => {this.customObjects.push(lava); lava.created(this)})

        // when all objects are finished creating it calls mapLoaded to each object
        this.customObjects.forEach(object => {if(object.mapLoaded) object.mapLoaded()})
    }
}