import { CollidableObject } from "./CollidableObject";

export class Player extends CollidableObject {
    private _color: string = '#FF0000';
    private _jumping: boolean = true;

    constructor() {
        super(100, 50, 16, 16, 0, 0);
    }

    public getColor = (): string => this._color;

    public moveLeft = (): void => { this._velocityX -= 0.5; };
    public moveRight = (): void => { this._velocityX += 0.5; };
    public stopJump = (): void => { this._jumping = false; };

    public jump = (): void => {
        if (!this._jumping) {
            this._color = `#${Math.floor(Math.random() * 16777216).toString(16)}`;
            if (this._color.length !== 7) {
                this._color = `${this._color.slice(0, 1)}0${this._color.slice(1,6)}`;
            }
        }

        this._jumping = true;
        this._velocityY -= 20;
    };
}
