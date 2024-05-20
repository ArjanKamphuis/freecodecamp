export class Display {
    private _rootElement: HTMLElement;
    private _buffer: CanvasRenderingContext2D;
    private _context: CanvasRenderingContext2D;
    private _fullscreen: boolean = false;
    private _aspectRatio: number = 0;

    constructor(rootElement: HTMLElement, canvas: HTMLCanvasElement) {
        this._rootElement = rootElement;
        this._buffer = document.createElement('canvas').getContext('2d')!;
        this._context = canvas.getContext('2d')!;
    }

    public canvas = (): HTMLCanvasElement => this._context.canvas;

    public drawMap = (image: HTMLImageElement, imageColumns: number, map: number[], mapColumns: number, tileSize: number): void => {
        for (let index = map.length - 1; index > -1; index--) {
            const value: number = map[index];
            const sourceX: number = (value % imageColumns) * tileSize;
            const sourceY: number = Math.floor(value / imageColumns) * tileSize;
            const destinationX: number = (index % mapColumns) * tileSize;
            const destinationY: number = Math.floor(index / mapColumns) * tileSize;
            this._buffer.drawImage(image, sourceX, sourceY, tileSize, tileSize, destinationX, destinationY, tileSize, tileSize);
        }
    };

    public drawObject = (image: HTMLImageElement, sourceX: number, sourceY: number, destinationX: number, destinationY: number, width: number, height: number): void => {
        this._buffer.drawImage(image, sourceX, sourceY, width, height, Math.round(destinationX), Math.round(destinationY), width, height);
    };

    public drawText = (text: string, color: string, font: string, x: number = Infinity, y: number = Infinity): void => {
        this._buffer.font = font;
        this._buffer.fillStyle = color;
        const textMetrics: TextMetrics = this._buffer.measureText(text);
        if (x === Infinity) x = (this._buffer.canvas.width - textMetrics.width) / 2;
        if (y === Infinity) y = textMetrics.hangingBaseline + 1;
        this._buffer.fillText(text, x, y);
    };

    public render = (): void => {
        this._context.drawImage(this._buffer.canvas, 0, 0, this._buffer.canvas.width, this._buffer.canvas.height, 0, 0, this._context.canvas.width, this._context.canvas.height);
    };

    public setBufferProperties = (width: number, height: number, imageSmoothing: boolean): void => {
        this._buffer.canvas.width = width;
        this._buffer.canvas.height = height;
        this._buffer.imageSmoothingEnabled = imageSmoothing;
    };

    public resize = (width: number, height: number, aspectRatio: number): void => {
        this._aspectRatio = aspectRatio;
        if (height / width > aspectRatio) {
            this._context.canvas.width = width;
            this._context.canvas.height = width * aspectRatio;
        } else {
            this._context.canvas.width = height / aspectRatio;
            this._context.canvas.height = height;
        }
        this._context.imageSmoothingEnabled = false;
    };
    
    public setFullscreen = (fullscreen: boolean = true): void => {
        if (this._fullscreen === fullscreen) return;
        if (fullscreen) {
            this._rootElement.style.position = 'fixed';
            this._rootElement.style.top = '0';
            this._rootElement.style.left = '0';
            this._rootElement.style.width = '100vw';
            this._rootElement.style.height = '100vh';
        } else {
            this._rootElement.style.position = '';
            this._rootElement.style.top = '';
            this._rootElement.style.left = '';
            this._rootElement.style.width = '';
            this._rootElement.style.height = '';
        }
        this._fullscreen = fullscreen;
        this.resize(this._rootElement.clientWidth, this._rootElement.clientHeight, this._aspectRatio);
    }

    public toggleFullscreen = (): void => this.setFullscreen(!this._fullscreen);
}
