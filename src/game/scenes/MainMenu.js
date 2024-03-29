import { Scene } from 'phaser';
import Button from '../ui/Button';
import Map from "../map/Map";

export default class MainMenu extends Scene {
    constructor() {
        super({key: 'MainMenu'});
    }
    create() {
        /*
        new Button({
            scene: this,
            position: {
                x: 0.5,
                y: 0.5
            },
            text: "PLAY OFFLINE",
            size: '10em',
            color: "#c2860f",
            clickColor: '#fff',
            hoverColor: '#ffac05',
            onClick: (pointer) => {
                this.scene.start('Test');
            }
        });
        */

        this.buttons = [];

        this.background = this.add.image(600, 450, 'main-menu-background');
        this.background.scale = 1;

        this.play = this.add.sprite(600, 200, 'play-button');
        this.play.setInteractive({cursor: 'pointer'})
        this.play.on('pointerup', (pointer) => {
            this.scene.start('Test');
        });
    }
    update(time, delta) {
        super.update(time, delta);
    }
}