import { AnimatedObject } from "./AnimatedObject";
import { FrameMap } from "./Animator";

const frameMap: FrameMap = new Map();
frameMap.set('wave', [14, 15, 16, 15]);

export class Grass extends AnimatedObject {
    constructor(posX: number, posY: number) {
        super(posX, posY, 0, 0, frameMap, 'wave', 15);
    }
    public updateAnimation = (): void => {}
}
