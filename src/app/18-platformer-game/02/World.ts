import { CollidableObject } from "./CollidableObject";
import { Player } from "./Player";

export class World {
    private _backgroundColor: string = 'rgba(40, 48, 56, 0.25)';
    private _friction: number = 0.9;
    private _gravity: number = 3;
    private _width: number = 128;
    private _height: number = 72;
    private _player: Player = new Player();

    public backgroundColor = (): string => this._backgroundColor;
    public width = (): number => this._width;
    public height = (): number => this._height;
    public player = (): Player => this._player;

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
