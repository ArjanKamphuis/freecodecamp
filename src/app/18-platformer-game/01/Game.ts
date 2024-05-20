export class Game {
    private _color: string = 'rgb(0,0,0)';
    private colors: number[] = [0, 0, 0];
    private shifts: number[] = [1, 1, 1];

    public update = (): void => {
        for (let i = 0; i < 3; i++) {
            let color: number = this.colors[i];
            let shift: number = this.shifts[i];

            if (color + shift > 255 || color + shift < 0) {
                shift = shift < 0 ? Math.floor(Math.random() * 2) + 1 : Math.floor(Math.random() * -2) - 1;
            }

            color += shift;
            this.colors[i] = color;
            this.shifts[i] = shift;
        }

        this._color = `rgb(${this.colors[0]},${this.colors[1]},${this.colors[2]})`;
    };

    public color = (): string => this._color;
}
