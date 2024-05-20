export class Engine {
    private accumulatedTime: number = 0;
    private animationRequestFrame: number = -1;
    private time: number = -1;
    private timeStep: number;
    private updated: boolean = false;

    private update: () => void;
    private render: () => void;

    constructor(timeStep: number, update: () => void, render: () => void) {
        this.timeStep = timeStep;
        this.update = update;
        this.render = render;
    }

    public start = (): void => {
        this.accumulatedTime = this.timeStep;
        this.time = window.performance.now();
        this.animationRequestFrame = window.requestAnimationFrame(this.run);
    };

    public stop = (): void => {
        window.cancelAnimationFrame(this.animationRequestFrame);
    };

    private run = (timeStamp: number): void => {
        this.animationRequestFrame = window.requestAnimationFrame(this.run);
        
        this.accumulatedTime += timeStamp - this.time;
        this.time = timeStamp;

        if (this.accumulatedTime >= this.timeStep * 3) {
            this.accumulatedTime = this.timeStep;
        }

        while (this.accumulatedTime >= this.timeStep) {
            this.accumulatedTime -= this.timeStep;
            this.update();
            this.updated = true;
        }

        if (this.updated) {
            this.updated = false;
            this.render();
        }
    };
}
