export class Controller {
    private _down: ButtonInput = new ButtonInput();
    private _left: ButtonInput = new ButtonInput();
    private _right: ButtonInput = new ButtonInput();
    private _up: ButtonInput = new ButtonInput();
    private _escape: ButtonInput = new ButtonInput();
    private _keyF: ButtonInput = new ButtonInput();

    public keyDownUp = (type: string, code: string): void => {
        const down = type === 'keydown';

        switch (code) {
            case 'ArrowLeft': this._left.setInput(down); break;
            case 'ArrowUp': this._up.setInput(down); break;
            case 'ArrowRight': this._right.setInput(down); break;
            case 'ArrowDown': this._down.setInput(down); break;
            case 'Escape': this._escape.setInput(down); break;
            case 'KeyF': this._keyF.setInput(down); break;
        }
    };

    public down = (): ButtonInput => this._down;
    public left = (): ButtonInput => this._left;
    public right = (): ButtonInput => this._right;
    public up = (): ButtonInput => this._up;
    public escape = (): ButtonInput => this._escape;
    public keyF = (): ButtonInput => this._keyF;
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

    public setActive = (value: boolean) => { this._active = value; };
}
