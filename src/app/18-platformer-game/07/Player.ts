import { AnimatedObject } from "./AnimatedObject";
import { FrameMap } from "./Animator";
import { IMoveableObject } from "./IMoveableObject";

type PlayerDirection = 'left' | 'right';

const frameMap: FrameMap = new Map();
frameMap.set('idle-left', [0]);
frameMap.set('jump-left', [1]);
frameMap.set('move-left', [2, 3, 4, 5]);
frameMap.set('idle-right', [6]);
frameMap.set('jump-right', [7]);
frameMap.set('move-right', [8, 9, 10, 11]);

export class Player extends AnimatedObject implements IMoveableObject {
    private _velocityX: number = 0;
    private _velocityY: number = 0;
    private _velocityMax: number;
    private _oldPosX: number;
    private _oldPosY: number;

    private _jumping: boolean = true;
    private _direction: PlayerDirection = 'left';

    constructor(posX: number, posY: number, velocitymax: number = 15) {
        super(posX, posY, 7, 12, frameMap, 'idle-left', 10);
        this._velocityMax = velocitymax;
        this._oldPosX = posX;
        this._oldPosY = posY;
    }
    
    public getVelocityX = (): number => this._velocityX;
    public getVelocityY = (): number => this._velocityY;
    public setVelocityX = (value: number): void => { this._velocityX = value; };
    public setVelocityY = (value: number): void => { this._velocityY = value; };

    public getOldBottom = (): number => this._oldPosY + this._height;
    public getOldCenterX = (): number => this._oldPosX + this._width * 0.5;
    public getOldCenterY = (): number => this._oldPosY + this._height * 0.5;
    public getOldLeft = (): number => this._oldPosX;
    public getOldRight = (): number => this._oldPosX + this._width;
    public getOldTop = (): number => this._oldPosY;
    
    public setOldBottom = (value: number): void => { this._oldPosY = value - this._height; };
    public setOldCenterX = (value: number): void => { this._oldPosX = value - this._width * 0.5; };
    public setOldCenterY = (value: number): void => { this._oldPosY = value - this._height * 0.5; };
    public setOldLeft = (value: number): void => { this._oldPosX = value; };
    public setOldRight = (value: number): void => { this._oldPosX = value - this._width; };
    public setOldTop = (value: number): void => { this._oldPosY = value; };

    public updatePosition = (gravity: number, friction: number): void => {
        this._oldPosX = this._posX;
        this._oldPosY = this._posY;

        this._velocityX *= friction;
        this._velocityY += gravity;

        if (Math.abs(this._velocityX) > this._velocityMax) {
            this._velocityX = this._velocityMax * Math.sign(this._velocityX);
        }
        if (Math.abs(this._velocityY) > this._velocityMax) {
            this._velocityY = this._velocityMax * Math.sign(this._velocityY);
        }

        this._posX += this._velocityX;
        this._posY += this._velocityY;
    };

    public updateAnimation = (): void => {
        if (this._velocityY < 0) {
            if (this._direction === 'left') this._animator.changeFrameSet(this._frameMap.get('jump-left')!, 'pause');
            else this._animator.changeFrameSet(this._frameMap.get('jump-right')!, 'pause');
        } else {
            if (this._direction === 'left') {
                if (this._velocityX < -0.1) this._animator.changeFrameSet(this._frameMap.get('move-left')!, 'loop', 5);
                else this._animator.changeFrameSet(this._frameMap.get('idle-left')!, 'pause');
            } else {
                if (this._velocityX > 0.1) this._animator.changeFrameSet(this._frameMap.get('move-right')!, 'loop', 5);
                else this._animator.changeFrameSet(this._frameMap.get('idle-right')!, 'pause');
            }
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
        if (!this._jumping && this._velocityY < 10) {
            this._jumping = true;
            this._velocityY -= 13;
        }
    };
}
