export class Controller {
    private _down: ButtonInput = new ButtonInput();
    private _left: ButtonInput = new ButtonInput();
    private _right: ButtonInput = new ButtonInput();
    private _up: ButtonInput = new ButtonInput();

    public keyDownUp = (e: KeyboardEvent): void => {
        const down = e.type === 'keydown';

        switch (e.code) {
            case 'ArrowLeft': this._left.setInput(down); break;
            case 'ArrowUp': this._up.setInput(down); break;
            case 'ArrowRight': this._right.setInput(down); break;
            case 'ArrowDown': this._down.setInput(down); break;
        }
    };

    public down = (): ButtonInput => this._down;
    public left = (): ButtonInput => this._left;
    public right = (): ButtonInput => this._right;
    public up = (): ButtonInput => this._up;
}

class ButtonInput {
    private _active: boolean = false;
    private _down: boolean = false;

    public setInput = (down: boolean): void => {
        if (this._down !== down) this._active = down;
        this._down = down;
    };

    public active = (): boolean => this._active;
    public down = (): boolean => this._down;
}
