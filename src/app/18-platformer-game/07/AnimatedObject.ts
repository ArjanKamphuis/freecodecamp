import { Animator, AnimatorMode, FrameMap, FrameSet, FrameType } from "./Animator";
import { WorldObject } from "./WorldObject";

export abstract class AnimatedObject extends WorldObject {
    protected _frameMap: FrameMap = new Map();
    protected _animator: Animator;

    constructor(posX: number, posY: number, width: number, height: number,
                frameMap: FrameMap, startingFrame: FrameType, delay: number,
                frameIndex: number = 0, mode: AnimatorMode = 'loop') {
        super(posX, posY, width, height);
        this._frameMap = frameMap;
        this._animator = new Animator(this._frameMap.get(startingFrame)!, delay, frameIndex, mode);
    }

    public frameIndex = (): number => this._animator.frameIndex();
    public animate = (): void => this._animator.animate();

    public abstract updateAnimation: () => void;
}