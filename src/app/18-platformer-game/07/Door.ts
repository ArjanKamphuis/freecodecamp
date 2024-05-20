import { DoorImport } from "./World";
import { WorldObject } from "./WorldObject";

export class Door extends WorldObject {
    private _destinationZone: string;
    private _destinationX: number;
    private _destinationY: number;

    constructor(door: DoorImport) {
        super(door.x, door.y, door.width, door.height);
        this._destinationZone = door.destination_zone;
        this._destinationX = door.destination_x;
        this._destinationY = door.destination_y;
    }

    public destinationZone = (): string => this._destinationZone;
    public destinationX = (): number => this._destinationX;
    public destinationY = (): number => this._destinationY;
}