import { CollidableObject } from "./CollidableObject";
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
        10, 39, 39, 39, 16, 18, 39, 31, 31, 31, 39,  7,
        10, 31, 39, 31, 31, 31, 39, 12,  5,  5, 28,  1,
        35,  6, 39, 39, 31, 39, 39, 19, 39, 39,  8,  9,
         2, 31, 31, 47, 39, 47, 39, 31, 31,  4, 36, 25,
        10, 39, 39, 31, 39, 39, 39, 31, 31, 31, 39, 37,
        10, 39, 31,  4, 14,  6, 39, 39,  3, 39,  0, 42,
        49,  2, 31, 31, 11, 39, 39, 31, 11,  0, 42,  9,
         8, 40, 27, 13, 37, 27, 13,  3, 22, 34,  9, 24
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
        if (object.getPosX() < 0) {
            object.setPosX(0);
            object.setVelocityX(0);
        } else if (object.getPosX() + object.getWidth() > this._width) {
            object.setPosX(this._width - object.getWidth());
            object.setVelocityX(0);
        }

        if (object.getPosY() < 0) {
            object.setPosY(0);
            object.setVelocityY(0);
        } else if (object.getPosY() + object.getHeight() > this._height) {
            object.setPosY(this._height - object.getHeight());
            object.setVelocityY(0);
            if (object instanceof Player) object.stopJump();
        }
    };
}
