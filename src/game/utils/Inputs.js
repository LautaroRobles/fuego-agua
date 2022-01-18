export default class Inputs {
    constructor(scene, player) {
        this.input = scene.input;

        this.loadInputConfig(player);
    }
    loadInputConfig(player) {
        let P1 = {};
        let P2 = {};

        P1.LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        P1.RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        P1.UP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)

        P2.LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        P2.RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        P2.UP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)

        const players = [undefined, P1, P2];

        this.inputs = players[player];
    }
    isLeftPressed() {
        return this.inputs.LEFT.isDown;
    }
    isRightPressed() {
        return this.inputs.RIGHT.isDown;
    }
    isUpPressed() {
        return this.inputs.UP.isDown;
    }
}