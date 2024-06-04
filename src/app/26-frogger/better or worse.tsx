"use client";

import { CSSProperties, useCallback, useMemo, useRef, useState } from "react";
import { Button } from "../components/Button";
import { useEventListener, useInterval } from "usehooks-ts";

const GRID_WIDTH = 9 as const;
const GRID_HEIGHT = 9 as const;
const GRID_SIZE: number = GRID_WIDTH * GRID_HEIGHT;
const gridStyle: CSSProperties = {
    width: `${GRID_WIDTH * 40 + 2}px`,
    height: `${GRID_HEIGHT * 40 + 2}px`
};

type GameState = 'idle' | 'playing' | 'win' | 'lose';

const getCellContent = (index: number, frog: number, logs: number[], water: number[], cars: number[], road: number[]): React.JSX.Element => {
    let classes: string = 'w-10 h-10';
    if (index === frog) classes += ' bg-green-500';
    else if (index === initialStartIndex) classes += ' bg-blue-500';
    else if (index === initialEndIndex) classes += ' bg-red-500';
    else if (logs.includes(index)) classes += ' bg-emerald-700';
    else if (water.includes(index)) classes += ' bg-blue-300';
    else if (cars.includes(index)) classes += ' bg-gray-900';
    else if (road.includes(index)) classes += ' bg-gray-400';
    return <div key={index} className={classes}></div>;
};

const initialStartIndex: number = GRID_SIZE - Math.round(GRID_WIDTH / 2);
const initialEndIndex: number = Math.floor(GRID_WIDTH / 2);
const initialLogs: number[] = [18, 19, 20, 23, 24, 25, 28, 29, 30, 33, 34, 35];
const initialWater: number[] = [21, 22, 26, 27, 31, 32];
const initialCars: number[] = [45, 48, 51, 54, 57, 60];
const initialRoad: number[] = [46, 47, 49, 50, 52, 53, 55, 56, 58, 59, 61, 62];
const initialGrid: React.JSX.Element[] = [];
for (let index: number = 0; index < GRID_SIZE; index++) {    
    initialGrid.push(getCellContent(index, -1, initialLogs, initialWater, initialCars, initialRoad));
}

export default function Frogger(): React.JSX.Element {
    const [grid, setGrid] = useState<React.JSX.Element[]>(initialGrid);
    const [frog, setFrog] = useState<number>(-1);
    const [logs, setLogs] = useState<number[]>(initialLogs);
    const [water, setWater] = useState<number[]>(initialWater);
    const [cars, setCars] = useState<number[]>(initialCars);
    const [road, setRoad] = useState<number[]>(initialRoad);
    const [timeLeft, setTimeLeft] = useState<number>(20);
    const [gameState, setGameState] = useState<GameState>('idle');

    const documentRef = useRef<Document>(null);

    const renderGrid = useCallback((): void => {
        setGrid(grid => grid.map((_cell, index) => getCellContent(index, frog, logs, water, cars, road)));
    }, [cars, frog, logs, road, water]);

    const animateObjects = useCallback((): void => {
        setLogs(logs => logs.map(log => (log >= GRID_WIDTH * 2 && log < GRID_WIDTH * 3) ? moveLeft(log) : moveRight(log)));
        setWater(water => water.map(puddle => (puddle >= GRID_WIDTH * 2 && puddle < GRID_WIDTH * 3) ? moveLeft(puddle) : moveRight(puddle)));
        setCars(cars => cars.map(car => (car >= GRID_WIDTH * 5 && car < GRID_WIDTH * 6) ? moveLeft(car) : moveRight(car)));
        setRoad(road => road.map(piece => (piece >= GRID_WIDTH * 5 && piece < GRID_WIDTH * 6) ? moveLeft(piece) : moveRight(piece)));
    }, []);

    const checkResult = useCallback((): void => {
        if (water.includes(frog) || cars.includes(frog) || timeLeft <= 0) setGameState('lose');
        else if (frog === initialEndIndex) setGameState('win');
    }, [cars, frog, timeLeft, water]);

    const onKeyboardUp = useCallback((e: KeyboardEvent): void => {
        if (gameState !== 'playing') return;
        let newFrogIndex: number = frog;
        switch (e.code) {
            case 'ArrowLeft':
                if (frog % GRID_WIDTH > 0) newFrogIndex--;
                break;
            case 'ArrowRight':
                if (frog % GRID_WIDTH < GRID_WIDTH - 1) newFrogIndex++;
                break;
            case 'ArrowUp':
                if (frog - GRID_WIDTH >= 0) newFrogIndex -= GRID_WIDTH;
                break;
            case 'ArrowDown':
                if (frog + GRID_WIDTH < GRID_SIZE) newFrogIndex += GRID_WIDTH;
                break;
        }
        if (newFrogIndex !== frog) {
            setFrog(newFrogIndex);
        }
    }, [frog, gameState]);

    const handleBtnClick = useCallback((): void => {
        if (gameState === 'playing') setGameState('idle');
        else {
            setGrid(initialGrid);
            setFrog(initialStartIndex);
            setLogs(initialLogs);
            setWater(initialWater);
            setCars(initialCars);
            setRoad(initialRoad);
            setTimeLeft(20);
            setGameState('playing');
        }
    }, [gameState]);

    useEventListener('keyup', onKeyboardUp, documentRef);
    useInterval(renderGrid, 1000 / 30);
    useInterval(animateObjects, gameState !== 'idle' ? 1000 : null);
    useInterval(checkResult, gameState === 'playing' ? 100 : null);
    useInterval(() => setTimeLeft(t => t - 1), gameState === 'playing' && timeLeft > 0 ? 1000 : null);

    const result = useMemo((): string => {
        switch (gameState) {
            case 'win': return 'You Won!';
            case 'lose': return 'You Lose!';
            case 'playing': return '...';
            default: return 'Press Start to Play';
        }
    }, [gameState]);

    return (
        <section className="w-fit text-center space-y-2">
            <h2 className="text-4xl font-bold">Frogger</h2>
            <h3 className="text-xl font-semibold">Seconds left: {timeLeft}</h3>
            <h3 className="text-xl font-semibold">Result: {result}</h3>
            <Button onClick={handleBtnClick} style="dark">{gameState === 'playing' ? 'Pause' : 'Start'}</Button>
            <div className="flex flex-wrap border border-black" style={gridStyle}>{grid}</div>
        </section>
    );
}

const moveLeft = (index: number): number => {
    return (index % GRID_WIDTH - 1) < 0 ? index + GRID_WIDTH - 1 : index - 1;
};
const moveRight = (index: number): number => {
    return (index % GRID_WIDTH + 1) >= GRID_WIDTH ? index - GRID_WIDTH + 1 : index + 1;
};
