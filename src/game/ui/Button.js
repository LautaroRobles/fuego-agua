export default class Button {
    constructor(config) {
        this.scene = config.scene;
        this.position = config.position;
        this.text = config.text;
        this.size = config.size;
        this.color = config.color;
        this.clickColor = config.clickColor;
        this.hoverColor = config.hoverColor;
        this.onClick = config.onClick;
        
        this.clicked = false;

        this.createText();
    }
    createText() {
        
        let x = this.scene.game.config.width * this.position.x;
        let y = this.scene.game.config.height * this.position.y;

        this.textSprite = this.scene.add.text(x, y, this.text, {
            fontFamily: 'Dongle',
            fontSize: this.size,
            color: this.color,
        });
        this.textSprite.setOrigin(0.5);
        this.textSprite.setInteractive({cursor: 'pointer'})
        this.textSprite.setDepth(4);
        this.textSprite.on('pointerdown', (pointer) => {
            this.textSprite.setColor(this.clickColor);
            this.clicked = true;
        });
        this.textSprite.on('pointerover', (pointer) => {
            this.textSprite.setColor(this.hoverColor);
        });
        this.textSprite.on('pointerout', (pointer) => {
            this.textSprite.setColor(this.color);
            this.clicked = false;
        });
        this.textSprite.on('pointerup', (pointer) => {
            this.textSprite.setColor(this.color);
            if(this.clicked) {
                this.onClick(pointer);
            }
        });
    }
}