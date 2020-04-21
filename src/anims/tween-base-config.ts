import { GameObjects, Types } from "phaser";

export const getBasicTweenConfig = (
    targets: GameObjects.Image
): Types.Tweens.TweenBuilderConfig => ({
    targets,
    ease: "Linear",
    repeat: -1, // -1: infinity
    yoyo: true,
});
