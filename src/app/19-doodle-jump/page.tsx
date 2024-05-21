"use client";

import { useEffect, useRef } from "react";
import "./styles.css";

class Platform {
    private _bottom: number;
    private _left: number = Math.floor(Math.random() * 315);
    private _element: HTMLDivElement = document.createElement('div');

    constructor(bottom: number, rootElement: HTMLElement) {
        this._bottom = bottom;
        this._element.classList.add('platform');
        this._element.style.left = `${this._left}px`;
        this._element.style.bottom = `${this._bottom}px`;
        rootElement.appendChild(this._element);
    }

    public getLeft = (): number => this._left;
    public getBottom = (): number => this._bottom;

    public update = (): void => {
        this._bottom -= 4;
        this._element.style.bottom = `${this._bottom}px`;
    }

    public remove = (rootElement: HTMLElement): void => {
        rootElement.removeChild(this._element);
    };
}

class Game {
    private _mountedElement: HTMLElement;
    private _doodler: HTMLDivElement = document.createElement('div');
    private _startButton: HTMLButtonElement = document.createElement('button');
    private _scoreDiv: HTMLDivElement = document.createElement('div');
    private _startPointBottom: number = 150;
    private _doodlerLeft: number = 0;
    private _doodlerBottom: number = this._startPointBottom;
    private _platformCount: number = 5;
    private _platforms: Platform[] = [];
    private _platformMoveTimeoutId?: NodeJS.Timeout;
    private _upTimeoutId?: NodeJS.Timeout;
    private _downTimeoutId?: NodeJS.Timeout;
    private _leftTimeoudId?: NodeJS.Timeout;
    private _rightTimeoudId?: NodeJS.Timeout;
    private _isJumping: boolean = false;
    private _isGoingLeft: boolean = false;
    private _isGoingRight: boolean = false;
    private _score: number = 0;

    constructor(mountedElement: HTMLElement) {
        this._mountedElement = mountedElement;
        this._mountedElement.appendChild(this._scoreDiv);
        this._scoreDiv.innerHTML = this._score.toString();

        this._startButton.textContent = 'Start';
        this._startButton.addEventListener('click', this.start);
        this._startButton.classList.add('button');
        this._mountedElement.appendChild(this._startButton);

        document.addEventListener('keydown', this.keyboardClickHandler);
    }

    public start = (): void => {
        this._mountedElement.innerHTML = '';
        this._score = 0;
        this._startPointBottom = 150;
        this.createPlatforms();
        this.createDoodler();
        this._platformMoveTimeoutId = setInterval(this.movePlatforms, 30);
        this.jump();
    }

    public stop = (): void => {
        document.removeEventListener('keydown', this.keyboardClickHandler);
        this._startButton.removeEventListener('click', this.start);

        this._mountedElement.innerHTML = '';

        clearInterval(this._platformMoveTimeoutId);
        clearInterval(this._upTimeoutId);
        clearInterval(this._downTimeoutId);
        clearInterval(this._leftTimeoudId);
        clearInterval(this._rightTimeoudId);
    };

    private createDoodler = (): void => {
        this._doodler.classList.add('doodler');
        this._mountedElement.appendChild(this._doodler);
        this._doodlerLeft = this._platforms[0].getLeft();
        this._doodler.style.left = `${this._doodlerLeft}px`;
        this._doodler.style.bottom = `${this._doodlerBottom}px`;
    };

    private createPlatforms = (): void => {
        const platformGap: number = 600 / this._platformCount;
        for (let i = 0; i < this._platformCount; i++) {
            const newPlatformBottom: number = 100 + i * platformGap;
            this._platforms.push(new Platform(newPlatformBottom, this._mountedElement));
        }
    };

    private movePlatforms = (): void => {
        if (this._doodlerBottom > 200) {
            this._platforms.forEach(platform => {
                platform.update();
            });
            if (this._platforms[0].getBottom() < 10) {
                const firstPlatform: Platform = this._platforms.shift()!;
                firstPlatform.remove(this._mountedElement);
                this._platforms.push(new Platform(600, this._mountedElement));
                this._score++;
            }
        }
    };

    private jump = (): void => {
        clearInterval(this._downTimeoutId);
        this._isJumping = true;
        this._upTimeoutId = setInterval(() => {
            this._doodlerBottom += 20;
            this._doodler.style.bottom = `${this._doodlerBottom}px`;
            if (this._doodlerBottom > this._startPointBottom + 200) {
                this.fall();
            }
        }, 30);
    };

    private fall = (): void => {
        clearInterval(this._upTimeoutId);
        this._isJumping = false;
        this._downTimeoutId = setInterval(() => {
            this._doodlerBottom -= 5;
            this._doodler.style.bottom = `${this._doodlerBottom}px`;
            if (this._doodlerBottom <= 0) {
                this.gameOver();
            }
            this._platforms.forEach(platform => {
                if (
                    this._doodlerBottom >= platform.getBottom() &&
                    this._doodlerBottom <= platform.getBottom() + 15 &&
                    this._doodlerLeft + 60 >= platform.getLeft() &&
                    this._doodlerLeft <= platform.getLeft() + 85 &&
                    !this._isJumping
                ) {
                    this._startPointBottom = this._doodlerBottom;
                    this.jump();
                    this._isJumping = true;
                }
            });
        }, 30);
    };

    private gameOver = (): void => {
        this._platforms = [];
        this._mountedElement.innerHTML = '';
        this._scoreDiv.innerHTML = this._score.toString();
        this._mountedElement.appendChild(this._scoreDiv);
        this._mountedElement.appendChild(this._startButton);
        clearInterval(this._upTimeoutId);
        clearInterval(this._downTimeoutId);
        clearInterval(this._leftTimeoudId);
        clearInterval(this._rightTimeoudId);
        clearInterval(this._platformMoveTimeoutId);
    }

    private keyboardClickHandler = (e: KeyboardEvent) => {
        switch (e.code) {
            case 'ArrowLeft': this.moveLeft(); break;
            case 'ArrowRight': this.moveRight(); break;
            case 'ArrowUp': this.moveStraight(); break;
        }
    };

    private moveLeft = (): void => {
        if (this._isGoingRight) {
            this._isGoingRight = false;
            clearInterval(this._rightTimeoudId);
        }
        this._isGoingLeft = true;
        this._leftTimeoudId = setInterval(() => {
            if (this._doodlerLeft > 0) {
                this._doodlerLeft -= 5;
                this._doodler.style.left = `${this._doodlerLeft}px`;
            } else this.moveRight();
        }, 30);
    };

    private moveRight = (): void => {
        if (this._isGoingLeft) {
            this._isGoingLeft = true;
            clearInterval(this._leftTimeoudId);
        }
        this._isGoingRight = true;
        this._rightTimeoudId = setInterval(() => {
            if (this._doodlerLeft <= 313) {
                this._doodlerLeft += 5;
                this._doodler.style.left = `${this._doodlerLeft}px`;
            } else this.moveLeft();
        }, 30);
    };

    private moveStraight = (): void => {
        this._isGoingLeft = false;
        this._isGoingRight = false;
        clearInterval(this._leftTimeoudId);
        clearInterval(this._rightTimeoudId);
    };
}

export default function DoodleJump(): React.JSX.Element {
    const mountedRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const game: Game = new Game(mountedRef.current!);
        return (): void => { game.stop(); };
    }, []);
    return (
        <section id="doodle-jump-container">
            <h2 className="text-4xl font-bold mb-4">Doodle Jump</h2>
            <div ref={mountedRef} id="mountedRef"></div>
        </section>
    );
}
