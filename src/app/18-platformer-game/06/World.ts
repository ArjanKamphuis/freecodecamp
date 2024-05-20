import { MoveableObject } from "./MoveableObject";
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

type Door = {
    x: number;
    y: number;
    width: number;
    height: number;
    destination_zone: string;
    destination_x: number;
    destination_y: number;
};

export type Zone = {
    doors: Door[];
    columns: number;
    rows: number;
    graphical_map: number[];
    collision_map: number[];
    id: string;
};

export class World {
    private _friction: number;
    private _gravity: number;
    private _player: Player = new Player(32, 76);
    private _zone: Zone | null = null;
    private _newZoneId: string = '';

    private _tileSet: TileSet = {
        columns: 8,
        tileSize: 16,
        frames: [
            { x: 115, y:  96, width: 13, height: 16, offsetX: 0, offsetY: -4 },
            { x:  50, y:  96, width: 13, height: 16, offsetX: 0, offsetY: -4 },
            { x: 102, y:  96, width: 13, height: 16, offsetX: 0, offsetY: -4 },
            { x:  89, y:  96, width: 13, height: 16, offsetX: 0, offsetY: -4 },
            { x:  76, y:  96, width: 13, height: 16, offsetX: 0, offsetY: -4 },
            { x:  63, y:  96, width: 13, height: 16, offsetX: 0, offsetY: -4 },
            { x:   0, y: 112, width: 13, height: 16, offsetX: 0, offsetY: -4 },
            { x:  65, y: 112, width: 13, height: 16, offsetX: 0, offsetY: -4 },
            { x:  13, y: 112, width: 13, height: 16, offsetX: 0, offsetY: -4 },
            { x:  26, y: 112, width: 13, height: 16, offsetX: 0, offsetY: -4 },
            { x:  39, y: 112, width: 13, height: 16, offsetX: 0, offsetY: -4 },
            { x:  52, y: 112, width: 13, height: 16, offsetX: 0, offsetY: -4 }
        ]
    };

    constructor(friction: number = 0.85, gravity: number = 2) {
        this._friction = friction;
        this._gravity = gravity;
    }

    public width = (): number => this._tileSet.tileSize * (this._zone?.columns || 0);
    public height = (): number => this._tileSet.tileSize * (this._zone?.rows || 0);
    public player = (): Player => this._player;
    public map = (): number[] => this._zone?.graphical_map || [];
    public columns = (): number => this._zone?.columns || 0;
    public tileSet = (): TileSet => this._tileSet;
    public newZoneId = (): string => this._newZoneId;

    public update = (): void => {
        if (!this._zone) return;
        this._player.updatePosition(this._gravity, this._friction);
        this.collideObject(this._player);
        for (let i = 0; i < this._zone.doors.length; i++) {
            const door: Door = this._zone.doors[i];
            if (this.doorCollideObject(door, this._player)) {
                this._newZoneId = door.destination_zone;
            }
        }
        this._player.updateAnimation();
    };

    public changeZone = (zone: Zone): void => {
        if (this._newZoneId && this._zone) {
            const door: Door = this._zone.doors.find(door => door.destination_zone === this._newZoneId)!;
            if (door.destination_x !== -1) {
                this._player.setCenterX(door.destination_x);
                this._player.setOldCenterX(door.destination_x);
            }
            if (door.destination_y !== -1) {
                this._player.setCenterY(door.destination_y);
                this._player.setOldCenterY(door.destination_y);
            }
            this._newZoneId = '';
        }
        this._zone = zone;
    };

    private collideObject = (object: MoveableObject): void => {
        if (!this._zone) return;
        const tileSize: number = this._tileSet.tileSize;

        {
            const top: number = Math.floor(object.getTop() / tileSize);
            const left: number = Math.floor(object.getLeft() / tileSize);
            const value: number = this._zone.collision_map[top * this._zone.columns + left];
            Collider.collide(value, this._player, left * tileSize, top * tileSize, tileSize);
        }
        {
            const top: number = Math.floor(object.getTop() / tileSize);
            const right: number = Math.floor(object.getRight() / tileSize);
            const value: number = this._zone.collision_map[top * this._zone.columns + right];
            Collider.collide(value, this._player, right * tileSize, top * tileSize, tileSize);
        }
        {
            const bottom: number = Math.floor(object.getBottom() / tileSize);
            const left: number = Math.floor(object.getLeft() / tileSize);
            const value: number = this._zone.collision_map[bottom * this._zone.columns + left];
            Collider.collide(value, this._player, left * tileSize, bottom * tileSize, tileSize);
        }
        {
            const bottom: number = Math.floor(object.getBottom() / tileSize);
            const right: number = Math.floor(object.getRight() / tileSize);
            const value: number = this._zone.collision_map[bottom * this._zone.columns + right];
            Collider.collide(value, this._player, right * tileSize, bottom * tileSize, tileSize);
        }
    };

    private doorCollideObject = (door: Door, object: MoveableObject): boolean => {
        const centerX: number = object.getCenterX();
        const centerY: number = object.getCenterY();
        return !(centerX < door.x || centerX > (door.x + door.width) || centerY < door.y || centerY > (door.y + door.height));
    };
}
