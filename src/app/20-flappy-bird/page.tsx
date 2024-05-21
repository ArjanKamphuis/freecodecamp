"use client";

import { useEffect, useRef } from "react";
import "./styles.css";

type ObstacleArrayElement = {
    topElement: HTMLDivElement;
    bottomElement: HTMLDivElement;
    intervalId: NodeJS.Timeout;
};

class Game {
    private _gameContainer: HTMLDivElement;
    private _ground: HTMLDivElement;
    private _bird: HTMLDivElement;
    private _startButton: HTMLButtonElement;

    private _birdLeft: number = 220;
    private _birdBottom: number = 100;
    private _gravity: number = 3;
    private _obstacles: ObstacleArrayElement[] = [];
    
    private _gameIntervalId?: NodeJS.Timeout;
    private _obstacleCreationTimeoutId?: NodeJS.Timeout;

    constructor(mountedElement: HTMLElement) {
        this._gameContainer = mountedElement.querySelector('.flappy-bird-container')!;
        this._ground = mountedElement.querySelector('.ground')!;
        this._bird = mountedElement.querySelector('.bird')!;
        this._startButton = mountedElement.querySelector('.start-btn')!;
        this._startButton.addEventListener('click', this.start);
    }

    public stop = (): void => {
        clearInterval(this._gameIntervalId);
        clearTimeout(this._obstacleCreationTimeoutId);
        this._obstacles.forEach(obstacle => {
            clearTimeout(obstacle.intervalId);
            this._gameContainer.removeChild(obstacle.topElement);
            this._gameContainer.removeChild(obstacle.bottomElement);
        });
        document.removeEventListener('keyup', this.keyHandler);
        this._startButton.removeEventListener('click', this.start);
    };

    private start = (): void => {
        this._startButton.style.visibility = 'hidden';
        document.addEventListener('keyup', this.keyHandler);

        this._obstacles.forEach(obstacle => {
            this._gameContainer.removeChild(obstacle.topElement);
            this._gameContainer.removeChild(obstacle.bottomElement);
        });
        this._obstacles = [];
        this.generateObstacle();

        this._birdBottom = 100;
        this._bird.style.bottom = `${this._birdBottom}px`;
        this._bird.style.left = `${this._birdLeft}px`;
        this._gameIntervalId = setInterval(this.run, 20);

        this.toggleGroundMove();
    };

    private run = (): void => {
        this._birdBottom -= this._gravity;
        this._bird.style.bottom = `${this._birdBottom}px`;
        if (this._birdBottom <= 0) this.gameOver();
    }

    private gameOver = (): void => {
        clearInterval(this._gameIntervalId);
        clearTimeout(this._obstacleCreationTimeoutId);
        this._obstacles.forEach(obstacle => clearInterval(obstacle.intervalId));
        document.removeEventListener('keyup', this.keyHandler);
        this._startButton.style.visibility = 'visible';
        this.toggleGroundMove();
    };

    private jump = (): void => {
        if (this._birdBottom >= 500) return;
        this._birdBottom += 50;
        this._bird.style.bottom = `${this._birdBottom}px`;
    };

    private generateObstacle = (): void => {
        let obstacleLeft: number = 500;
        const obstacleBottom: number = Math.random() * 60;
        const obstacleGap: number = Math.random() * 200 + 430;

        const obstacle: HTMLDivElement = document.createElement('div');
        const topObstacle: HTMLDivElement = document.createElement('div');
        obstacle.classList.add('obstacle');
        topObstacle.classList.add('obstacle', 'top-obstacle');
        obstacle.style.left = `${obstacleLeft}px`;
        topObstacle.style.left = `${obstacleLeft}px`;
        obstacle.style.bottom = `${obstacleBottom}px`;
        topObstacle.style.bottom = `${obstacleBottom + obstacleGap}px`;
        topObstacle.style.height = `${730 - obstacleBottom - obstacleGap}px`;

        const moveObstacle = (): void => {
            obstacleLeft -= 2;
            obstacle.style.left = `${obstacleLeft}px`;
            topObstacle.style.left = `${obstacleLeft}px`;

            if (obstacleLeft < -60) {
                clearInterval(intervalId);
                this._gameContainer.removeChild(obstacle);
                this._gameContainer.removeChild(topObstacle);
                this._obstacles = this._obstacles.filter(o => o.bottomElement !== obstacle);
            }

            if (
                obstacleLeft > 200 && obstacleLeft < 280 &&
                (this._birdBottom < obstacleBottom + 153 || this._birdBottom > obstacleBottom + obstacleGap - 200)
            ) {
                this.gameOver();
            }
        };

        this._gameContainer.appendChild(obstacle);
        this._gameContainer.appendChild(topObstacle);
        const intervalId: NodeJS.Timeout = setInterval(moveObstacle, 20);
        this._obstacles.push({ topElement: topObstacle, bottomElement: obstacle, intervalId });

        this._obstacleCreationTimeoutId = setTimeout(this.generateObstacle, Math.random() * 2000 + 1000);
    };

    private toggleGroundMove = (): void => {
        this._ground.classList.toggle('ground');
        this._ground.classList.toggle('ground-moving');
    };

    private keyHandler = (e: KeyboardEvent): void => {
        if (e.code === 'Space') {
            this.jump();
        }
    };
}

export default function FlappyBird(): React.JSX.Element {
    const mountedRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const game: Game = new Game(mountedRef.current!);
        return (): void => { game.stop(); };
    }, []);
    return (
        <section ref={mountedRef} className="flappy-bird">
            <div className="border-top flex items-center justify-center">
                <h2 className="text-4xl font-bold">Flappy Bird</h2>
            </div>
            <div className="border-left"></div>
            <div className="flappy-bird-container">
                <div className="sky">
                    <div className="bird"></div>
                </div>
                <div className="ground-container">
                    <div className="ground"></div>
                </div>
                <button className="start-btn">Start</button>
            </div>
            <div className="border-right"></div>
        </section>
    );
}
