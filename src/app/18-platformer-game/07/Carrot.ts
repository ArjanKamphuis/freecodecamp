import { AnimatedObject } from "./AnimatedObject";
import { FrameMap } from "./Animator";

const frameMap: FrameMap = new Map();
frameMap.set('twirl', [12, 13]);

export class Carrot extends AnimatedObject {
    private static PI2: number = 2 * Math.PI;
    private _basePosX: number;
    private _basePosY: number;
    private _swingX: number = Math.random() * Carrot.PI2;
    private _swingY: number = this._swingX * 2;
    private _collected: boolean = false;

    constructor(posX: number, posY: number) {
        super(posX, posY, 7, 14 ,frameMap, 'twirl', 15, Math.floor(Math.random() * 2));
        this._basePosX = posX;
        this._basePosY = posY;
    }

    public collected = (): boolean => this._collected;

    public updatePosition = (): void => {
        if (this._collected) return;
        this._swingX = (this._swingX + 0.1) % Carrot.PI2;
        this._swingY = (this._swingY + 0.2) % Carrot.PI2;
        this._posX = this._basePosX + Math.cos(this._swingX) * 2;
        this._posY = this._basePosY + Math.sin(this._swingY);
    };

    public collect = (): void => { this._collected = true; };

    public updateAnimation = (): void => {};
}
