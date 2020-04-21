import { random } from "lodash";
import { GameObjects, Scene } from "phaser";
import { getBasicTweenConfig } from "../anims/tween-base-config";
import { Color, toHex } from "../styles/Color";

export class Player extends GameObjects.Sprite {
    constructor(scene: Scene, public id: string) {
        super(
            scene,
            random(50, 300),
            random(150, 400),
            getRandomPlayerTexture()
        );
        scene.add.existing(this);
        this.setFlipX(true);
    }

    public hit() {
        this.scene.tweens.add({
            ...getBasicTweenConfig(this),
            duration: 30,
            x: this.x + 10,
            repeat: 0,
        });
    }

    public mark() {
        const graphics = this.scene.add.graphics({
            lineStyle: { width: 2, color: toHex(Color.YellowCorn) },
            fillStyle: { color: 0xff0000 },
        });
        const rect = new Phaser.Geom.Rectangle(
            this.x - this.width / 2,
            this.y - this.height / 2,
            this.width,
            this.height
        );
        graphics.strokeRectShape(rect);
    }
}

const getRandomPlayerTexture = () => {
    return `player0${random(4)}`;
};
