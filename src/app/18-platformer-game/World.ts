import { CollidableObject } from "./CollidableObject";
import { Collider } from "./Collider";
import { Player } from "./Player";

export type TileSetFrame = {
    x: number;
    y: number;
    width: number;
    height: number;
    offsetX: number;
    offsetY: number;
};

type TileSet = {
    columns: number;
    tileSize: number;
    frames: TileSetFrame[];
};

export class World {
    private _friction: number;
    private _gravity: number;
    private _player: Player = new Player();

    private _columns: number = 12;
    private _rows: number = 9;

    private _tileSet: TileSet = {
        columns: 8,
        tileSize: 16,
        frames: [
            { x: 115, y:  96, width: 13, height: 16, offsetX: 0, offsetY: -2 },
            { x:  50, y:  96, width: 13, height: 16, offsetX: 0, offsetY: -2 },
            { x: 102, y:  96, width: 13, height: 16, offsetX: 0, offsetY: -2 },
            { x:  89, y:  96, width: 13, height: 16, offsetX: 0, offsetY: -2 },
            { x:  76, y:  96, width: 13, height: 16, offsetX: 0, offsetY: -2 },
            { x:  63, y:  96, width: 13, height: 16, offsetX: 0, offsetY: -2 },
            { x:   0, y: 112, width: 13, height: 16, offsetX: 0, offsetY: -2 },
            { x:  65, y: 112, width: 13, height: 16, offsetX: 0, offsetY: -2 },
            { x:  13, y: 112, width: 13, height: 16, offsetX: 0, offsetY: -2 },
            { x:  26, y: 112, width: 13, height: 16, offsetX: 0, offsetY: -2 },
            { x:  39, y: 112, width: 13, height: 16, offsetX: 0, offsetY: -2 },
            { x:  52, y: 112, width: 13, height: 16, offsetX: 0, offsetY: -2 }
        ]
    };

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

    private _width: number = this._tileSet.tileSize * this._columns;
    private _height: number = this._tileSet.tileSize * this._rows;

    constructor(friction: number = 0.9, gravity: number = 3) {
        this._friction = friction;
        this._gravity = gravity;
    }

    public width = (): number => this._width;
    public height = (): number => this._height;
    public player = (): Player => this._player;
    public map = (): number[] => this._map;
    public columns = (): number => this._columns;
    public tileSet = (): TileSet => this._tileSet;

    public update = (): void => {
        this._player.updatePosition(this._gravity, this._friction);
        this.collideObject(this._player);
        this._player.updateAnimation();
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

        const tileSize: number = this._tileSet.tileSize;

        {
            const top: number = Math.floor(object.getTop() / tileSize);
            const left: number = Math.floor(object.getLeft() / tileSize);
            const value: number = this._collisionMap[top * this._columns + left];
            Collider.collide(value, this._player, left * tileSize, top * tileSize, tileSize);
        }
        {
            const top: number = Math.floor(object.getTop() / tileSize);
            const right: number = Math.floor(object.getRight() / tileSize);
            const value: number = this._collisionMap[top * this._columns + right];
            Collider.collide(value, this._player, right * tileSize, top * tileSize, tileSize);
        }
        {
            const bottom: number = Math.floor(object.getBottom() / tileSize);
            const left: number = Math.floor(object.getLeft() / tileSize);
            const value: number = this._collisionMap[bottom * this._columns + left];
            Collider.collide(value, this._player, left * tileSize, bottom * tileSize, tileSize);
        }
        {
            const bottom: number = Math.floor(object.getBottom() / tileSize);
            const right: number = Math.floor(object.getRight() / tileSize);
            const value: number = this._collisionMap[bottom * this._columns + right];
            Collider.collide(value, this._player, right * tileSize, bottom * tileSize, tileSize);
        }
    };
}
