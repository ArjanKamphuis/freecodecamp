import { CollidableObject } from "./CollidableObject";
import { Collider } from "./Collider";
import { Player } from "./Player";

export class World {
    private _friction: number;
    private _gravity: number;
    private _player: Player = new Player();

    private _columns: number = 12;
    private _rows: number = 9;
    private _tileSize: number = 16;

    private _map: number[] = [
        48, 17, 17, 17, 49, 48, 18, 19, 16, 17, 35, 36,
        10, 39, 39, 39, 16, 18, 39, 31, 31, 31, 39, 7,
        10, 31, 39, 31, 31, 31, 39, 12, 5, 5, 28, 1,
        35, 6, 39, 39, 31, 39, 39, 19, 39, 39, 8, 9,
        2, 31, 31, 47, 39, 47, 39, 31, 31, 4, 36, 25,
        10, 39, 39, 31, 39, 39, 39, 31, 31, 31, 39, 37,
        10, 39, 31, 4, 14, 6, 39, 39, 3, 39, 0, 42,
        49, 2, 31, 31, 11, 39, 39, 31, 11, 0, 42, 9,
        8, 40, 27, 13, 37, 27, 13, 3, 22, 34, 9, 24
    ];

    private _collisionMap: number[] = [
        0, 4, 4, 4, 0, 0, 4, 4, 4, 4, 4, 0,
        2, 0, 0, 0, 12, 6, 0, 0, 0, 0, 0, 8,
        2, 0, 0, 0, 0, 0, 0, 9, 5, 5, 1, 0,
        0, 7, 0, 0, 0, 0, 0, 14, 0, 0, 8, 0,
        2, 0, 0, 1, 0, 1, 0, 0, 0, 13, 4, 0,
        2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8,
        2, 0, 0, 13, 1, 7, 0, 0, 11, 0, 9, 0,
        0, 3, 0, 0, 10, 0, 0, 0, 8, 1, 0, 0,
        0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0
    ];

    private _width: number = this._tileSize * this._columns;
    private _height: number = this._tileSize * this._rows;

    constructor(friction: number = 0.9, gravity: number = 3) {
        this._friction = friction;
        this._gravity = gravity;
    }

    public width = (): number => this._width;
    public height = (): number => this._height;
    public player = (): Player => this._player;
    public map = (): number[] => this._map;
    public columns = (): number => this._columns;

    public update = (): void => {
        this._player.setVelocityY(this._player.getVelocityY() + this._gravity);
        this._player.update();

        this._player.setVelocityX(this._player.getVelocityX() * this._friction);
        this._player.setVelocityY(this._player.getVelocityY() * this._friction);

        this.collideObject(this._player);
    };

    private collideObject = (object: CollidableObject): void => {
        if (object.getLeft() < 0) {
            object.setLeft(0);
            object.setVelocityX(0);
        } else if (object.getRight() > this._width) {
            object.setRight(this._width);
            object.setVelocityX(0);
        }

        if (object.getTop() < 0) {
            object.setTop(0);
            object.setVelocityY(0);
        } else if (object.getBottom() > this._height) {
            object.setBottom(this._height);
            object.setVelocityY(0);
            if (object instanceof Player) object.stopJump();
        }

        {
            const top: number = Math.floor(object.getTop() / this._tileSize);
            const left: number = Math.floor(object.getLeft() / this._tileSize);
            const value: number = this._collisionMap[top * this._columns + left];
            Collider.collide(value, this._player, left * this._tileSize, top * this._tileSize, this._tileSize);
        }
        {
            const top: number = Math.floor(object.getTop() / this._tileSize);
            const right: number = Math.floor(object.getRight() / this._tileSize);
            const value: number = this._collisionMap[top * this._columns + right];
            Collider.collide(value, this._player, right * this._tileSize, top * this._tileSize, this._tileSize);
        }
        {
            const bottom: number = Math.floor(object.getBottom() / this._tileSize);
            const left: number = Math.floor(object.getLeft() / this._tileSize);
            const value: number = this._collisionMap[bottom * this._columns + left];
            Collider.collide(value, this._player, left * this._tileSize, bottom * this._tileSize, this._tileSize);
        }
        {
            const bottom: number = Math.floor(object.getBottom() / this._tileSize);
            const right: number = Math.floor(object.getRight() / this._tileSize);
            const value: number = this._collisionMap[bottom * this._columns + right];
            Collider.collide(value, this._player, right * this._tileSize, bottom * this._tileSize, this._tileSize);
        }
    };
}
