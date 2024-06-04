"use client";

import { CSSProperties, useCallback, useMemo, useRef, useState } from "react";
import { useEventListener, useInterval } from "usehooks-ts";
import { Button } from "../components/Button";

const GRID_WIDTH = 15 as const;
const GRID_HEIGHT = 15 as const;
const GRID_SIZE: number = GRID_WIDTH * GRID_HEIGHT;

const gridStyle: CSSProperties = {
    width: `${GRID_WIDTH * 40}px`,
    height: `${GRID_HEIGHT * 40}px`
};

type CellState = 'empty' | 'shooter' | 'invader' | 'laser' | 'explosion';
type Cell = {
    index: number;
    state: CellState;
};

const laserSpeed = 100 as const;
const laserDelay = 200 as const;
const initialInvaderSpeed = 500 as const;
const initialShooterIndex: number = (GRID_SIZE - 2 * GRID_WIDTH) + Math.floor(GRID_WIDTH / 2);
const initialInvaders: number[] =  [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
];

const initialGrid: Cell[] = [];
for (let index = 0; index < GRID_SIZE; index++) {
    initialGrid.push({ index, state: initialInvaders.includes(index) ? 'invader' : (index === initialShooterIndex ? 'shooter' : 'empty') });
}

export default function SpaceInvaders(): React.JSX.Element {
    const [grid, setGrid] = useState<Cell[]>([]);
    const [invaders, setInvaders] = useState<number[]>([]);
    const [invaderDirection, setInvaderDirection] = useState<number>(0);
    const [invaderSpeed, setInvaderSpeed] = useState<number>(-1);
    const [shooterIndex, setShooterIndex] = useState<number>(-1);
    const [lasers, setLasers] = useState<number[]>([]);
    const [canFireLaser, setCanFireLaser] = useState<boolean>(true);
    const [deadInvaders, setDeadInvaders] = useState<number[]>([]);
    const [score, setScore] = useState<number>(0);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [level, setLevel] = useState<number>(0);

    const documentRef = useRef<Document>(null);

    const won = useMemo((): boolean => invaders.length === 0 && shooterIndex > 0, [invaders, shooterIndex]);
    const playing = useMemo((): boolean => !gameOver && !won && grid.length > 0, [gameOver, grid.length, won]);

    const render = useCallback((): void => {
        setGrid(grid => grid.map(cell => {
            let state: CellState = 'empty';
            if (deadInvaders.includes(cell.index)) state = 'explosion';
            else if (cell.index === shooterIndex) state = gameOver ? 'explosion' : 'shooter';
            else if (lasers.includes(cell.index)) state = 'laser';
            else if (invaders.includes(cell.index)) state = 'invader';
            return { ...cell, state };
        }));
    }, [deadInvaders, gameOver, invaders, lasers, shooterIndex]);

    const newGame = useCallback((level: number): void => {
        setGrid(initialGrid);
        setInvaders(initialInvaders);
        setInvaderDirection(1);
        setInvaderSpeed(initialInvaderSpeed * (1 - level * 0.1));
        setShooterIndex(initialShooterIndex);
        setLasers([]);
        setDeadInvaders([]);
        setScore(s => level === 1 ? 0 : s);
        setGameOver(false);
        setLevel(level);
    }, []);

    const moveLeft = useCallback((): void => {
        if (shooterIndex % GRID_WIDTH !== 0) {
            setShooterIndex(i => i - 1);
        }
    }, [shooterIndex]);
    const moveRight = useCallback((): void => {
        if (shooterIndex % GRID_WIDTH < GRID_WIDTH - 1) {
            setShooterIndex(i => i + 1);
        }
    }, [shooterIndex]);
    const moveUp = useCallback((): void => {
        if (shooterIndex - GRID_WIDTH >= 0) {
            setShooterIndex(i => i - GRID_WIDTH);
        }
    }, [shooterIndex]);
    const moveDown = useCallback((): void => {
        if (shooterIndex + GRID_WIDTH < GRID_SIZE) {
            setShooterIndex(i => i + GRID_WIDTH);
        }
    }, [shooterIndex]);

    const moveLasers = useCallback((): void => {
        const newLasers: number[] = [];
        lasers.forEach(laser => {
            const newIndex: number = laser - GRID_WIDTH;
            if (newIndex < 0) return;
            if (invaders.includes(newIndex)) {
                const newInvaders: number[] = invaders.filter(i => i !== newIndex);
                setScore(s => s + 1);
                setInvaders(newInvaders);
                setDeadInvaders(invaders => [...invaders, newIndex]);
                if (newInvaders.length === 0) {
                    setTimeout(() => newGame(level + 1), 2000);
                    setLevel(l => l + 1);
                } else {
                    setTimeout(() => {
                        setDeadInvaders(invaders => invaders.filter(invader => invader !== newIndex));
                    }, 200);
                }
                return;
            }
            newLasers.push(newIndex);
        });
        setLasers(newLasers);
    }, [invaders, lasers, level, newGame]);

    const moveInvaders = useCallback((): void => {
        const sideHit: boolean = invaders.some(invader =>
            invaderDirection === -1 && invader % GRID_WIDTH === 0 ||
            invaderDirection === +1 && invader % GRID_WIDTH === GRID_WIDTH - 1
        );
        if (sideHit) {
            setInvaderDirection(d => d *= -1);
            setInvaderSpeed(s => s * 0.9);
        }
        setInvaders(invaders => invaders.map(invader => {
            const newIndex: number = invader + (sideHit ? GRID_WIDTH : invaderDirection);
            if (newIndex === shooterIndex || newIndex >= GRID_SIZE) setGameOver(true);
            return newIndex;
        }));
    }, [invaderDirection, invaders, shooterIndex]);

    const fireLaser = useCallback((): void => {
        if (!canFireLaser) return;
        setLasers(lasers => [...lasers, shooterIndex]);
        setCanFireLaser(false);
        setTimeout(() => setCanFireLaser(true), laserDelay);
    }, [canFireLaser, shooterIndex]);

    const onKeyboardDown = useCallback((e: KeyboardEvent): void => {
        if (!playing) return;
        switch (e.code) {
            case 'ArrowLeft': return moveLeft();
            case 'ArrowRight': return moveRight();
            case 'ArrowUp': return moveUp();
            case 'ArrowDown': return moveDown();
            case 'Space': return fireLaser();
        }
    }, [fireLaser, moveDown, moveLeft, moveRight, moveUp, playing]);

    useEventListener('keydown', onKeyboardDown, documentRef);
    useInterval(render, grid.length > 0 ? 1000 / 30 : null);
    useInterval(moveInvaders, playing && invaders.length > 0 ? invaderSpeed : null);
    useInterval(moveLasers, playing && lasers.length > 0 ? laserSpeed : null);

    const gridList = useMemo((): React.JSX.Element[] => grid.map(cell => {
        let classes: string = `w-8 h-8 m-1`;
        switch (cell.state) {
            case 'shooter': classes += ' bg-contain bg-no-repeat bg-center bg-[url("/space-invaders/ship.png")]'; break;
            case 'invader': classes += ' bg-contain bg-no-repeat bg-center bg-[url("/space-invaders/enemy.png")]'; break;
            case 'laser': classes += ' bg-contain bg-no-repeat bg-center bg-[url("/space-invaders/bullet.png")]'; break;
            case 'explosion': classes += ' bg-contain bg-no-repeat bg-center bg-[url("/space-invaders/explosion.png")]'; break;
        }
        return <div key={cell.index} className={classes}></div>;
    }), [grid]);

    return (
        <section className="space-y-2 w-fit text-center">
            <h2 className="text-4xl font-bold">Space Invaders</h2>
            <h3 className="flex justify-between text-xl font-semibold italic mx-2">
                <span>Level: {level}</span>
                <span>Score: {score}</span>
            </h3>
            <div className="flex flex-wrap bg-[url('/space-invaders/bg.png')]" style={gridStyle}>{gridList}</div>
            <Button disabled={playing} style="dark" onClick={() => newGame(1)}>Start/Restart</Button>
            {won && <h3 className="text-xl font-semibold">YOU WIN!</h3>}
            {gameOver && <h3 className="text-xl font-semibold">GAME OVER!</h3>}
        </section>
    );
}
