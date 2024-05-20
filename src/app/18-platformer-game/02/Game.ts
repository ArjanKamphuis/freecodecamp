import { World } from "./World";

export class Game {
    private _world: World = new World();
    public world = (): World => this._world;
    
    public update = (): void => {
        this._world.update();
    };
}
