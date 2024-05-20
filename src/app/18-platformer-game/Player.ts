import { Animator, FrameMap } from "./Animator";
import { CollidableObject } from "./CollidableObject";

type PlayerDirection = 'left' | 'right';

export class Player extends CollidableObject {
    private _jumping: boolean = true;
    private _direction: PlayerDirection = 'left';
    private _frameMap: FrameMap = new Map();
    private _animator: Animator;

    constructor() {
        super(100, 100, 7, 14);
        
        this._frameMap.set('idle-left', [0]);
        this._frameMap.set('jump-left', [1]);
        this._frameMap.set('move-left', [2, 3, 4, 5]);
        this._frameMap.set('idle-right', [6]);
        this._frameMap.set('jump-right', [7]);
        this._frameMap.set('move-right', [8, 9, 10, 11]);

        this._animator = new Animator(this._frameMap.get('idle-left')!, 10);        
    }

    public frameIndex = (): number => this._animator.frameIndex();

    public updateAnimation = (): void => {
        if (this._velocityY < 0) {
            if (this._direction === 'left') this._animator.changeFrameSet(this._frameMap.get('jump-left')!, 'pause');
            else this._animator.changeFrameSet(this._frameMap.get('jump-right')!, 'pause');
        } else if (this._direction === 'left') {
            if (this._velocityX < -0.1) this._animator.changeFrameSet(this._frameMap.get('move-left')!, 'loop', 5);
            else this._animator.changeFrameSet(this._frameMap.get('idle-left')!, 'pause');
        } else if (this._direction === 'right') {
            if (this._velocityX > 0.1) this._animator.changeFrameSet(this._frameMap.get('move-right')!, 'loop', 5);
            else this._animator.changeFrameSet(this._frameMap.get('idle-right')!, 'pause');
        }
        this._animator.animate();
    };

    public moveLeft = (): void => {
        this._direction = 'left';
        this._velocityX -= 0.55;
    };
    public moveRight = (): void => {
        this._direction = 'right';
        this._velocityX += 0.55;
    };

    public stopJump = (): void => {
        this._jumping = false;
    };
    public jump = (): void => {
        if (!this._jumping) {
            this._jumping = true;
            this._velocityY -= 20;
        }
    };
}
