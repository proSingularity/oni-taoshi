import { Types } from "phaser";
import { LoadingScene } from "./scenes/LoadingScene";

export const gameConfig: Types.Core.GameConfig = {
    scene: LoadingScene,
    type: Phaser.AUTO,
    dom: {
        createContainer: true,
    },
    scale: {
        parent: "game",
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
};

export const connectionConfig = {
    socketUrl: "http://localhost:3000/",
};
