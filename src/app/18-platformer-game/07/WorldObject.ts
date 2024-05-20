export abstract class WorldObject {
    protected _posX: number;
    protected _posY: number;
    protected _width: number;
    protected _height: number;

    constructor(posX: number, posY: number, width: number, height: number) {
        this._posX = posX;
        this._posY = posY;
        this._width = width;
        this._height = height;
    }

    public getWidth = (): number => this._width;
    public getHeight = (): number => this._height;

    public getBottom = (): number => this._posY + this._height;
    public getCenterX = (): number => this._posX + this._width * 0.5;
    public getCenterY = (): number => this._posY + this._height * 0.5;
    public getLeft = (): number => this._posX;
    public getRight = (): number => this._posX + this._width;
    public getTop = (): number => this._posY;

    public setWidth = (value: number): void => { this._width = value; };
    public setHeight = (value: number): void => { this._height = value; };

    public setBottom = (value: number): void => { this._posY = value - this._height; };
    public setCenterX = (value: number): void => { this._posX = value - this._width * 0.5; };
    public setCenterY = (value: number): void => { this._posY = value - this._height * 0.5; };
    public setLeft = (value: number): void => { this._posX = value; };
    public setRight = (value: number): void => { this._posX = value - this._width; };
    public setTop = (value: number): void => { this._posY = value; };

    public detectBoxCollision = (other: WorldObject): boolean => {
        return !(this.getRight() < other.getLeft() ||
                 this.getBottom() < other.getTop() ||
                 this._posX > other.getRight() ||
                 this._posY > other.getBottom()
        );
    };

    public detectCenterCollision = (other: WorldObject): boolean => {
        return !(other.getCenterX() < this.getLeft() || other.getCenterX() > this.getRight() || other.getCenterY() < this.getTop() || other.getCenterY() > this.getBottom());
    };
}
