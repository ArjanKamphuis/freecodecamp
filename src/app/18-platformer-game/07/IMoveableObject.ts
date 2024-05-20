import { WorldObject } from "./WorldObject";

export interface IMoveableObject extends WorldObject {
    getVelocityX: () => number;
    getVelocityY: () => number;
    setVelocityX: (value: number) => void;
    setVelocityY: (value: number) => void;

    getOldBottom: () => number;
    getOldCenterX: () => number;
    getOldCenterY: () => number;
    getOldLeft: () => number;
    getOldRight: () => number;
    getOldTop: () => number;
    
    setOldBottom: (value: number) => void;
    setOldCenterX: (value: number) => void;
    setOldCenterY: (value: number) => void;
    setOldLeft: (value: number) => void;
    setOldRight: (value: number) => void;
    setOldTop: (value: number) => void;

    updatePosition: (gravity: number, friction: number) => void;
}
