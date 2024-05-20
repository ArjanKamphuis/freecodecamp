import { Controller } from "../Controller";
import { Display } from "./Display";
import { Engine } from "../Engine";
import { Player } from "./Player";
import { TileSetFrame, World, Zone } from "./World";

class AssetsManager {
    private _tileSetImage: HTMLImageElement = new Image();
    public tileSetImage = (): HTMLImageElement => this._tileSetImage;

    public loadTileSetImage = (url: string, callback: () => void): void => {
        this._tileSetImage.src = url;
        this._tileSetImage.addEventListener('load', callback, { once: true });
    };

    public requestZone = (id: string, callback: (zone: Zone) => void): void => {
        import(`./zone${id}.json`).then(data => {
            callback(data as Zone);
        }).catch(error => console.log(error));
    };
}

export class Game {
    private _assetsManager: AssetsManager = new AssetsManager();
    private _controller: Controller = new Controller();
    private _world: World;

    private _rootElement: HTMLElement;
    private _display: Display;
    private _engine: Engine;
    private _player: Player;

    private _textColor: string = '#C07000';
    private _textFont: string = '19px Arial';

    constructor(rootElement: HTMLElement, canvas: HTMLCanvasElement) {
        this._rootElement = rootElement;
        this._display = new Display(rootElement, canvas);
        this._engine = new Engine(1000 / 30, this.update, this.render);
        this._world = new World();
        this._player = this._world.player();
    }

    public start = (): void => {
        this._assetsManager.requestZone('00', zone => {
            this._world.changeZone(zone);
            this._display.setBufferProperties(this._world.width(), this._world.height(), false);
            this._assetsManager.loadTileSetImage('/rabbit-trap.png', () => {
                this.setEventListeners();
                this.resize();
                this._engine.start();
            }); 
        });        
    }

    public stop = (): void => {
        this._engine.stop();
        this.removeEventListeners();
    };

    private update = (): void => {
        if (this._controller.left().active()) this._player.moveLeft();
        if (this._controller.right().active()) this._player.moveRight();
        if (this._controller.up().active()) { this._player.jump(); this._controller.up().setActive(false); }
        if (this._controller.keyF().active()) { this._display.toggleFullscreen(); this._controller.keyF().setActive(false); }
        if (this._controller.escape().active()) { this._display.setFullscreen(false); this._controller.escape().setActive(false); }

        this._world.update();

        if (this._world.newZoneId()) {
            this._engine.stop();
            this._assetsManager.requestZone(this._world.newZoneId(), zone => {
                this._world.changeZone(zone);
                this._display.setBufferProperties(this._world.width(), this._world.height(), false);
                this.resize();
                this._engine.start();
            });
        }
    };

    private render = (): void => {
        const image: HTMLImageElement = this._assetsManager.tileSetImage();
        this._display.drawMap(image, this._world.tileSet().columns, this._world.map(), this._world.columns(), this._world.tileSet().tileSize);

        this._world.carrrots().forEach(carrot => {
            if (!carrot.collected()) {
                const carrotFrame: TileSetFrame = this._world.tileSet().frames[carrot.frameIndex()];
                const carrotDestX: number = carrot.getLeft() + Math.floor(carrot.getWidth() * 0.5 - carrotFrame.width * 0.5) + carrotFrame.offsetX;
                const carrotDestY: number = carrot.getTop() + carrotFrame.offsetY;
                this._display.drawObject(image, carrotFrame.x, carrotFrame.y, carrotDestX, carrotDestY, carrotFrame.width, carrotFrame.height);
            }
        });

        const playerFrame: TileSetFrame = this._world.tileSet().frames[this._player.frameIndex()];
        const playerDestX: number = this._player.getLeft() + Math.floor(this._player.getWidth() * 0.5 - playerFrame.width * 0.5) + playerFrame.offsetX;
        const playerDestY: number = this._player.getTop() + playerFrame.offsetY;
        this._display.drawObject(image, playerFrame.x, playerFrame.y, playerDestX, playerDestY, playerFrame.width, playerFrame.height);

        this._world.grass().forEach(grass => {
            const grassFrame: TileSetFrame = this._world.tileSet().frames[grass.frameIndex()];
            const grassDestX: number = grass.getLeft() + grassFrame.offsetX;
            const grassDestY: number = grass.getTop() + grassFrame.offsetY;
            this._display.drawObject(image, grassFrame.x, grassFrame.y, grassDestX, grassDestY, grassFrame.width, grassFrame.height);
        });

        this._display.drawText(`Carrots: ${this._world.collectedCarrotCount()}`, this._textColor, this._textFont);

        this._display.render();
    };    

    private keyDownUp = (e: KeyboardEvent): void => {
        this._controller.keyDownUp(e.type, e.code);
    };

    private resize = (): void => {
        this._display.resize(this._rootElement.clientWidth, this._rootElement.clientHeight, this._world.height() / this._world.width());
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
