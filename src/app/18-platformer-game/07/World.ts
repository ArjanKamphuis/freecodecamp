import { Collider } from "./Collider";
import { Player } from "./Player";
import { Carrot } from "./Carrot";
import { Grass } from "./Grass";
import { Door } from "./Door";
import { IMoveableObject } from "./IMoveableObject";

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

export type DoorImport = {
    x: number;
    y: number;
    width: number;
    height: number;
    destination_zone: string;
    destination_x: number;
    destination_y: number;
};

export type Zone = {
    carrots: number[][];
    grass: number[][];
    doors: DoorImport[];
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
    private _doors: Door[] = [];
    private _carrots: Carrot[] = [];
    private _grass: Grass[] = [];
    private _collectedCarrotCount: number = 0;
    private _gameFinished: boolean = false;

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
            { x:  52, y: 112, width: 13, height: 16, offsetX: 0, offsetY: -4 },
            { x:  81, y: 112, width: 14, height: 16, offsetX: 0, offsetY:  0 },
            { x:  96, y: 112, width: 16, height: 16, offsetX: 0, offsetY:  0 },
            { x: 112, y: 115, width: 16, height:  4, offsetX: 0, offsetY:  0 },
            { x: 112, y: 124, width: 16, height:  4, offsetX: 0, offsetY:  0 },
            { x: 112, y: 119, width: 16, height:  4, offsetX: 0, offsetY:  0 }
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
    public carrrots = (): Carrot[] => this._carrots;
    public grass = (): Grass[] => this._grass;
    public collectedCarrotCount = (): number => this._collectedCarrotCount;

    public update = (): void => {
        if (!this._zone) return;
        this._player.updatePosition(this._gravity, this._friction);
        this.detectWorldCollision(this._player);

        this._carrots.forEach(carrot => {
            if (!carrot.collected()) {
                carrot.updatePosition();
                carrot.animate();
                if (carrot.detectBoxCollision(this._player)) {
                    carrot.collect();
                    this._collectedCarrotCount++;
                }
            }
        });

        this._doors.forEach(door => {
            if (door.detectCenterCollision(this._player)) {
                this._newZoneId = door.destinationZone();
            }
        });

        this._grass.forEach(grass => grass.animate());

        this._player.updateAnimation();

        if (this._carrots.length > 0 && this._collectedCarrotCount === this._carrots.length) {
            this._gameFinished = true;
            this._newZoneId = '00';
        }
    };

    public changeZone = (zone: Zone): void => {
        if (this._newZoneId && this._zone) {
            if (this._gameFinished) {
                this._gameFinished = false;
                this._player.setLeft(32);
                this._player.setTop(76);
            } else {
                const door: Door = this._doors.find(door => door.destinationZone() === this._newZoneId)!;
                if (door.destinationX() !== -1) {
                    this._player.setCenterX(door.destinationX());
                    this._player.setOldCenterX(door.destinationX());
                }
                if (door.destinationY() !== -1) {
                    this._player.setCenterY(door.destinationY());
                    this._player.setOldCenterY(door.destinationY());
                }
            }
            this._newZoneId = '';
        }
        this._zone = zone;
        this._collectedCarrotCount = 0;

        this._doors = [];
        this._carrots = [];
        this._grass = [];
        
        zone.doors.forEach(door => this._doors.push(new Door(door)));
        zone.carrots.forEach(coords => this._carrots.push(new Carrot(coords[0] * this._tileSet.tileSize + 5, coords[1] * this._tileSet.tileSize - 2)));
        zone.grass.forEach(coords => this._grass.push(new Grass(coords[0] * this._tileSet.tileSize, coords[1] * this._tileSet.tileSize + 12)));
    };

    private detectWorldCollision = (object: IMoveableObject): void => {
        if (!this._zone) return;
        const tileSize: number = this._tileSet.tileSize;

        {
            const top: number = Math.floor(object.getTop() / tileSize);
            const left: number = Math.floor(object.getLeft() / tileSize);
            const value: number = this._zone.collision_map[top * this._zone.columns + left];
            Collider.collide(value, object, left * tileSize, top * tileSize, tileSize);
        }
        {
            const top: number = Math.floor(object.getTop() / tileSize);
            const right: number = Math.floor(object.getRight() / tileSize);
            const value: number = this._zone.collision_map[top * this._zone.columns + right];
            Collider.collide(value, object, right * tileSize, top * tileSize, tileSize);
        }
        {
            const bottom: number = Math.floor(object.getBottom() / tileSize);
            const left: number = Math.floor(object.getLeft() / tileSize);
            const value: number = this._zone.collision_map[bottom * this._zone.columns + left];
            Collider.collide(value, object, left * tileSize, bottom * tileSize, tileSize);
        }
        {
            const bottom: number = Math.floor(object.getBottom() / tileSize);
            const right: number = Math.floor(object.getRight() / tileSize);
            const value: number = this._zone.collision_map[bottom * this._zone.columns + right];
            Collider.collide(value, object, right * tileSize, bottom * tileSize, tileSize);
        }
    };
}
