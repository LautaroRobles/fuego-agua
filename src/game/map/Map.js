export default class Map {
    constructor(config) {
        this.scene = config.scene;

        this.map = this.scene.make.tilemap({key: config.key});
        this.tileset = this.map.addTilesetImage('base', 'base-tileset');
        this.layer = this.map.createLayer(0, this.tileset, 0, 0);

        // Set up the layer to have matter bodies. Any colliding tiles will be given a Matter body.
        this.map.setCollisionByProperty({ collides: true });
        this.scene.matter.world.convertTilemapLayer(this.layer);
        this.scene.matter.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels, 32, true, true, false, true);

        this.mapShader = this.scene.add.shader('map-shader', this.map.widthInPixels / 2, this.map.heightInPixels / 2, this.map.widthInPixels, this.map.heightInPixels);
        this.backgroundShader = this.scene.add.shader('background-shader', this.map.widthInPixels / 2, this.map.heightInPixels / 2, this.map.widthInPixels, this.map.heightInPixels);

        this.mapShader.setChannel0('bricks');
        this.mapShader.setChannel1('test-png');

        this.backgroundShader.setChannel0('bricks');

        this.backgroundShader.setDepth(0);
        this.mapShader.setDepth(3);

    }
}