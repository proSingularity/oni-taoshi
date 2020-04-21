import { GameObjects, Scene } from "phaser";
import { TextConfig } from "../styles/Text";

export class TimerText extends GameObjects.Text {
    private timer: number = 0;

    constructor(scene: Scene, x = 50, y = 100, style = TextConfig.lg) {
        super(scene, x, y, "", {});
        this.setStyle(style);
        scene.add.existing(this);
    }

    public setTimer(timer: number) {
        this.timer = timer;
    }

    public getTimer() {
        return this.timer;
    }

    public update() {
        const mins = Math.floor(this.timer / 60);
        const secs = this.timer % 60;
        const minsStr = mins <= 9 ? `0${mins}` : mins.toString();
        const secsStr = secs <= 9 ? `0${secs}` : secs.toString();
        this.setText(`${minsStr}:${secsStr}`);
    }
}
