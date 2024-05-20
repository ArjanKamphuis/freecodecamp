import { CollidableObject } from "./CollidableObject";

export class Player extends CollidableObject {
    private _colors: string[] = ['#404040', '#F0F0F0'];
    private _jumping: boolean = true;

    constructor() {
        super(100, 50, 12, 12);
    }

    public getColors = (): string[] => this._colors;

    public moveLeft = (): void => { this._velocityX -= 0.5; };
    public moveRight = (): void => { this._velocityX += 0.5; };
    public stopJump = (): void => { this._jumping = false; };

    public jump = (): void => {
        if (!this._jumping) {
            this._jumping = true;
            this._velocityY -= 20;
        }
    };
}
