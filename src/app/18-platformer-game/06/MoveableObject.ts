export abstract class MoveableObject {
    protected _posX: number;
    protected _posY: number;
    protected _width: number;
    protected _height: number;
    protected _velocityMax: number;
    protected _velocityX: number;
    protected _velocityY: number;
    protected _oldPosX: number;
    protected _oldPosY: number;

    constructor(posX: number, posY: number, width: number, height: number, velocityMax: number = 15, velocityX: number = 0, velocityY: number = 0) {
        this._posX = posX;
        this._posY = posY;
        this._width = width;
        this._height = height;
        this._velocityMax = velocityMax;
        this._velocityX = velocityX;
        this._velocityY = velocityY;
        this._oldPosX = posX;
        this._oldPosY = posY;
    }

    public getWidth = (): number => this._width;
    public getHeight = (): number => this._height;
    public getVelocityX = (): number => this._velocityX;
    public getVelocityY = (): number => this._velocityY;

    public getBottom = (): number => this._posY + this._height;
    public getCenterX = (): number => this._posX + this._width * 0.5;
    public getCenterY = (): number => this._posY + this._height * 0.5;
    public getLeft = (): number => this._posX;
    public getRight = (): number => this._posX + this._width;
    public getTop = (): number => this._posY;
    public getOldBottom = (): number => this._oldPosY + this._height;
    public getOldCenterX = (): number => this._oldPosX + this._width * 0.5;
    public getOldCenterY = (): number => this._oldPosY + this._height * 0.5;
    public getOldLeft = (): number => this._oldPosX;
    public getOldRight = (): number => this._oldPosX + this._width;
    public getOldTop = (): number => this._oldPosY;

    public setWidth = (value: number): void => { this._width = value; };
    public setHeight = (value: number): void => { this._height = value; };
    public setVelocityX = (value: number): void => { this._velocityX = value; };
    public setVelocityY = (value: number): void => { this._velocityY = value; };

    public setBottom = (value: number): void => { this._posY = value - this._height; };
    public setCenterX = (value: number): void => { this._posX = value - this._width * 0.5; };
    public setCenterY = (value: number): void => { this._posY = value - this._height * 0.5; };
    public setLeft = (value: number): void => { this._posX = value; };
    public setRight = (value: number): void => { this._posX = value - this._width; };
    public setTop = (value: number): void => { this._posY = value; };
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
}
