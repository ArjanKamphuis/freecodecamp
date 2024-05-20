type AnimatorMode = 'loop' | 'pause';
type FrameType = 'idle-left' | 'jump-left' | 'move-left' | 'idle-right' | 'jump-right' | 'move-right';
type FrameSet = number[];

export type FrameMap = Map<FrameType, FrameSet>;

export class Animator {
    private _count: number = 0;
    private _frameIndex: number = 0;
    private _mode: AnimatorMode = 'pause';

    private _frameSet: FrameSet;
    private _delay: number;

    constructor(frameSet: FrameSet, delay: number) {
        this._frameSet = frameSet;
        this._delay = delay >= 1 ? delay : 0;
    }

    public frameIndex = (): number => this._frameSet[this._frameIndex];

    public animate = (): void => {
        switch (this._mode) {
            case 'loop': this.loop(); break;
            case 'pause': break;
        }
    };

    public changeFrameSet = (frameSet: FrameSet, mode: AnimatorMode, delay: number = 10, frameIndex: number = 0): void => {
        if (this._frameSet === frameSet) return;

        this._count = 0;
        this._delay = delay;
        this._frameSet = frameSet;
        this._frameIndex = frameIndex;
        this._mode = mode;
    }

    private loop = (): void => {
        this._count++;
        while (this._count > this._delay) {
            this._count -= this._delay;
            this._frameIndex = (this._frameIndex + 1) % this._frameSet.length;
        }
    };
}
