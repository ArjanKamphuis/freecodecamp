import { Player } from "./Player";

type TileSheet = {
    image: HTMLImageElement;
    tileSize: number;
    columns: number;
};

export class Display {
    private buffer: CanvasRenderingContext2D;
    private context: CanvasRenderingContext2D;
    private tileSheet: TileSheet;

    constructor(canvas: HTMLCanvasElement, tileSheet: TileSheet) {
        this.buffer = document.createElement('canvas').getContext('2d')!;
        this.context = canvas.getContext('2d')!;
        this.tileSheet = tileSheet;
    }

    public drawMap = (map: number[], columns: number): void => {
        for (let index = map.length - 1; index > -1; index--) {
            let value: number = map[index];
            let sourceX: number = (value % this.tileSheet.columns) * this.tileSheet.tileSize;
            let sourceY: number = Math.floor(value / this.tileSheet.columns) * this.tileSheet.tileSize;
            let destinationX: number = (index % columns) * this.tileSheet.tileSize;
            let destinationY: number = Math.floor(index / columns) * this.tileSheet.tileSize;

            this.buffer.drawImage(this.tileSheet.image,
                sourceX, sourceY, this.tileSheet.tileSize, this.tileSheet.tileSize,
                destinationX, destinationY, this.tileSheet.tileSize, this.tileSheet.tileSize);
        }
    };

    public drawPlayer = (player: Player): void => {
        const x: number = Math.round(player.getPosX());
        const y: number = Math.round(player.getPosY());
        const w: number = player.getWidth();
        const h: number = player.getHeight();

        this.buffer.fillStyle = player.getColors()[0];
        this.buffer.fillRect(x, y, w, h);

        this.buffer.fillStyle = player.getColors()[1];
        this.buffer.fillRect(x + 2, y + 2, w - 4, h - 4);
    };

    public render = (): void => {
        this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height);
    };

    public setBufferWidth = (width: number) => { this.buffer.canvas.width = width; };
    public setBufferHeight = (height: number) => { this.buffer.canvas.height = height; };

    public resize = (width: number, height: number, aspectRatio: number): void => {
        if (height / width > aspectRatio) {
            this.context.canvas.width = width;
            this.context.canvas.height = width * aspectRatio;
        } else {
            this.context.canvas.width = height / aspectRatio;
            this.context.canvas.height = height;
        }
        this.context.imageSmoothingEnabled = false;
    };
}
