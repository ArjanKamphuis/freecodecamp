import { IMoveableObject } from "./IMoveableObject";
import { Player } from "./Player";

export class Collider {
    public static collide = (value: number, object: IMoveableObject, tileX: number, tileY: number, tileSize: number): void => {
        switch (value) {
            case 1: this.collidePlatformTop(object, tileY); break;
            case 2: this.collidePlatformRight(object, tileX + tileSize); break;
            case 3:
                if (this.collidePlatformTop(object, tileY)) return;
                this.collidePlatformRight(object, tileX + tileSize);
                break;
            case 4: this.collidePlatformBottom(object, tileY + tileSize); break;
            case 5:
                if (this.collidePlatformTop(object, tileY)) return;
                this.collidePlatformBottom(object, tileY + tileSize);
                break;
            case 6:
                if (this.collidePlatformRight(object, tileX + tileSize)) return;
                this.collidePlatformBottom(object, tileY + tileSize);
                break;
            case 7:
                if (this.collidePlatformTop(object, tileY)) return;
                if (this.collidePlatformRight(object, tileX + tileSize)) return;
                this.collidePlatformBottom(object, tileY + tileSize);
                break;
            case 8: this.collidePlatformLeft(object, tileX); break;
            case 9:
                if (this.collidePlatformTop(object, tileY)) return;
                this.collidePlatformLeft(object, tileX); break;
            case 10:
                if (this.collidePlatformLeft(object, tileX)) return;
                this.collidePlatformRight(object, tileX + tileSize);
                break;
            case 11:
                if (this.collidePlatformTop(object, tileY)) return;
                if (this.collidePlatformLeft(object, tileX)) return;
                this.collidePlatformRight(object, tileX + tileSize); break;
            case 12:
                if (this.collidePlatformLeft(object, tileX)) return;
                this.collidePlatformBottom(object, tileY + tileSize);
                break;
            case 13:
                if (this.collidePlatformTop(object, tileY)) return;
                if (this.collidePlatformLeft(object, tileX)) return;
                this.collidePlatformBottom(object, tileY + tileSize);
                break;
            case 14:
                if (this.collidePlatformLeft(object, tileX)) return;
                if (this.collidePlatformRight(object, tileX + tileSize)) return;
                this.collidePlatformBottom(object, tileY + tileSize);
                break;
            case 15:
                if (this.collidePlatformTop(object, tileY)) return;
                if (this.collidePlatformLeft(object, tileX)) return;
                if (this.collidePlatformRight(object, tileX + tileSize)) return;
                this.collidePlatformBottom(object, tileY + tileSize);
                break;
        }
    };

    private static collidePlatformBottom = (object: IMoveableObject, tileBottom: number): boolean => {
        if (object.getTop() < tileBottom && object.getOldTop() >= tileBottom) {
            object.setTop(tileBottom);
            object.setVelocityY(0);
            return true;
        }
        return false;
    };

    private static collidePlatformLeft = (object: IMoveableObject, tileLeft: number): boolean => {
        if (object.getRight() > tileLeft && object.getOldRight() <= tileLeft) {
            object.setRight(tileLeft - 0.001);
            object.setVelocityX(0);
            return true;
        }
        return false;
    };

    private static collidePlatformRight = (object: IMoveableObject, tileRight: number): boolean => {
        if (object.getLeft() < tileRight && object.getOldLeft() >= tileRight) {
            object.setLeft(tileRight);
            object.setVelocityX(0);
            return true;
        }
        return false;
    };

    private static collidePlatformTop = (object: IMoveableObject, tileTop: number): boolean => {
        if (object.getBottom() > tileTop && object.getOldBottom() <= tileTop) {
            object.setBottom(tileTop - 0.001);
            object.setVelocityY(0);
            if (object instanceof Player) object.stopJump();
            return true;
        }
        return false;
    }

}
