export class Display {
    private buffer: CanvasRenderingContext2D;
    private context: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this.buffer = document.createElement('canvas').getContext('2d')!;
        this.context = canvas.getContext('2d')!;
    }

    public renderColor = (color: string): void => {
        this.buffer.fillStyle = color;
        this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
    };

    public render = (): void => {
        this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height);
    };

    public resize = (): void => {
        const platformerElement: Element = document.getElementById('platformer')!;
        this.context.canvas.width = platformerElement.clientWidth - 32;
        this.context.canvas.height = platformerElement.clientHeight - 32;
        this.render();
    };
}
