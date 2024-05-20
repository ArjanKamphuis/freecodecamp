export class Display {
    private buffer: CanvasRenderingContext2D;
    private context: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this.buffer = document.createElement('canvas').getContext('2d')!;
        this.context = canvas.getContext('2d')!;
    }

    public setBufferWidth = (width: number) => { this.buffer.canvas.width = width; };
    public setBufferHeight = (height: number) => { this.buffer.canvas.height = height; };

    public drawRectangle = (x: number, y: number, width: number, height: number, color: string): void => {
        this.buffer.fillStyle = color;
        this.buffer.fillRect(Math.floor(x), Math.floor(y), width, height);
    };

    public fill = (color: string) => {
        this.buffer.fillStyle = color;
        this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
    };

    public render = (): void => {
        this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height);
    };

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
