import { Scene } from 'phaser';
import Button from '../ui/Button';
import Map from "../map/Map";

export default class MainMenu extends Scene {
    constructor() {
        super({key: 'MainMenu'});
    }
    create() {
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
        new Button({
            scene: this,
            position: {
                x: 0.5,
                y: 0.6
            },
            text: "PLAY ONLINE",
            size: '6em',
            color: "#c2860f",
            clickColor: '#fff',
            hoverColor: '#ffac05',
            onClick: (pointer) => {
                //console.log("clicked");
            }
        });
        new Button({
            scene: this,
            position: {
                x: 0.5,
                y: 0.68
            },
            text: "OPCIONES",
            size: '6em',
            color: "#c2860f",
            clickColor: '#fff',
            hoverColor: '#ffac05',
            onClick: (pointer) => {
                //console.log("clicked");
            }
        });
    }
    update(time, delta) {
        super.update(time, delta);
    }
}