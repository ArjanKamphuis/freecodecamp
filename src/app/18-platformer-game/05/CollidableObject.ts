export abstract class CollidableObject {
    protected _posX: number;
    protected _posY: number;
    protected _width: number;
    protected _height: number;
    protected _velocityX: number;
    protected _velocityY: number;
    protected _oldPosX: number;
    protected _oldPosY: number;

    constructor(posX: number, posY: number, width: number, height: number, velocityX: number = 0, velocityY: number = 0) {
        this._posX = posX;
        this._posY = posY;
        this._width = width;
        this._height = height;
        this._velocityX = velocityX;
        this._velocityY = velocityY;
        this._oldPosX = posX;
        this._oldPosY = posY;
    }

    public getPosX = (): number => this._posX;
    public getPosY = (): number => this._posY;
    public getWidth = (): number => this._width;
    public getHeight = (): number => this._height;
    public getVelocityX = (): number => this._velocityX;
    public getVelocityY = (): number => this._velocityY;

    public getBottom = (): number => this._posY + this._height;
    public getLeft = (): number => this._posX;
    public getRight = (): number => this._posX + this._width;
    public getTop = (): number => this._posY;
    public getOldBottom = (): number => this._oldPosY + this._height;
    public getOldLeft = (): number => this._oldPosX;
    public getOldRight = (): number => this._oldPosX + this._width;
    public getOldTop = (): number => this._oldPosY;

    public setPosX = (value: number): void => { this._posX = value; };
    public setPosY = (value: number): void => { this._posY = value; };
    public setWidth = (value: number): void => { this._width = value; };
    public setHeight = (value: number): void => { this._height = value; };
    public setVelocityX = (value: number): void => { this._velocityX = value; };
    public setVelocityY = (value: number): void => { this._velocityY = value; };

    public setBottom = (value: number): void => { this._posY = value - this._height; };
    public setLeft = (value: number): void => { this._posX = value; };
    public setRight = (value: number): void => { this._posX = value - this._width; };
    public setTop = (value: number): void => { this._posY = value; };
    public setOldBottom = (value: number): void => { this._oldPosY = value - this._height; };
    public setOldLeft = (value: number): void => { this._oldPosX = value; };
    public setOldRight = (value: number): void => { this._oldPosX = value - this._width; };
    public setOldTop = (value: number): void => { this._oldPosY = value; };

    public updatePosition = (gravity: number, friction: number): void => {
        this._oldPosX = this._posX;
        this._oldPosY = this._posY;

        this._velocityY += gravity;

        this._posX += this._velocityX;
        this._posY += this._velocityY;

        this._velocityX *= friction;
        this._velocityY *= friction;
    };
}
