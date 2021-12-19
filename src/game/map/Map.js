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

        this.shader = this.scene.add.shader('map-shader', this.map.widthInPixels / 2, this.map.heightInPixels / 2, this.map.widthInPixels, this.map.heightInPixels);

        console.log(this.shader.shader.fragmentSrc)

        this.shader.setChannel0('bricks');

    }
}