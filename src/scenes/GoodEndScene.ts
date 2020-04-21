import { Scene } from "phaser";
import { TimerText } from "../components/TimerText";
import { TextConfig } from "../styles/Text";

export class GoodEndScene extends Scene {
    private timer: number;

    constructor() {
        super({
            key: "GoodEndScene",
        });
    }

    public init({ timer }: { timer: number }) {
        this.timer = timer;
    }

    public create(): void {
        this.add
            .image(0, 0, "oni-defeated")
            .setOrigin(0)
            .setDisplaySize(this.scale.width, this.scale.height);

        const timer = new TimerText(
            this,
            this.scale.width / 2,
            (this.scale.height * 3) / 4,
            TextConfig.xl
        ).setOrigin(0.5);
        timer.setTimer(this.timer);
        timer.update();
    }
}
