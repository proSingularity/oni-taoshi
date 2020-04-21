import { GameObjects, Scene } from "phaser";
import { Color, toHex } from "../styles/Color";

const Cfg = {
    x: 50,
    y: 20,
    barToBoxOffset: 10,
    xEnd: 100,
};

export class HealthBar {
    private health: number = 100000000;
    private maxHealth: number = 10000000;
    private progressBar: GameObjects.Graphics;

    constructor(private scene: Scene) {
        const progressBox = scene.add.graphics();
        progressBox.fillStyle(toHex(Color.DarkGrey), 0.8);
        progressBox.fillRect(
            Cfg.x,
            Cfg.y,
            this.scene.scale.width - Cfg.xEnd,
            50
        );
        this.progressBar = scene.add.graphics();
    }

    public setHealth(health: number) {
        this.health = health;
    }

    public setMaxHealth(maxHealth: number) {
        this.maxHealth = maxHealth;
    }

    public update() {
        this.getProgressBarFiller(this.health / this.maxHealth);
    }

    private getProgressBarFiller(count: number) {
        this.progressBar.clear();
        this.progressBar.fillStyle(toHex(Color.Red));
        this.progressBar.fillRect(
            Cfg.x + Cfg.barToBoxOffset,
            Cfg.y + Cfg.barToBoxOffset,
            (this.scene.scale.width - Cfg.xEnd) * count,
            30
        );
    }
}
