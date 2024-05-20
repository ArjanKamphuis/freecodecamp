import { Controller } from "../Controller";
import { Display } from "./Display";
import { Engine } from "../Engine";
import { Game } from "./Game";
import { Player } from "./Player";
import { World } from "./World";

export class Platformer {
    private _controller: Controller = new Controller();
    private _game: Game = new Game();

    private _mountedElement: HTMLElement;
    private _display: Display;
    private _engine: Engine;

    private _world: World;
    private _player: Player;

    private _tileSheetImage: HTMLImageElement = new Image();

    constructor(mountedElement: HTMLElement, canvas: HTMLCanvasElement) {
        this._mountedElement = mountedElement;
        this._display = new Display(canvas, { image: this._tileSheetImage, tileSize: 16, columns: 8 });
        this._engine = new Engine(1000 / 30, this.update, this.render);

        this._world = this._game.world();
        this._player = this._world.player();

        this._display.setBufferWidth(this._world.width());
        this._display.setBufferHeight(this._world.height());
    }

    public start = (): void => {
        this._tileSheetImage.src = '/rabbit-trap.png';
        this._tileSheetImage.addEventListener('load', () => {
            this.setEventListeners();
            this.resize();
            this._engine.start();
        }, { once: true });
    }

    public stop = (): void => {
        this._engine.stop();
        this.removeEventListeners();
    };

    private update = (): void => {
        if (this._controller.left().active()) this._player.moveLeft();
        if (this._controller.right().active()) this._player.moveRight();
        if (this._controller.up().active()) { this._player.jump(); this._controller.up().setActive(false); }

        this._game.update();
    };
    
    private render = (): void => {
        this._display.drawMap(this._world.map(), this._world.columns());
        this._display.drawPlayer(this._player);
        this._display.render();
    };

    private keyDownUp = (e: KeyboardEvent): void => {
        this._controller.keyDownUp(e.type, e.code);
    };

    private resize = (): void => {
        this._display.resize(this._mountedElement.clientWidth - 32, this._mountedElement.clientHeight - 32, this._world.height() / this._world.width());
        this._display.render();
    };

    private setEventListeners = (): void => {
        window.addEventListener('resize', this.resize);
        window.addEventListener('keydown', this.keyDownUp);
        window.addEventListener('keyup', this.keyDownUp);
    };

    private removeEventListeners = (): void => {
        window.removeEventListener('resize', this.resize);
        window.removeEventListener('keydown', this.keyDownUp);
        window.removeEventListener('keyup', this.keyDownUp);
    };
}
